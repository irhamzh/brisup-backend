import { Router, Application } from 'express';

import useRouter from '@modules/User/user.routes';
import roleRouter from '@modules/Role/role.routes';
import providerRouter from '@modules/Provider/provider.routes';
import assetRouter from '@modules/FixedAsset/Asset/asset.routes';
import persekotRouter from '@modules/FixedAsset/Persekot/persekot.routes';

const apiRouter = Router();

apiRouter.use('/users', useRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/assets', assetRouter);
apiRouter.use('/providers', providerRouter);
apiRouter.use('/persekots', persekotRouter);

export default function useApiRouter(app: Application) {
  app.use('/v1', apiRouter);
}
