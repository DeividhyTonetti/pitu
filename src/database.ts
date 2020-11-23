import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize( {
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});

export default sequelize;