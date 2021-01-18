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
export { api };
