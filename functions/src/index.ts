import 'module-alias/register';
import './fixPaths';

import * as cors from 'cors';
import * as logger from 'morgan';
import * as express from 'express';
import * as firebase from 'firebase';
import * as functions from 'firebase-functions';

import config, { backupDBBucket } from '@utils/config';
// import elasticClient from '@utils/elasticsearchConfig';

const { Firestore } = require('@google-cloud/firestore');
const clientFirestore = new Firestore.v1.FirestoreAdminClient();

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

const scheduleFirestoreExport = functions.pubsub
  .schedule('30 2 * * 0')
  .onRun((context) => {
    console.log('running backup db');
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = clientFirestore.databasePath(projectId, '(default)');

    return clientFirestore
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: `gs://${backupDBBucket}`,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [],
      })
      .then((responses: any) => {
        const response = responses[0];
        console.log(`Operation Name: ${response['name']}`);
      })
      .catch((err: Error) => {
        console.error(err);
        throw new Error('Export operation failed');
      });
  });

export { api, scheduleSisaAnggaran, scheduleFirestoreExport };
