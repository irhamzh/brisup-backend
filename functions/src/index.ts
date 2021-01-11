import 'module-alias/register';
import './fixPaths';

import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
import * as logger from 'morgan';
// import * as elasticsearch from 'elasticsearch';

import config from '@utils/config';
import useApiRouter from './routes';
firebase.initializeApp(config);

// const client = new elasticsearch.Client({
//   host: '127.0.0.1:9200',
//   log: 'error',
// });

// client.ping({ requestTimeout: 30000 }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('Everything is ok');
//   }
// });

// function indices() {
//   return client.cat
//     .indices({ v: true } as any)
//     .then(console.log)
//     .catch((err) => console.error(`Error connecting to the es client: ${err}`));
// }
// indices();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
useApiRouter(app);

const api = functions.region('asia-southeast2').https.onRequest(app);
export { api };
