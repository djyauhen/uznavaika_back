import process from 'process';

export type ConfigurationType = ReturnType<typeof getSettings>;
const getSettings = () => ({
  MONGO_DB: process.env.MONGO_DB,
  DB_NAME: process.env.DB_NAME,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  SECRET_YANDEX: process.env.SECRET_YANDEX,
  YANDEX_EMAIL: process.env.YANDEX_EMAIL,
});

export default getSettings;
