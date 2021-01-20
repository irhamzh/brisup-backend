import { BASE_URL_STORAGE } from '@constants/config';

function getSinglePathStorageFromUrl(url: string) {
  let imagePath = url.replace(BASE_URL_STORAGE, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');
  return decodeURIComponent(imagePath);
}

export default function getPathStorageFromUrl(url: string | string[]) {
  const arrayImagePath = [];
  if (url instanceof Array && Array.isArray(url)) {
    for (const imageUrl of url) {
      arrayImagePath.push(getSinglePathStorageFromUrl(imageUrl));
    }
  } else {
    arrayImagePath.push(getSinglePathStorageFromUrl(url));
  }
  return arrayImagePath;
}
