import yupValidate from '@utils/yupValidate';
import schema from '@modules/FixedAsset/Vendor/vendor.schema';
import { TypeMonitoring } from '@modules/FixedAsset/Vendor/interface/vendor.interface';

export default function MappingBodyByType(
  key: string,
  body: any,
  action = 'create'
) {
  let validatedBody = undefined;
  if (action === 'create') {
    if (key.toLowerCase() === TypeMonitoring['Pest Control']?.toLowerCase()) {
      validatedBody = yupValidate(schema.createMonitoringPestControl, body);
    } else if (
      key.toLowerCase() === TypeMonitoring['Pengangkutan Sampah']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createPengangkutanSampah, body);
    } else if (
      key.toLowerCase() === TypeMonitoring['Pewangi Ruangan']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createPewangiRuangan, body);
    } else if (
      key.toLowerCase() === TypeMonitoring['Tanaman Hias']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createTanamanHias, body);
    } else if (key.toLowerCase() === TypeMonitoring['Lift']?.toLowerCase()) {
      validatedBody = yupValidate(schema.createMonitoringLift, body);
    } else if (key.toLowerCase() === TypeMonitoring['Gondola']?.toLowerCase()) {
      validatedBody = yupValidate(schema.createMonitoringGondola, body);
    }
  } else {
    if (key.toLowerCase() === TypeMonitoring['Pest Control']?.toLowerCase()) {
      validatedBody = yupValidate(schema.updateMonitoringPestControl, body);
    } else if (
      key.toLowerCase() === TypeMonitoring['Pengangkutan Sampah']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.updatePengangkutanSampah, body);
    } else if (
      key.toLowerCase() === TypeMonitoring['Pewangi Ruangan']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.updatePewangiRuangan, body);
    } else if (
      key.toLowerCase() === TypeMonitoring['Tanaman Hias']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.updateTanamanHias, body);
    } else if (key.toLowerCase() === TypeMonitoring['Lift']?.toLowerCase()) {
      validatedBody = yupValidate(schema.updateMonitoringLift, body);
    } else if (key.toLowerCase() === TypeMonitoring['Gondola']?.toLowerCase()) {
      validatedBody = yupValidate(schema.updateMonitoringGondola, body);
    }
  }
  return validatedBody;
}
