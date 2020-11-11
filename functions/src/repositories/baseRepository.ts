import * as firebase from 'firebase';
export default class FirestoreRepository<CreateParam, ConditionParam = {}> {
  _collection: firebase.firestore.CollectionReference;
  _defaultPopulate: string[];
  constructor(
    db: firebase.firestore.Firestore,
    collectionName: string,
    defaultPopulate: string[] = []
  ) {
    this._collection = db.collection(collectionName);
    this._defaultPopulate = defaultPopulate;
  }

  async create(object: CreateParam) {
    return await this._collection.add(object);
  }

  async readOne(id: string) {
    return await this._collection.doc(id);
  }

  async readAll() {
    const execute: any = await this._collection
      .orderBy('createdAt', 'desc')
      .get();
    const data = execute.map((item: firebase.firestore.DocumentData) => ({
      id: item,
      ...item.data(),
    }));
    return data;
  }

  async update(id: string, object: CreateParam) {
    const ref: firebase.firestore.DocumentReference = this._collection.doc(id);
    const snap: firebase.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      return ref;
    }
    await ref.update(object);
    return ref;
  }

  async delete(id: string) {
    const ref: firebase.firestore.DocumentReference = this._collection.doc(id);
    await ref.delete();
    return ref;
  }
}
