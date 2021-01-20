import * as admin from 'firebase-admin';

export default function handleDeleteFirebaseStorage(deletedImages: string[]) {
  const bucket = admin.storage().bucket();
  const imagesRemovePromises = deletedImages.map((imagePath: string) => {
    return bucket.file(imagePath).delete();
  });
  return Promise.all(imagesRemovePromises);
}
