import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import NotFoundError from '@interfaces/NotFoundError';
import validationWording from '@constants/validationWording';

import { db } from '@utils/admin';
import applyFilterQuery from '@utils/applyFilterQuery';

import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

export default class FirestoreRepository<
  CreateParam,
  ConditionParam = {},
  SubCreateParam = {}
> {
  _collection: admin.firestore.CollectionReference;
  _name: string;
  // _defaultPopulate: string[];
  constructor(
    // db: admin.firestore.Firestore,
    collectionName: string,
    name: string
    // defaultPopulate: string[] = []
  ) {
    this._collection = db.collection(collectionName);
    this._name = name;
    // this._defaultPopulate = defaultPopulate;
  }

  //cadangan
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

  async update(id: string, object: Partial<CreateParam>) {
    const ref: admin.firestore.DocumentReference = this._collection.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    const createParam = {
      ...object,
      updatedAt: new Date(),
    };
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();
    return firestoreTimeStampToDate({
      id: ref.id,
      ...updateSnap.data(),
    });
  }

  async delete(id: string) {
    const ref: admin.firestore.DocumentReference = this._collection.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    await ref.delete();
    return firestoreTimeStampToDate({
      id: ref.id,
      ...snap.data(),
    });
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
    const createParam = {
      ...object,
      updatedAt: new Date(),
    };
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();
    return firestoreTimeStampToDate({ id: ref.id, ...updateSnap.data() });
  }

  async deleteSubDocument(
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
    await ref.delete();
    return firestoreTimeStampToDate({ id: ref.id, ...snap.data() });
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
    const createParam = {
      ...object,
      updatedAt: new Date(),
    };
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();
    return firestoreTimeStampToDate({ id: ref.id, ...updateSnap.data() });
  }

  async delete2LevelSubDocument(
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
    await ref.delete();
    return firestoreTimeStampToDate({ id: ref.id, ...snap.data() });
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
}
