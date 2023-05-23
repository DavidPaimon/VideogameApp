const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {   //se define el modelo genre utilizando el objeto sequelize. El modelo tiene dos campos: id y name.
    id: {
      type: DataTypes.INTEGER, //id se configura como una clave primaria con autoincremento.
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,       //no permitimos que sea nulo
    },
  }, 
  { timestamps: false }   //indica a Sequelize que no cree automáticamente las marcas de tiempo createdAt y updatedAt en la tabla.
  );
};
