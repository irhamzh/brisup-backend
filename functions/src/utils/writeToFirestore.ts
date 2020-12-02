import * as yup from 'yup';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';

interface StringKeys {
  [key: string]: string;
}

export default function writeToFirestore(
  records: StringKeys[],
  collectionRef: admin.firestore.CollectionReference,
  schemaValidation: yup.ObjectSchema<any>
) {
  const batchCommits = [];
  const invalidRow: number[] = [];

  let batch = db.batch();
  records.forEach((record, i) => {
    const docRef = collectionRef.doc();

    const validate = schemaValidation.isValidSync(record);
    if (!validate) {
      invalidRow.push(Number(i) + 1);
      return;
    }
    batch.set(docRef, {
      ...record,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if ((i + 1) % 500 === 0) {
      console.log(`Writing record ${i + 1}`);
      batchCommits.push(batch.commit());
      batch = db.batch();
    }
  });
  batchCommits.push(batch.commit());
  Promise.all(batchCommits);
  return invalidRow;
}
