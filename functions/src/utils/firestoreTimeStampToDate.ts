import * as admin from 'firebase-admin';

export default function firestoreTimeStampToDate(obj: any) {
  for (const prop in obj) {
    if (obj[prop] instanceof admin.firestore.Timestamp) {
      obj[prop] = obj[prop].toDate();
    }
    if (typeof obj[prop] == 'object') {
      firestoreTimeStampToDate(obj[prop]);
    }
  }
  return obj;
}
