import 'module-alias/register';
import './fixPaths';

import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
import * as logger from 'morgan';

import config from '@utils/config';
import useApiRouter from './routes';
firebase.initializeApp(config);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
useApiRouter(app);

const api = functions.region('asia-southeast2').https.onRequest(app);
export { api };
