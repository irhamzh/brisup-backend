import { BASE_URL_STORAGE } from '@constants/config';

export default function getPathStorageFromUrl(url: String) {
  let imagePath = url.replace(BASE_URL_STORAGE, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');
  return decodeURIComponent(imagePath);
}
