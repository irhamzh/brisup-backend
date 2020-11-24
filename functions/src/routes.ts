import { Router, Application } from 'express';

import useRouter from '@modules/User/user.routes';
import roleRouter from '@modules/Role/role.routes';
import itemRouter from '@modules/Item/item.routes';
import floorRouter from '@modules/Floor/floor.routes';
import ruanganRouter from '@modules/Ruangan/ruangan.routes';
import partnerRouter from '@modules/Partner/partner.routes';
import jenisPcRouter from '@modules/JenisPC/jenis_pc.routes';
import providerRouter from '@modules/Provider/provider.routes';
import roomTypeRouter from '@modules/RoomType/room_type.routes';
import buildingTypeRouter from '@modules/BuildingType/building_type.routes';
import jenisBarangRouter from '@modules/JenisBarang/jenis_barang.routes';
import buildingRouter from '@modules/MasterData/Building/building.routes';
import compressorRouter from '@modules/MasterData/Compressor/compressor.routes';
import waterMeterRouter from '@modules/MasterData/WaterMater/water_meter.routes';
import pumpRouter from '@modules/MasterData/Pump/pump.routes';
import pumpUnitRouter from '@modules/MasterData/PumpUnit/pump_unit.routes';
import locationRouter from '@modules/MasterData/Location/location.routes';
import cateringRouter from '@modules/MasterData/Catering/catering.routes';
import vendorRouter from '@modules/MasterData/Vendor/vendor.routes';

import assetRouter from '@modules/FixedAsset/Asset/asset.routes';
import monitoringVendorRouter from '@modules/FixedAsset/Vendor/vendor.routes';
import persekotRouter from '@modules/FixedAsset/Persekot/persekot.routes';
import persediaanRouter from '@modules/FixedAsset/Persediaan/persediaan.routes';
import peralatanITRouter from '@modules/FixedAsset/PeralatanIT/peralatan.routes';
import evaluasiSuplierRouter from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/evaluasi_suplier.routes';
import pengadaanRouter from '@modules/FixedAsset/Pengadaan/PengadaanBarang/pengadaan.routes';
import purchaseOrderRouter from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.routes';
import tandaTerimaRouter from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/tanda_terima_barang.routes';
import workingOrderRouter from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.routes';

import itToolRouter from '@modules/PengelolaanGedung/PeralatanIT/peralatan_it.routes';
import workingToolRouter from '@modules/PengelolaanGedung/PeralatanKerja/peralatan_kerja.routes';
import basementRouter from '@modules/PengelolaanGedung/Engineer/Basement/basement.routes';
import mechanicalElectricalRouter from '@modules/PengelolaanGedung/Engineer/Gedung/MechanicalElectrical/mechanical_eletrical.routes';
import ruanganGedungRouter from '@modules/PengelolaanGedung/Engineer/Gedung/Ruangan/gedung_ruangan.routes';
import sanitationRouter from '@modules/PengelolaanGedung/Kebersihan/sanitation.routes';

import evaluasiHotelRouter from '@modules/Procurement/Hotel/Evaluasi/evaluasi_hotel.routes';
import klasifikasiHotelRouter from '@modules/Procurement/Hotel/Klasifikasi/klasifikasi_hotel.routes';
import evaluasiCateringRouter from '@modules/Procurement/Catering/Evaluasi/evaluasi_catering.routes';
import klasifikasiCateringRouter from '@modules/Procurement/Catering/Klasifikasi/klasifikasi_catering.routes';

const apiRouter = Router();

apiRouter.use('/users', useRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/items', itemRouter);
apiRouter.use('/floors', floorRouter);
apiRouter.use('/rooms', ruanganRouter);
apiRouter.use('/type-pc', jenisPcRouter); //jenis pc
apiRouter.use('/partners', partnerRouter);
apiRouter.use('/water-meters', waterMeterRouter);
apiRouter.use('/providers', providerRouter);
apiRouter.use('/room-types', roomTypeRouter);
apiRouter.use('/type-item', jenisBarangRouter); //jenis barang
apiRouter.use('/building-types', buildingTypeRouter);
apiRouter.use('/buildings', buildingRouter);
apiRouter.use('/compressors', compressorRouter);
apiRouter.use('/pumps', pumpRouter);
apiRouter.use('/pump-units', pumpUnitRouter);
apiRouter.use('/locations', locationRouter);
apiRouter.use('/caterings', cateringRouter);
apiRouter.use('/vendors', vendorRouter);

apiRouter.use('/assets', assetRouter);
apiRouter.use('/monitoring-vendors', monitoringVendorRouter);
apiRouter.use('/persekots', persekotRouter);
apiRouter.use('/pengadaans', pengadaanRouter);
apiRouter.use('/persediaans', persediaanRouter);
apiRouter.use('/peralatan-it', peralatanITRouter);
apiRouter.use('/working-orders', workingOrderRouter);
apiRouter.use('/purchase-orders', purchaseOrderRouter);
apiRouter.use('/tanda-terima-barang', tandaTerimaRouter);
apiRouter.use('/evaluasi-suppliers', evaluasiSuplierRouter);

apiRouter.use('/pg-it-tools', itToolRouter);
apiRouter.use('/pg-engineer-basements', basementRouter);
apiRouter.use('/pg-engineer-buildings/room', ruanganGedungRouter);
apiRouter.use(
  '/pg-engineer-buildings/mechanical-electrical',
  mechanicalElectricalRouter
);

apiRouter.use('/pg-working-tools', workingToolRouter);
apiRouter.use('/pg-sanitations', sanitationRouter);

apiRouter.use('/pr-hotel-evaluations', evaluasiHotelRouter);
apiRouter.use('/pr-hotel-clasifications', klasifikasiHotelRouter);
apiRouter.use('/pr-catering-evaluations', evaluasiCateringRouter);
apiRouter.use('/pr-catering-clasifications', klasifikasiCateringRouter);

export default function useApiRouter(app: Application) {
  app.use('/v1', apiRouter);
}
