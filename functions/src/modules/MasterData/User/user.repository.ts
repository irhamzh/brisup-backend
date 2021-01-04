import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';
import {
  IUserBase,
  IUserExtended,
} from '@modules/MasterData/User/interface/user.interface';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';
import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';

type loginParam = Omit<IUserExtended, 'name' | 'role' | 'profilePicture'>;

export default class UserRepository extends BaseRepository<IUserBase> {
  _userModel: admin.firestore.CollectionReference;
  constructor() {
    super('users', 'user');
    this._userModel = db.collection('users');
  }

  async signUp(object: IUserExtended, role: IRoleBase) {
    //-> create auth account
    const execute = await firebase
      .auth()
      .createUserWithEmailAndPassword(object.email, object.password);

    //-> set custom claims
    await admin.auth().setCustomUserClaims(execute?.user?.uid as string, {
      name: object.name,
      role,
    });

    // const token = await execute?.user?.getIdToken();
    // const refreshToken = execute?.user?.refreshToken;

    //-> delete password
    const createParam = JSON.parse(JSON.stringify(object));
    if (createParam.password) {
      delete createParam.password;
    }

    //->add user data to firestore
    const ref = this._userModel.doc(execute?.user?.uid as string);
    await ref.set(createParam, { merge: true });
    const snap = await ref.get();
    const data: admin.firestore.DocumentData = {
      id: ref.id,
      ...snap.data(),
      role,
    };

    return {
      data: firestoreTimeStampToDate(data),
      // token,
      // refreshToken,
    };
  }

  async logIn(object: loginParam, role: IRoleBase, uid: string, name: string) {
    //-> set customClaims
    await admin.auth().setCustomUserClaims(uid, {
      name,
      role,
    });

    //-> exceute signIn
    const data: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(object.email, object.password);

    //-> handle token
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

  async updateAuth(uid: string, object: IUserExtended, role: IRoleBase) {
    //-> revoke access token
    await admin.auth().revokeRefreshTokens(uid);

    //-> update user token
    await admin
      .auth()
      .updateUser(uid, { email: object.email, password: object.password });

    //-> login user
    const { token, refreshToken, decodedToken } = await this.logIn(
      object,
      role,
      uid,
      object.name
    );
    return { token, refreshToken, decodedToken };
  }
}
