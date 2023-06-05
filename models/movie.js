import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Movie = db.define('Movie', {
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    
  },{
    timestamps: false
  });

  export default Movie;
  
(async()=>{
    await db.sync();
})();