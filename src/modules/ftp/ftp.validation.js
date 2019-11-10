import Joi from 'joi';

export default {
  list: {
    query: {
      path: Joi.string().required(),
    },
  },
  upload: {
    query: {
      path: Joi.string().required(),
    },
  },
  download: {
    query: {
      path: Joi.string().required(),
    },
  },
  deleteFile: {
    query: {
      path: Joi.string().required(),
    },
  },
};
