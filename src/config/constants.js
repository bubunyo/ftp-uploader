import { version } from '../../package.json';

const defaultConfig = {
  v: `${version}-${process.env.NODE_ENV}`,
  ENV: process.env.NODE_ENV,
  FTP_USER: process.env.FTP_USER,
  FTP_PASS: process.env.FTP_PASS,
  FTP_HOST: process.env.FTP_HOST,
  FTP_PORT: process.env.FTP_PORT || '21',
};

const devConfig = {
  PORT: process.env.PORT || 3000,
  ...defaultConfig,
};

const testConfig = {
  PORT: 4000,
  ...defaultConfig,
};

const prodConfig = {
  PORT: process.env.PORT || 5000,
  ...defaultConfig,
};
const stageConfig = {
  PORT: process.env.PORT || 5000,
  ...defaultConfig,
};


export function envConfig(env = process.env.NODE_ENV) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    case 'stage':
      return stageConfig;
    default:
      return prodConfig;
  }
}
export const isProduction = () => process.env.NODE_ENV === 'production';
export const isStage = () => process.env.NODE_ENV === 'stage';
export const isDev = () => process.env.NODE_ENV === 'development';
export const isTest = () => process.env.NODE_ENV === 'test';

export default {
  ...envConfig(),
};
