import 'source-map-support/register';
import express from 'express';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import methodOverride from 'method-override';
import { isDev } from './config/constants';
import apiRouter from './modules/api/api.routes';
import { errors, status404 } from './middleware/catch';


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(busboy({ limits: { fileSize: 10 * 1024 * 1024 } }));


if (isDev()) {
  app.use(morgan('dev'));
  app.use(errorhandler());
}

app.use('/api/v1', apiRouter);

status404(app);
errors(app);

export default app;
