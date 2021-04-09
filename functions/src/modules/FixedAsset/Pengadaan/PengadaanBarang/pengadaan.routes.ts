import { Router } from 'express';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

import * as controller from './pengadaan.controller';
// 'Penunjukan Langsung'
errorHandledRoute.get(
  '/barang/penunjukan-langsung',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanBarangPenunjukanLangsung
);
errorHandledRoute.post(
  '/barang/penunjukan-langsung',
  accessMiddleware('fixedAsset', 'create'),
  controller.createBarangPenunjukanLangsung
);
errorHandledRoute.put(
  '/barang/penunjukan-langsung/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateBarangPenunjukanLangsung
);
errorHandledRoute.get(
  '/barang/penunjukan-langsung/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanBarangPenunjukanLangsungById
);

errorHandledRoute.delete(
  '/barang/penunjukan-langsung/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

//Pembelian Langsung
errorHandledRoute.get(
  '/barang/pembelian-langsung',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanBarangPembelianLangsung
);
errorHandledRoute.post(
  '/barang/pembelian-langsung',
  accessMiddleware('fixedAsset', 'create'),
  controller.createBarangPembelianLangsung
);
errorHandledRoute.put(
  '/barang/pembelian-langsung/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateBarangPembelianLangsung
);
errorHandledRoute.get(
  '/barang/pembelian-langsung/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanBarangPembelianLangsungById
);
errorHandledRoute.delete(
  '/barang/pembelian-langsung/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

//Pemilihan Langsung
errorHandledRoute.get(
  '/barang/pemilihan-langsung',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanBarangPemilihanLangsung
);
errorHandledRoute.post(
  '/barang/pemilihan-langsung',
  accessMiddleware('fixedAsset', 'create'),
  controller.createBarangPemilihanLangsung
);
errorHandledRoute.put(
  '/barang/pemilihan-langsung/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateBarangPemilihanLangsung
);
errorHandledRoute.get(
  '/barang/pemilihan-langsung/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanBarangPemilihanLangsungById
);
errorHandledRoute.delete(
  '/barang/pemilihan-langsung/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

//Swakelola
errorHandledRoute.get(
  '/barang/swakelola',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanBarangSwakelola
);
errorHandledRoute.post(
  '/barang/swakelola',
  accessMiddleware('fixedAsset', 'create'),
  controller.createBarangSwakelola
);
errorHandledRoute.put(
  '/barang/swakelola/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateBarangSwakelola
);
errorHandledRoute.get(
  '/barang/swakelola/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanBarangSwakelolaById
);
errorHandledRoute.delete(
  '/barang/swakelola/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

//Lelang
errorHandledRoute.get(
  '/barang/lelang',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanBarangLelang
);
errorHandledRoute.post(
  '/barang/lelang',
  accessMiddleware('fixedAsset', 'create'),
  controller.createBarangLelang
);
errorHandledRoute.put(
  '/barang/lelang/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateBarangLelang
);
errorHandledRoute.get(
  '/barang/lelang/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanBarangLelangById
);
errorHandledRoute.delete(
  '/barang/lelang/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

//penunjukan-langsung
errorHandledRoute.get(
  '/konsultan/penunjukan-langsung',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanKonsultanPenunjukanLangsung
);
errorHandledRoute.post(
  '/konsultan/penunjukan-langsung',
  accessMiddleware('fixedAsset', 'create'),
  controller.createKonsultanPenunjukanLangsung
);
errorHandledRoute.put(
  '/konsultan/penunjukan-langsung/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateKonsultanPenunjukanLangsung
);
errorHandledRoute.get(
  '/konsultan/penunjukan-langsung/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanKonsultanPenunjukanLangsungById
);
errorHandledRoute.delete(
  '/konsultan/penunjukan-langsung/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

// Seleksi Langsung
errorHandledRoute.get(
  '/konsultan/seleksi-langsung',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanKonsultanSeleksiLangsung
);
errorHandledRoute.post(
  '/konsultan/seleksi-langsung',
  accessMiddleware('fixedAsset', 'create'),
  controller.createKonsultanSeleksiLangsung
);
errorHandledRoute.put(
  '/konsultan/seleksi-langsung/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateKonsultanSeleksiLangsung
);
errorHandledRoute.get(
  '/konsultan/seleksi-langsung/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPengadaanKonsultanSeleksiLangsungById
);
errorHandledRoute.delete(
  '/konsultan/seleksi-langsung/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);

errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePengadaanById
);
errorHandledRoute.get(
  '/',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaan
);
errorHandledRoute.get(
  '/full',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPengadaanFull
);
errorHandledRoute.get(
  '/dashboard',
  accessMiddleware('fixedAsset', 'dashboard'),
  controller.dashboard
);
errorHandledRoute.put(
  '/:uid/approve-process',
  accessMiddleware('fixedAsset', 'create'),
  controller.approveProcess
);
errorHandledRoute.put(
  '/:uid/approve-supervisor',
  accessMiddleware('fixedAsset', 'approvalSupervisor'),
  controller.approveSupervisor
);
errorHandledRoute.put(
  '/:uid/approve-wabag',
  accessMiddleware('fixedAsset', 'approvalWakabag'),
  controller.approveWabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag',
  accessMiddleware('fixedAsset', 'approvalKabag'),
  controller.approveKabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag-wakabag',
  controller.approveKabagWakabag
);
errorHandledRoute.put(
  '/:uid/finish',
  accessMiddleware('fixedAsset', 'create'),
  controller.approveFinish
);

export default router;
