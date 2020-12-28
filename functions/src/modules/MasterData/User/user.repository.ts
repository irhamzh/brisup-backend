import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';
import { IUserBase } from '@modules/MasterData/User/interface/user.interface';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';
import removeEmpty from '@utils/removeEmpty';
import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';

type loginParam = Omit<IUserBase, 'name' | 'role' | 'profilePicture'>;

export default class UserRepository extends BaseRepository<IUserBase> {
  _userModel: admin.firestore.CollectionReference;
  constructor() {
    super('users', 'user');
    this._userModel = db.collection('users');
  }

  async signUp(object: IUserBase, role: IRoleBase) {
    const execute = await firebase
      .auth()
      .createUserWithEmailAndPassword(object.email, object.password);
    await admin.auth().setCustomUserClaims(execute?.user?.uid as string, {
      name: object.name,
      role,
    });
    // const token = await execute?.user?.getIdToken();
    // const refreshToken = execute?.user?.refreshToken;

    const ref = this._userModel.doc(execute?.user?.uid as string);
    await ref.set(object, { merge: true });
    const snap = await ref.get();

    const data: admin.firestore.DocumentData = {
      id: ref.id,
      ...snap.data(),
      role,
    };
    if (data?.password) {
      delete data.password;
    }
    return {
      data: firestoreTimeStampToDate(data),
      // token,
      // refreshToken,
    };
  }

  async logIn(object: loginParam, role: IRoleBase, uid: string, name: string) {
    await admin.auth().setCustomUserClaims(uid, {
      name,
      role,
    });
    const data: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(object.email, object.password);

    const token = await data?.user?.getIdToken();
    const decodedToken = await data?.user?.getIdTokenResult(true);
    const refreshToken = data?.user?.refreshToken;
    return { token, decodedToken, data, refreshToken };
  }

  async deleteSingleAuthUser(uid: string) {
    return admin.auth().deleteUser(uid);
  }

  async getCurrentAuth(uid: string) {
    return admin.auth().getUser(uid);
  }

  async getCurrentAuthByEmail(email: string) {
    return admin.auth().getUserByEmail(email);
  }

  async revokeRefreshTokens(uid: string) {
    await admin.auth().revokeRefreshTokens(uid);
    const userRecord: any = await this.getCurrentAuth(uid);
    const timeValid =
      new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
    return `Tokens revoked at: ${timeValid}`;
  }

  async updateAuth(
    uid: string,
    object: Partial<Omit<IUserBase, 'profilePicture'>>
  ) {
    if (object?.role || object?.name) {
      const customClaims = {
        role: object?.role,
        name: object?.name,
      };
      const customUserClaims = removeEmpty(customClaims);
      console.log('customUserClaims', customUserClaims, 'customUserClaims');
      await admin.auth().setCustomUserClaims(uid, customUserClaims);
    }
    const data = await admin.auth().updateUser(uid, object);
    return data;
  }
}
