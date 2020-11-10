import * as express from 'express';
// import * as firebase from 'firebase';
import * as functions from 'firebase-functions';

// import useApiRouter from './routes';
// import { admin, db } from '#utils/admin';
import 'module-alias/register';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// firebase.initializeApp(config);
// useApiRouter(app);
const api = functions.region('asia-southeast2').https.onRequest(app);
export default api;
// const {
//   signup,
//   login,
//   uploadImage,
//   updateUser,
//   getUserData,
//   getAllUser,
// } = require('./handlers/User');
// const { FBAuth } = require('./middlewares');
// const {
//   getAllPersekot,
//   createPersekot,
//   updatePersekot,
//   getPersekot,
// } = require('./handlers/Persekot');
// const config = require('./utils/config');
// const { getAllVendor, getVendor, createVendor } = require('./handlers/Vendor');

// const {
//   getAllRoles,
//   getRole,
//   createRole,
//   updateRole,
// } = require('./handlers/Roles');
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

// firebase.initializeApp(config);
// useApiRouter(app);
// // // User Route
// app.post('/signup', signup);
// // app.post("/login", login);
// // app.post("/user/image", FBAuth, uploadImage);
// // app.post("/user/update", FBAuth, updateUser);
// // app.get("/user/:uid", getUserData);
// // app.get('/user', getAllUser);

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

// // // Roles Route
// // app.get("/roles", getAllRoles);
// // app.get("/roles/:id", getRole);
// // app.post("/roles", FBAuth, createRole);
// // app.put("/roles/:id", FBAuth, updateRole);

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
