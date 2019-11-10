import { Client } from 'basic-ftp';
import path from 'path';
import fs from 'fs';
import constants from '../../config/constants';

export default class {
  constructor(username, password, host) {
    this.host = host || constants.FTP_HOST;
    this.username = username || constants.FTP_USER;
    this.password = password || constants.FTP_PASS;

    this.client = new Client();
  }

  _tempDir() {
    const tmpDir = path.join('tmp', `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)}-${Date.now()}`);
    fs.mkdirSync(tmpDir);
    return tmpDir;
  }

  async _connect() {
    if (this.client.closed) {
      await this.client.access({
        host: this.host, // '127.0.0.1',
        user: this.username, // 'username',
        password: this.password, // '******',
        secure: false,
      });
    }
  }

  async list(filePath) {
    await this._connect();
    await this.client.ensureDir(filePath);
    return this.client.list();
  }

  async upload(localFile, filePath) {
    await this._connect();
    await this.client.uploadFrom(localFile, filePath);
  }

  async download(filePath) {
    await this._connect();
    const dir = filePath.split('/');
    const localFile = path.join(this._tempDir(), dir[dir.length - 1]);
    await this.client.downloadTo(localFile, filePath);
    return localFile;
  }

  async deleteFile(filePath) {
    await this._connect();
    await this.client.remove(filePath);
  }
}

