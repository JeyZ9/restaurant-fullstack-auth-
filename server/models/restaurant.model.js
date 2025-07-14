import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Restaurant.sync({force: false}).then(() => {
    console.log("Table created or already exists");
}).catch((error) => {
    console.error("Error createing table", error);
});

export default Restaurant;