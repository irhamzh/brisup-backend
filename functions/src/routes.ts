import { Router, Application } from 'express';

import useRouter from '@modules/User/user.routes';
import roleRouter from '@modules/Role/role.routes';
import ruanganRouter from '@modules/Ruangan/ruangan.routes';
import jenisPcRouter from '@modules/JenisPC/jenis_pc.routes';
import providerRouter from '@modules/Provider/provider.routes';
import jenisBarangRouter from '@modules/JenisBarang/jenis_barang.routes';

import assetRouter from '@modules/FixedAsset/Asset/asset.routes';
import persekotRouter from '@modules/FixedAsset/Persekot/persekot.routes';
import persediaanRouter from '@modules/FixedAsset/Persediaan/persediaan.routes';

const apiRouter = Router();

const cors = require('cors');

apiRouter.use('/users', useRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/rooms', ruanganRouter);
apiRouter.use('/type-pc', jenisPcRouter); //jenis pc
apiRouter.use('/type-item', jenisBarangRouter); //jenis barang
apiRouter.use('/providers', providerRouter);

apiRouter.use('/assets', assetRouter);
apiRouter.use('/persekots', persekotRouter);
apiRouter.use('/persediaans', persediaanRouter);

export default function useApiRouter(app: Application) {
  app.use(cors({origin: true}));
  app.use('/v1', apiRouter);
}
