import { Router } from 'express';
import { version } from '../../../package.json';
import FtpRouter from '../ftp/ftp.routes';

// Declare Router
const apiRouter = Router();

// get version number of  the api
apiRouter.get('/', (req, res) => {
  res.json({ version });
});

apiRouter.use('/ftp', FtpRouter);

export default apiRouter;
