import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';
import { IUserBase } from '@modules/User/interface/user.interface';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

type loginParam = Omit<IUserBase, 'name' | 'role' | 'profilePicture'>;

export default class UserRepository extends BaseRepository<IUserBase> {
  _userModel: admin.firestore.CollectionReference;
  constructor() {
    super('users', 'user');
    this._userModel = db.collection('users');
  }

  async signUp(object: IUserBase) {
    const execute = await firebase
      .auth()
      .createUserWithEmailAndPassword(object.email, object.password);

    const token = await execute?.user?.getIdToken();
    const ref = this._userModel.doc(execute?.user?.uid as string);
    await ref.set(object, { merge: true });
    const snap = await ref.get();

    const data: admin.firestore.DocumentData = {
      id: ref.id,
      ...snap.data(),
    };
    if (data?.password) {
      delete data.password;
    }
    return {
      data: firestoreTimeStampToDate(data),
      token,
    };
  }

  async logIn(object: loginParam) {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(object.email, object.password);
    const token = await data?.user?.getIdToken();
    return token;
  }

  async deleteSingleAuthUser(uid: string) {
    return admin.auth().deleteUser(uid);
  }

  async updateAuth(uid: string, object: Partial<loginParam>) {
    return admin.auth().updateUser(uid, object);
  }
}
