import 'module-alias/register';
import './fixPaths';

import * as express from 'express';
import * as firebase from 'firebase';
import * as functions from 'firebase-functions';

import config from '@utils/config';
import useApiRouter from './routes';
firebase.initializeApp(config);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
useApiRouter(app);

const api = functions.region('asia-southeast2').https.onRequest(app);
export { api };

// const {
//   getAllPersekot,
//   createPersekot,
//   updatePersekot,
//   getPersekot,
// } = require('./handlers/Persekot');
// const { getAllVendor, getVendor, createVendor } = require('./handlers/Vendor');

// const {
//   getAllMasterKondisi,
//   getMasterKondisi,
//   createMasterKondisi,
//   updateMasterKondisi,
// } = require('./handlers/MasterKondisi');
// const {
//   getAllJenisBarang,
//   getJenisBarang,
//   createJenisBarang,
//   updateJenisBarang,
// } = require('./handlers/JenisBarang');

// // // Persekot Route
// // app.get("/persekot", getAllPersekot);
// // app.get("/persekot/:id", getPersekot);
// // app.post("/persekot", FBAuth, createPersekot);
// // app.put("/persekot/:id", FBAuth, updatePersekot);

// // // Vendor Route
// // app.get("/vendor", getAllVendor);
// // app.get("/vendor/:id", getVendor);
// // app.post("/vendor", FBAuth, createVendor);
// // app.put("/vendor/:id", FBAuth, updatePersekot);

// // // masterKondisi Route
// // app.get("/master-kondisi", getAllMasterKondisi);
// // app.get("/master-kondisi/:id", getMasterKondisi);
// // app.post("/master-kondisi", FBAuth, createMasterKondisi);
// // app.put("/master-kondisi/:id", FBAuth, updateMasterKondisi);

// // // JenisBarang Route
// // app.get("/master-kondisi", getAllJenisBarang);
// // app.get("/master-kondisi/:id", getJenisBarang);
// // app.post("/master-kondisi", FBAuth, createJenisBarang);
// // app.put("/master-kondisi/:id", FBAuth, updateJenisBarang);

// // Master Jenis Barang Route
// // app.get('/master-jenis-barang', getAllMasterJenisBarang)
