import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { formatDateTime } from '@utils/Date';
import NotFoundError from '@interfaces/NotFoundError';
import validationWording from '@constants/validationWording';

import { db } from '@utils/admin';

export default class FirestoreRepository<CreateParam, ConditionParam = {}> {
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
  async countDocument() {
    const snap = await this._collection.get();
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
      return {
        id: ref.id,
        ...snap.data(),
        createdAt: formatDateTime(snap.data()?.createdAt.toDate()),
        updatedAt: formatDateTime(snap.data()?.updatedAt.toDate()),
      };
    }
    return {
      id: ref.id,
      ...object,
      createdAt: formatDateTime(createParam.createdAt),
      updatedAt: formatDateTime(createParam.updatedAt),
    };
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
    return {
      id: snap.id,
      ...data,
      createdAt: formatDateTime(data?.createdAt.toDate()),
      updatedAt: formatDateTime(data?.updatedAt.toDate()),
    };
  }

  async findAll(page: number | string = 1, limit: number | string = 10) {
    // .where('name', '==', '\uf8ff' + '' + '\uf8ff')
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    let skip = (parsedPage - 1) * parsedLimit || 1;
    if (parsedPage > 1) {
      skip = Number(skip) + 1;
    }
    console.log(skip);
    //get skipbatch
    const first = await this._collection
      .orderBy('createdAt', 'asc')
      .limit(skip)
      .get();
    if (first.docs.length <= 0 || first.docs.length < skip) {
      return [];
    }
    const last = first.docs[first.docs.length - 1];

    //getData
    const ref = await this._collection
      .orderBy('createdAt', 'asc')
      .startAt(last)
      .limit(parsedLimit)
      .get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const snap = { id: doc.id, ...doc.data() };
      return data.push({
        ...snap,
        createdAt: formatDateTime(snap.createdAt.toDate()),
        updatedAt: formatDateTime(snap.updatedAt.toDate()),
      });
    });
    return data;
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
    return {
      id: ref.id,
      ...updateSnap.data(),
      createdAt: formatDateTime(updateSnap.data()?.createdAt.toDate()),
      updatedAt: formatDateTime(updateSnap.data()?.updatedAt.toDate()),
    };
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
    return {
      id: ref.id,
      ...snap.data(),
      createdAt: formatDateTime(snap.data()?.createdAt.toDate()),
      updatedAt: formatDateTime(snap.data()?.updatedAt.toDate()),
    };
  }
}
