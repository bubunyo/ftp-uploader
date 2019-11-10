import HTTPStatus from 'http-status';
import request from 'supertest';
import app from '../../../app';

describe('Ftp:Routes', async () => {
  it('list files', async () => {
    const res = await request(app).get('/api/v1/ftp/ls?path=/');
    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('upload file', async () => {
    const res = await request(app).put('/api/v1/ftp?path=/')
      .attach('file', 'src/modules/ftp/test/sample.local.txt');
    expect(res.statusCode).toBe(HTTPStatus.CREATED);
  });

  it('download file', async () => {
    const res = await request(app).get('/api/v1/ftp?path=sample-2.txt');
    expect(res.statusCode).toBe(HTTPStatus.OK);
  });

  it('delete file', async () => {
    const res = await request(app).delete('/api/v1/ftp?path=sample.txt');
    expect(res.statusCode).toBe(HTTPStatus.NO_CONTENT);
  });
});
