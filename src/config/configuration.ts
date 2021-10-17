import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  ENVIRONMENT: Joi.string()
    .valid('development', 'production', 'staging')
    .required(),
  PORT: Joi.number().port().required(),
  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_SECRET_EXPIRES_IN: Joi.number().integer().required(),
  // database
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
});

export const configuration = () => ({
  env: process.env.NODE_ENV,
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT, 10),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_SECRET_EXPIRES_IN, 10),
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

export const validationOptions = {
  abortEarly: true,
};
