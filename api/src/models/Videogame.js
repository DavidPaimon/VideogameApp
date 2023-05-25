const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {    //se define el modelo videogame utilizando el objeto sequelize
    id: {
      type: DataTypes.UUID,          //identificador único universal
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, //cada entidad debe tener un valor de identificación único asignado
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),  //es una matriz de cadenas
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(), 
      allowNull: false,
    },
  },
  { timestamps: false } //indica a Sequelize que no cree automáticamente las marcas de tiempo createdAt y updatedAt en la tabla.
  );
};

//este código define el modelo de datos para la tabla "videogame" en la base de datos, especificando los campos y sus tipos, así como las propiedades de cada campo.