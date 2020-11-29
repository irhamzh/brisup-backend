import * as controller from './pengadaan.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

// 'Penunjukan Langsung'
errorHandledRoute.get(
  '/barang/penunjukan-langsung',
  controller.getAllPengadaanBarangPenunjukanLangsung
);
errorHandledRoute.post(
  '/barang/penunjukan-langsung',
  controller.createBarangPenunjukanLangsung
);
errorHandledRoute.put(
  '/barang/penunjukan-langsung/:uid',
  controller.updateBarangPenunjukanLangsung
);
errorHandledRoute.get(
  '/barang/penunjukan-langsung/:uid',
  controller.getPengadaanBarangPenunjukanLangsungById
);

errorHandledRoute.delete(
  '/barang/penunjukan-langsung/:uid',
  controller.deletePengadaanById
);

//Pembelian Langsung
errorHandledRoute.get(
  '/barang/pembelian-langsung',
  controller.getAllPengadaanBarangPembelianLangsung
);
errorHandledRoute.post(
  '/barang/pembelian-langsung',
  controller.createBarangPembelianLangsung
);
errorHandledRoute.put(
  '/barang/pembelian-langsung/:uid',
  controller.updateBarangPembelianLangsung
);
errorHandledRoute.get(
  '/barang/pembelian-langsung/:uid',
  controller.getPengadaanBarangPembelianLangsungById
);
errorHandledRoute.delete(
  '/barang/pembelian-langsung/:uid',
  controller.deletePengadaanById
);

//Pemilihan Langsung
errorHandledRoute.get(
  '/barang/pemilihan-langsung',
  controller.getAllPengadaanBarangPemilihanLangsung
);
errorHandledRoute.post(
  '/barang/pemilihan-langsung',
  controller.createBarangPemilihanLangsung
);
errorHandledRoute.put(
  '/barang/pemilihan-langsung/:uid',
  controller.updateBarangPemilihanLangsung
);
errorHandledRoute.get(
  '/barang/pemilihan-langsung/:uid',
  controller.getPengadaanBarangPemilihanLangsungById
);
errorHandledRoute.delete(
  '/barang/pemilihan-langsung/:uid',
  controller.deletePengadaanById
);

//Swakelola
errorHandledRoute.get(
  '/barang/swakelola',
  controller.getAllPengadaanBarangSwakelola
);
errorHandledRoute.post('/barang/swakelola', controller.createBarangSwakelola);
errorHandledRoute.put(
  '/barang/swakelola/:uid',
  controller.updateBarangSwakelola
);
errorHandledRoute.get(
  '/barang/swakelola/:uid',
  controller.getPengadaanBarangSwakelolaById
);
errorHandledRoute.delete(
  '/barang/swakelola/:uid',
  controller.deletePengadaanById
);

//Lelang
errorHandledRoute.get('/barang/lelang', controller.getAllPengadaanBarangLelang);
errorHandledRoute.post('/barang/lelang', controller.createBarangLelang);
errorHandledRoute.put('/barang/lelang/:uid', controller.updateBarangLelang);
errorHandledRoute.get(
  '/barang/lelang/:uid',
  controller.getPengadaanBarangLelangById
);
errorHandledRoute.delete('/barang/lelang/:uid', controller.deletePengadaanById);

//penunjukan-langsung
errorHandledRoute.get(
  '/konsultan/penunjukan-langsung',
  controller.getAllPengadaanKonsultanPenunjukanLangsung
);
errorHandledRoute.post(
  '/konsultan/penunjukan-langsung',
  controller.createKonsultanPenunjukanLangsung
);
errorHandledRoute.put(
  '/konsultan/penunjukan-langsung/:uid',
  controller.updateKonsultanPenunjukanLangsung
);
errorHandledRoute.get(
  '/konsultan/penunjukan-langsung/:uid',
  controller.getPengadaanKonsultanPenunjukanLangsungById
);
errorHandledRoute.delete(
  '/konsultan/penunjukan-langsung/:uid',
  controller.deletePengadaanById
);

// Seleksi Langsung
errorHandledRoute.get(
  '/konsultan/seleksi-langsung',
  controller.getAllPengadaanKonsultanSeleksiLangsung
);
errorHandledRoute.post(
  '/konsultan/seleksi-langsung',
  controller.createKonsultanSeleksiLangsung
);
errorHandledRoute.put(
  '/konsultan/seleksi-langsung/:uid',
  controller.updateKonsultanSeleksiLangsung
);
errorHandledRoute.get(
  '/konsultan/seleksi-langsung/:uid',
  controller.getPengadaanKonsultanSeleksiLangsungById
);
errorHandledRoute.delete(
  '/konsultan/seleksi-langsung/:uid',
  controller.deletePengadaanById
);
errorHandledRoute.delete('/:uid', controller.deletePengadaanById);
errorHandledRoute.get('/', controller.getAllPengadaan);

export default router;
