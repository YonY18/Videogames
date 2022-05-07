const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    released:{ // fecha lanzamiento
      type: DataTypes.STRING,
      allowNull:true,
    },    
    rating:{
      type: DataTypes.STRING,
      allowNull:true,
    },    
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};