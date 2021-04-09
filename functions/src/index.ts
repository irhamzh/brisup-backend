import 'module-alias/register';
import './fixPaths';

import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
import * as logger from 'morgan';

import config from '@utils/config';
// import elasticClient from '@utils/elasticsearchConfig';
import useApiRouter from './routes';
import FaAnggaranRepository from './modules/FixedAsset/Anggaran/anggaran.repository';

firebase.initializeApp(config);

// elasticClient.ping({}, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//     // verify();
//   } else {
//     console.log('Elasticsearch Database connected...');
//   }
// });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
useApiRouter(app);

const api = functions.region('asia-southeast2').https.onRequest(app);

const faAnggaranRepository = new FaAnggaranRepository();
const scheduleSisaAnggaran = functions
  .region('asia-southeast2')
  .pubsub.schedule('5 0 1 * *') //“At 00:00 on day-of-month 1.”
  .timeZone('Asia/Jakarta')
  .onRun((context) => {
    faAnggaranRepository.runJob();
    return null;
  });
export { api, scheduleSisaAnggaran };
