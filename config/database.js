import {Sequelize} from "sequelize";

const db = new Sequelize('db_kartun','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;