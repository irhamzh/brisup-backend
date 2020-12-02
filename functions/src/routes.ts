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
import educationRouter from '@modules/MasterData/Education/education.routes';
import checkpointRouter from '@modules/MasterData/Checkpoint/checkpoint.routes';
import hotelRouter from '@modules/MasterData/Hotel/hotel.routes';
import areaRouter from '@modules/MasterData/Area/area.routes';
import ukerRouter from '@modules/MasterData/Uker/uker.routes';

import vehicleRouter from '@modules/MasterData/Vehicle/vehicle.routes';
import medicineTypeRouter from '@modules/MasterData/MedicineType/medicine_type.routes';

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
import evaluasiATKRouter from '@modules/Procurement/ATK/Evaluasi/evaluasi_atk.routes';
import klasifikasiATKRouter from '@modules/Procurement/ATK/Klasifikasi/klasifikasi_atk.routes';
import stockOpnameATKRouter from '@modules/Procurement/ATK/StokOpname/stock_opname.routes';
import procurementEvaluasiRouter from '@modules/Procurement/Pengadaan/Evaluasi/evaluasi.routes';
import procurementTandaTerimaRouter from '@modules/Procurement/Pengadaan/TandaTerimaBarang/tanda_terima_barang.routes';
import procurementPurchaseOrderRouter from '@modules/Procurement/Pengadaan/PurchaseOrder/purchase_order.routes';
import pengadaanPurchaseOrderRouter from '@modules/Procurement/Pengadaan/PengadaanBarang/pengadaan_barang_jasa.routes';

import monitoringCCTVRouter from '@modules/GeneralAffair/MonitoringCCTV/monitoring_cctv.routes';
import clinicEvaluationRouter from '@modules/GeneralAffair/EvaluasiKlinik/evaluasi_klinik.routes';
import activityRouter from '@modules/GeneralAffair/Aktivitas/Security/security.routes';
import driverRouter from '@modules/GeneralAffair/Aktivitas/Driver/driver.routes';
import courierRouter from '@modules/GeneralAffair/Aktivitas/Courier/courier.routes';
import firstAidRouter from '@modules/GeneralAffair/KegiatanLainnya/P3K/p3k.routes';
import rekreasiRouter from '@modules/GeneralAffair/KegiatanLainnya/Rekreasi/rekreasi.routes';
import consumptionRouter from '@modules/GeneralAffair/PengeloaanKonsumsi/KonsumsiKegiatanRapat/consumption.routes';
import driverAssignmentRouter from '@modules/GeneralAffair/PengelolaanKendaraan/PenugasanDriver/driver_assignment.routes';
import fuelRouter from '@modules/GeneralAffair/PengelolaanKendaraan/BahanBakar/fuel.routes';
import externalVehicleRouter from '@modules/GeneralAffair/PengelolaanKendaraan/PemesananDiluarKendaraanDinas/external_vehicle.routes';
import serviceVehicleRouter from '@modules/GeneralAffair/PengelolaanKendaraan/Kendaraan/Service/service.routes';
import accessoriesVehicleRouter from '@modules/GeneralAffair/PengelolaanKendaraan/Kendaraan/Accessories/accessories.routes';
import taxVehicleRouter from '@modules/GeneralAffair/PengelolaanKendaraan/Kendaraan/Tax/tax.routes';
import kirVehicleRouter from '@modules/GeneralAffair/PengelolaanKendaraan/Kendaraan/Kir/kir.routes';
import pgspjsRouter from '@modules/GeneralAffair/DataPekerja/PGSPJS/pgspjs.routes';
import attendanceRouter from '@modules/GeneralAffair/DataPekerja/Kehadiran/attendance.routes';
import apsRouter from '@modules/GeneralAffair/DataPekerja/APS/aps.routes';
import overtimeRouter from '@modules/GeneralAffair/DataPekerja/Lembur/overtime.routes';
import internshipRouter from '@modules/GeneralAffair/DataPekerja/Magang/internship.routes';
import employeepRouter from '@modules/GeneralAffair/DataPekerja/DataPekerja/employee.routes';

const apiRouter = Router();

apiRouter.use('/users', useRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/items', itemRouter);
apiRouter.use('/floors', floorRouter);
apiRouter.use('/rooms', ruanganRouter);
apiRouter.use('/type-pc', jenisPcRouter); //jenis pc
apiRouter.use('/partners', partnerRouter);
apiRouter.use('/water-meters', waterMeterRouter);
apiRouter.use('/providers', providerRouter); //vendor
apiRouter.use('/room-types', roomTypeRouter);
apiRouter.use('/type-item', jenisBarangRouter); //jenis barang
apiRouter.use('/building-types', buildingTypeRouter);
apiRouter.use('/buildings', buildingRouter);
apiRouter.use('/compressors', compressorRouter);
apiRouter.use('/pumps', pumpRouter);
apiRouter.use('/pump-units', pumpUnitRouter);
apiRouter.use('/locations', locationRouter);
apiRouter.use('/caterings', cateringRouter);
apiRouter.use('/educations', educationRouter);
apiRouter.use('/checkpoints', checkpointRouter);
apiRouter.use('/hotels', hotelRouter);
apiRouter.use('/medicine-types', medicineTypeRouter);
apiRouter.use('/areas', areaRouter);
apiRouter.use('/vehicles', vehicleRouter);
apiRouter.use('/ukers', ukerRouter);

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
apiRouter.use('/pr-atk-evaluations', evaluasiATKRouter);
apiRouter.use('/pr-atk-clasifications', klasifikasiATKRouter);
apiRouter.use('/pr-atk-stock-opnames', stockOpnameATKRouter);

apiRouter.use('/pr-pengadaan-evaluations', procurementEvaluasiRouter);
apiRouter.use(
  '/pr-pengadaan-tanda-terima-barangs',
  procurementTandaTerimaRouter
);
apiRouter.use('/pr-pengadaan-purchase-orders', procurementPurchaseOrderRouter);
apiRouter.use('/pr-pengadaan-jasa-barangs', pengadaanPurchaseOrderRouter);

apiRouter.use('/ga-monitoring-cctvs', monitoringCCTVRouter);
apiRouter.use('/ga-clinic-evaluations', clinicEvaluationRouter);
apiRouter.use('/ga-activities', activityRouter); // security
apiRouter.use('/ga-activities', driverRouter); // /driver
apiRouter.use('/ga-activities', courierRouter); // /courier
apiRouter.use('/ga-activities', firstAidRouter); // /
apiRouter.use('/ga-activities', rekreasiRouter);
apiRouter.use('/ga-driver-assignment', driverAssignmentRouter);
apiRouter.use('/ga-consumption', consumptionRouter);
apiRouter.use('/ga-fuel', fuelRouter);
apiRouter.use('/ga-external-vehicles', externalVehicleRouter);
apiRouter.use('/ga-vehicles', serviceVehicleRouter);
apiRouter.use('/ga-vehicles', accessoriesVehicleRouter);
apiRouter.use('/ga-vehicles', taxVehicleRouter);
apiRouter.use('/ga-vehicles', kirVehicleRouter);
apiRouter.use('/ga-employees', pgspjsRouter);
apiRouter.use('/ga-employees', attendanceRouter);
apiRouter.use('/ga-employees', apsRouter);
apiRouter.use('/ga-employees', overtimeRouter);
apiRouter.use('/ga-employees', internshipRouter);
apiRouter.use('/ga-employees', employeepRouter);

export default function useApiRouter(app: Application) {
  app.use('/v1', apiRouter);
}
