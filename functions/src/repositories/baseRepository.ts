import * as yup from 'yup';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import applySortQuery from '@utils/applySortQuery';
import applySortElasticSearch from '@utils/applySortElasticSearch';

import NotFoundError from '@interfaces/NotFoundError';
import elasticClient from '@utils/elasticSearchConfig';
import applyFilterQuery from '@utils/applyFilterQuery';
import writeToFirestore from '@utils/writeToFirestore';
import handleImportExcel from '@utils/handleImportExcel';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import getPathStorageFromUrl from '@utils/getPathStorageFromUrl';
import applyFilterElasticSearch from '@utils/applyFIlterElasticSearch';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';
import handleDeleteFirebaseStorage from '@utils/handleDeleteFirebaseStorage';

import { db } from '@utils/admin';
import { StringKeys, IFiles } from '@interfaces/BaseInterface';
import { RequestBody } from '@elastic/elasticsearch/lib/Transport';

interface ISearch<T = RequestBody> {
  index?: string | string[];
  type?: string | string[];
  from?: number;
  size?: number;
  sort?: StringKeys[];
  query?: T;
}
export default class FirestoreRepository<
  CreateParam,
  ConditionParam = {},
  SubCreateParam = {}
> {
  _collection: admin.firestore.CollectionReference;
  _name: string;
  _elasticIndex: string;
  constructor(collectionName: string, name: string, elasticIndexName?: string) {
    this._collection = db.collection(collectionName);
    this._name = name;
    this._elasticIndex = elasticIndexName || 'bri_corpu_all';
  }

  // _____elasticSearch_____>
  async findByIdElastic(id: string) {
    const data = await elasticClient.get(
      {
        index: this._elasticIndex,
        id,
      },
      { ignore: [404] }
    );
    if (!data.body.found || data.statusCode === 404) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }

    const source = data.body._source;
    return {
      id: data.body._id,
      ...source,
    };
  }

  async findAllElastic(
    page: number | string = 1,
    limit: number | string = 10,
    filtered: string = JSON.stringify([]),
    sorted: string = JSON.stringify([]),
    elasticIndexName?: string
  ) {
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    const skip = (parsedPage - 1) * parsedLimit;
    const bodyParam: ISearch = {
      size: parsedLimit,
      from: skip,
    };

    //sort
    try {
      const sortParam = JSON.parse(sorted);
      bodyParam.sort = applySortElasticSearch(sortParam);
    } catch (error) {
      throw new InvalidRequestError('Invalid sort param', 'sort');
    }

    //filter
    try {
      const filterParam = JSON.parse(filtered);
      bodyParam.query = applyFilterElasticSearch(filterParam);
    } catch (error) {
      throw new InvalidRequestError('Invalid filter param', 'filter');
    }

    const { body, statusCode } = await elasticClient.search(
      {
        index: elasticIndexName || this._elasticIndex,
        body: bodyParam,
      },
      {
        ignore: [404],
      }
    );
    if (
      statusCode === 404 ||
      !body?.hits?.total?.value ||
      body?.hits?.total?.value < 1
    ) {
      return { data: [], totalCount: 0 };
    }

    const data: CreateParam[] = [];
    body.hits.hits.forEach((doc: { _id: string; _source: CreateParam }) => {
      const snap = { id: doc._id, ...doc._source };
      return data.push(snap);
    });

    return { data, totalCount: body.hits.total.value };
  }

  // _____firestore_____>
  async countDocument(filtered: string) {
    const query = filtered
      ? applyFilterQuery(this._collection, JSON.parse(filtered))
      : this._collection;
    const snap = await query.get();
    return snap.size || 0;
  }

  async create(object: CreateParam) {
    const createParam = {
      ...object,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const ref = await this._collection.add(createParam);
    const snap = await ref.get();
    if (snap.data()) {
      return firestoreTimeStampToDate({
        id: ref.id,
        ...snap.data(),
      });
    }
    return firestoreTimeStampToDate({
      id: ref.id,
      ...object,
    });
  }

  async findById(id: string) {
    const ref: admin.firestore.DocumentReference = this._collection.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const data = snap.data();
    return firestoreTimeStampToDate({
      id: snap.id,
      ...data,
    });
  }

  async findByIdWithoutFormat(id: string) {
    const ref: admin.firestore.DocumentReference = this._collection.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    return snap;
  }

  async find(filtered: string, rawQuery?: admin.firestore.Query) {
    let query: admin.firestore.Query;
    if (rawQuery) {
      query = rawQuery;
    } else {
      query = filtered
        ? applyFilterQuery(this._collection, JSON.parse(filtered))
        : this._collection;
    }

    return query.get();
  }

  async findOne(filtered: string, rawQuery?: admin.firestore.Query) {
    let query: admin.firestore.Query;
    if (rawQuery) {
      query = rawQuery;
    } else {
      query = filtered
        ? applyFilterQuery(this._collection, JSON.parse(filtered))
        : this._collection;
    }
    const ref = await query.get();
    if (ref.docs.length > 0) {
      const data = ref.docs[0].data();
      return firestoreTimeStampToDate({
        id: ref.docs[0].id,
        ...data,
      });
    }
    return false;
  }

  async findAll(
    page: number | string = 1,
    limit: number | string = 10,
    filtered: string,
    sorted: string
  ) {
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    let skip = (parsedPage - 1) * parsedLimit || 1;
    if (parsedPage > 1) {
      skip = Number(skip) + 1;
    }
    let query = filtered
      ? applyFilterQuery(this._collection, JSON.parse(filtered))
      : this._collection;
    query = sorted ? applySortQuery(query, JSON.parse(sorted)) : query;

    //get skipbatch
    const first = await query.limit(skip).get();
    if (first.docs.length <= 0 || first.docs.length < skip) {
      return [];
    }
    const last = first.docs[first.docs.length - 1];

    //getData
    const ref = await query.startAt(last).limit(parsedLimit).get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const snap = { id: doc.id, ...doc.data() };
      return data.push(snap);
    });
    return firestoreTimeStampToDate(data);
  }

  async update(
    id: string,
    object: Partial<CreateParam>,
    fileFieldName?: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const oldData = snap.data();

    const createParam = {
      ...object,
      updatedAt: new Date(),
    };
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();

    // -> delete file
    const objectNew: any = object;
    if (
      fileFieldName &&
      oldData?.[fileFieldName] &&
      objectNew?.[fileFieldName]
    ) {
      const url = oldData?.[fileFieldName];
      const filePath = getPathStorageFromUrl(url);
      handleDeleteFirebaseStorage(filePath)
        .then((result) => {
          console.log('Sukses delete ' + filePath);
        })
        .catch((err) => {
          console.log('Error delete file ', err?.message);
        });
    }

    return firestoreTimeStampToDate({
      id: ref.id,
      ...updateSnap.data(),
    });
  }

  async delete(id: string, fileFieldName?: string) {
    const ref: admin.firestore.DocumentReference = this._collection.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    await ref.delete();
    const data = firestoreTimeStampToDate({
      id: ref.id,
      ...snap.data(),
    });
    if (fileFieldName) {
      if (data?.[fileFieldName]) {
        const url = data?.[fileFieldName];
        const filePath = getPathStorageFromUrl(url);
        handleDeleteFirebaseStorage(filePath)
          .then((result) => {
            console.log('Sukses delete ' + filePath);
          })
          .catch((err) => {
            console.log('Error delete file ', err?.message);
          });
      }
    }
    return data;
  }

  async createWithSubdocument(
    object: SubCreateParam,
    parentId: string,
    collectionName: string
  ) {
    const createParam = {
      ...object,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const ref = await this._collection
      .doc(parentId)
      .collection(collectionName)
      .add(createParam);
    const snap = await ref.get();
    if (snap.data()) {
      return firestoreTimeStampToDate({
        id: ref.id,
        ...snap.data(),
      });
    }
    return firestoreTimeStampToDate({
      id: ref.id,
      ...object,
    });
  }

  async findAllSubDocument(
    page: number | string = 1,
    limit: number | string = 10,
    parentId: string,
    collectionName: string,
    filtered: string,
    sorted: string
  ) {
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    let skip = (parsedPage - 1) * parsedLimit || 1;
    if (parsedPage > 1) {
      skip = Number(skip) + 1;
    }
    let query = filtered
      ? applyFilterQuery(
          this._collection.doc(parentId).collection(collectionName),
          JSON.parse(filtered)
        )
      : this._collection.doc(parentId).collection(collectionName);
    query = sorted ? applySortQuery(query, JSON.parse(sorted)) : query;

    const first = await query.limit(skip).get();
    if (first.docs.length <= 0 || first.docs.length < skip) {
      return [];
    }
    const last = first.docs[first.docs.length - 1];

    const ref = await query.startAt(last).limit(parsedLimit).get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const snap = { id: doc.id, ...doc.data() };
      return data.push(snap);
    });
    return firestoreTimeStampToDate(data);
  }
  async findSubdocumentById(
    id: string,
    parentId: string,
    collectionName: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const data = snap.data();
    return firestoreTimeStampToDate({ id: snap.id, ...data });
  }

  async updateSubDocument(
    id: string,
    object: SubCreateParam,
    parentId: string,
    collectionName: string,
    fileFieldName?: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const oldData = snap.data();

    const createParam = {
      ...object,
      updatedAt: new Date(),
    };
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();

    // -> delete file
    const objectNew: any = object;
    if (
      fileFieldName &&
      oldData?.[fileFieldName] &&
      objectNew?.[fileFieldName]
    ) {
      const url = oldData?.[fileFieldName];
      const filePath = getPathStorageFromUrl(url);
      handleDeleteFirebaseStorage(filePath)
        .then((result) => {
          console.log('Sukses delete ' + filePath);
        })
        .catch((err) => {
          console.log('Error delete file ', err?.message);
        });
    }
    return firestoreTimeStampToDate({ id: ref.id, ...updateSnap.data() });
  }

  async deleteSubDocument(
    id: string,
    parentId: string,
    collectionName: string,
    fileFieldName?: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    await ref.delete();
    const data = firestoreTimeStampToDate({ id: ref.id, ...snap.data() });
    if (fileFieldName) {
      if (data?.[fileFieldName]) {
        const url = data?.[fileFieldName];
        const filePath = getPathStorageFromUrl(url);
        handleDeleteFirebaseStorage(filePath)
          .then((result) => {
            console.log('Sukses delete ' + filePath);
          })
          .catch((err) => {
            console.log('Error delete file ', err?.message);
          });
      }
    }

    return data;
  }

  async countSubDocument(
    parentId: string,
    collectionName: string,
    filtered: string
  ) {
    const query = filtered
      ? applyFilterQuery(
          this._collection.doc(parentId).collection(collectionName),
          JSON.parse(filtered)
        )
      : this._collection.doc(parentId).collection(collectionName);
    const snap = await query.get();
    return snap.size || 0;
  }

  async create2LevelSubDocument(
    object: SubCreateParam,
    parentId: string,
    collectionName: string,
    secondParentId: string,
    secondCollectionName: string
  ) {
    const createParam = {
      ...object,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const ref = await this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(secondParentId)
      .collection(secondCollectionName)
      .add(createParam);
    const snap = await ref.get();
    if (snap.data()) {
      return firestoreTimeStampToDate({ id: ref.id, ...snap.data() });
    }
    return firestoreTimeStampToDate({ id: ref.id, ...object });
  }

  async findAll2LevelSubDocument(
    page: number | string = 1,
    limit: number | string = 10,
    parentId: string,
    collectionName: string,
    secondParentId: string,
    secondCollectionName: string,
    filtered: string,
    sorted: string
  ) {
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    let skip = (parsedPage - 1) * parsedLimit || 1;
    if (parsedPage > 1) {
      skip = Number(skip) + 1;
    }
    let query = filtered
      ? applyFilterQuery(
          this._collection
            .doc(parentId)
            .collection(collectionName)
            .doc(secondParentId)
            .collection(secondCollectionName),
          JSON.parse(filtered)
        )
      : this._collection
          .doc(parentId)
          .collection(collectionName)
          .doc(secondParentId)
          .collection(secondCollectionName);
    query = sorted ? applySortQuery(query, JSON.parse(sorted)) : query;

    const first = await query.limit(skip).get();
    if (first.docs.length <= 0 || first.docs.length < skip) {
      return [];
    }
    const last = first.docs[first.docs.length - 1];

    const ref = await query.startAt(last).limit(parsedLimit).get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const snap = { id: doc.id, ...doc.data() };
      return data.push(snap);
    });
    return firestoreTimeStampToDate(data);
  }

  async find2LevelSubDocumentById(
    id: string,
    parentId: string,
    collectionName: string,
    secondParentId: string,
    secondCollectionName: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(secondParentId)
      .collection(secondCollectionName)
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const data = snap.data();
    return firestoreTimeStampToDate({ id: snap.id, ...data });
  }

  async update2LevelSubDocument(
    id: string,
    object: SubCreateParam,
    parentId: string,
    collectionName: string,
    secondParentId: string,
    secondCollectionName: string,
    fileFieldName?: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(secondParentId)
      .collection(secondCollectionName)
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const oldData = snap.data();
    const createParam = {
      ...object,
      updatedAt: new Date(),
    };
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();

    // -> delete file
    const objectNew: any = object;
    if (
      fileFieldName &&
      oldData?.[fileFieldName] &&
      objectNew?.[fileFieldName]
    ) {
      const url = oldData?.[fileFieldName];
      const filePath = getPathStorageFromUrl(url);
      handleDeleteFirebaseStorage(filePath)
        .then((result) => {
          console.log('Sukses delete ' + filePath);
        })
        .catch((err) => {
          console.log('Error delete file ', err?.message);
        });
    }
    return firestoreTimeStampToDate({ id: ref.id, ...updateSnap.data() });
  }

  async delete2LevelSubDocument(
    id: string,
    parentId: string,
    collectionName: string,
    secondParentId: string,
    secondCollectionName: string,
    fileFieldName?: string
  ) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc(parentId)
      .collection(collectionName)
      .doc(secondParentId)
      .collection(secondCollectionName)
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    await ref.delete();
    const data = firestoreTimeStampToDate({
      id: ref.id,
      ...snap.data(),
    });
    if (fileFieldName) {
      if (data?.[fileFieldName]) {
        const url = data?.[fileFieldName];
        const filePath = getPathStorageFromUrl(url);
        handleDeleteFirebaseStorage(filePath)
          .then((result) => {
            console.log('Sukses delete ' + filePath);
          })
          .catch((err) => {
            console.log('Error delete file ', err?.message);
          });
      }
    }
    return data;
  }

  async count2LevelSubDocument(
    parentId: string,
    collectionName: string,
    secondParentId: string,
    secondCollectionName: string,
    filtered: string
  ) {
    const query = filtered
      ? applyFilterQuery(
          this._collection
            .doc(parentId)
            .collection(collectionName)
            .doc(secondParentId)
            .collection(secondCollectionName),
          JSON.parse(filtered)
        )
      : this._collection
          .doc(parentId)
          .collection(collectionName)
          .doc(secondParentId)
          .collection(secondCollectionName);
    const snap = await query.get();

    return snap.size || 0;
  }

  async importExcel(
    files: IFiles,
    columnToKey: StringKeys,
    schemaValidation: yup.ObjectSchema<any>,
    additionalColumn = {},
    collectionRef = this._collection
  ) {
    if (!files?.excel) {
      throw new InvalidRequestError('Please upload xlsx, xls file', 'excel');
    }
    const { path } = files.excel;
    const data = await handleImportExcel(path, columnToKey, files);

    if (data.length < 1) {
      throw new InvalidRequestError(
        'Format Excel tidak valid, pastikan barada di "Sheet1"',
        this._name
      );
    }
    const executeData = await writeToFirestore(
      data,
      collectionRef,
      schemaValidation,
      additionalColumn
    );
    return executeData;
  }
}
