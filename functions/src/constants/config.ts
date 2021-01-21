require('dotenv').config();
import config from '@utils/config';

const BASE_URL_STORAGE = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/`;

const {
  ES_HOST = '127.0.0.1',
  ES_PORT = '9200',
  ES_NODE = 'http://search-bri.ujiaplikasi.com',
} = process.env;
export { ES_HOST, ES_PORT, ES_NODE, BASE_URL_STORAGE };
