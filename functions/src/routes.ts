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

import assetRouter from '@modules/FixedAsset/Asset/asset.routes';
import vendorRouter from '@modules/FixedAsset/Vendor/vendor.routes';
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

apiRouter.use('/assets', assetRouter);
apiRouter.use('/vendors', vendorRouter);
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
apiRouter.use('/pg-working-tools', workingToolRouter);

export default function useApiRouter(app: Application) {
  app.use('/v1', apiRouter);
}
