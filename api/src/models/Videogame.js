const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [3, 50]
      },
      allowNull: false,
      unique:true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    released: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },       
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};