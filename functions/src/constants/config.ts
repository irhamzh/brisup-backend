require('dotenv').config();
import config from '@utils/config';

const BASE_URL_STORAGE = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/`;

const { ES_HOST, ES_PORT, ES_NODE } = process.env;
export { ES_HOST, ES_PORT, ES_NODE, BASE_URL_STORAGE };
