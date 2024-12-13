import { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } from '../config.js';
import { Sequelize } from "sequelize";

const connection_db = new Sequelize(DB_DEV_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

connection_db.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Añadir hooks para medir el tiempo de ejecución de las consultas
connection_db.addHook('beforeQuery', (options) => {
    options.startTime = Date.now();
});

connection_db.addHook('afterQuery', (options) => {
    const duration = Date.now() - options.startTime;
    console.log(`Query executed in ${duration}ms`);
});

export default connection_db;