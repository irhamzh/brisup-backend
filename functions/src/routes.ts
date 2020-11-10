import { Router, Application } from 'express';
// import userRouter from '#modules/user/user.routes';
const apiRouter = Router();

// apiRouter.use('/users', userRouter);

export default function useApiRouter(app: Application) {
  app.use('/v1', apiRouter);
}
