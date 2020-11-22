import yupValidate from '@utils/yupValidate';
import schema from '../sanitation.schema';
import { TypeInnovationBuilding } from '../interface/sanitation.interface';

export default function MappingBodyByType(
  key: string,
  body: any,
  action = 'create'
) {
  let validatedBody = undefined;
  if (action === 'create') {
    if (
      key.toLowerCase() ===
        TypeInnovationBuilding['Ruang Pendidikan']?.toLowerCase() ||
      key.toLowerCase() ===
        TypeInnovationBuilding['Ruang Kerja']?.toLowerCase() ||
      key.toLowerCase() === TypeInnovationBuilding['Ruang Lain']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createRuanganInnovationBuilding, body);
    } else if (
      key.toLowerCase() === TypeInnovationBuilding['Toilet']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createToiletInnovationBuilding, body);
    } else if (
      key.toLowerCase() ===
      TypeInnovationBuilding['Tangga Darurat']?.toLowerCase()
    ) {
      validatedBody = yupValidate(
        schema.createTanggaSelasarInnovationBuilding,
        body
      );
    } else if (
      key.toLowerCase() ===
      TypeInnovationBuilding['Selasar Dan Lobby']?.toLowerCase()
    ) {
      validatedBody = yupValidate(
        schema.createSelasarLobbyInnovationBuilding,
        body
      );
    }
  } else {
    if (
      key.toLowerCase() ===
        TypeInnovationBuilding['Ruang Pendidikan']?.toLowerCase() ||
      key.toLowerCase() ===
        TypeInnovationBuilding['Ruang Kerja']?.toLowerCase() ||
      key.toLowerCase() === TypeInnovationBuilding['Ruang Lain']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.UpdateRuanganInnovationBuilding, body);
    } else if (
      key.toLowerCase() === TypeInnovationBuilding['Toilet']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.UpdateToiletInnovationBuilding, body);
    } else if (
      key.toLowerCase() ===
      TypeInnovationBuilding['Tangga Darurat']?.toLowerCase()
    ) {
      validatedBody = yupValidate(
        schema.UpdateTanggaSelasarInnovationBuilding,
        body
      );
    } else if (
      key.toLowerCase() ===
      TypeInnovationBuilding['Selasar Dan Lobby']?.toLowerCase()
    ) {
      validatedBody = yupValidate(
        schema.UpdateSelasarLobbyInnovationBuilding,
        body
      );
    }
  }
  return validatedBody;
}
