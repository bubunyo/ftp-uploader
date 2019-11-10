import fs from 'fs';
import path from 'path';
import HTTPStatus from 'http-status';
import FTP from './ftp.model';


export const list = async (req, res) => {
  const ftp = new FTP();
  const l = (await ftp.list(req.query.path || '/'))
    .map(e => ({
      type: e.type === 1 ? 'f' : 'd',
      name: e.name,
      size: e.size,
    }));
  res.json(l);
};


export const upload = async (req, res) => {
  const ftp = new FTP();
  req.busboy.on('file', async (fieldname, file, filename) => {
    await ftp.upload(file, path.join(req.query.path, filename));
  });
  req.busboy.on('finish', () => {
    res.sendStatus(HTTPStatus.CREATED);
  });
  req.pipe(req.busboy);
};


export const download = async (req, res) => {
  const ftp = new FTP();
  try {
    const file = await ftp.download(req.query.path);
    res.download(file, req.query.path, (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.unlink(path.dirname(file), () => {});
      }
    });
  } catch (ex) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
  }
};


export const deleteFile = async (req, res) => {
  const ftp = new FTP();
  try {
    await ftp.deleteFile(req.query.path);
    res.sendStatus(HTTPStatus.NO_CONTENT);
  } catch (ex) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
  }
};
