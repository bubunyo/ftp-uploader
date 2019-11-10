import { Router } from 'express';
import validate from 'express-validation';
import * as c from './ftp.controller';
import v from './ftp.validation';


const FtpRouter = Router();

FtpRouter.get('/ls', validate(v.list), c.list);
FtpRouter.get('/', validate(v.download), c.download);
FtpRouter.put('/', validate(v.upload), c.upload);
FtpRouter.delete('/', validate(v.deleteFile), c.deleteFile);

export default FtpRouter;
