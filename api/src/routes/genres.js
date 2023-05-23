const { Genre } = require ('../db');
const axios = require('axios');
const { API_KEY } = process.env;

//TREAEMOS LOS GENEROS DESDE LA API

const getApiInfGen = async function() {
    
    let gamesData = [];                     //almacena la info de los géneros

    const urlData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);  //solicitud GET a la URL por axios, se almacena la respuesta en urlData
    urlData.data.results.forEach(vg => {    //se itera el arreglo de resultados de la respuesta de la solicitud
        gamesData.push({                    //en cada iteración se crea un objeto con las propiedades id y name, obtenidas del elemento actual 'vg'
            id: vg.id,                      //y se agrega al arreglo gamesData utilizando push()
            name: vg.name,                  //esto significa que cada elemento en gamesData será un objeto con la info del género de un juego
        })                                  //gamesData contendrá una lista de objetos que representan los géneros de los juegos, cada uno tendrá id y name
    })

    gamesData.forEach(element => {          //se itera sobre cada elemento del arreglo gamesData
        Genre.findOrCreate({                //en el modelo Genre se busca un registro en la DB que cumpla con las condiciones o crearlo si no existe...
            where: {                        //... el método findOrCreate facilita las operaciones de busqueda y creacion en la DB
                id: element.id,             //se especifican las condiciones de busqueda o creación del registro en la DB
                name: element.name          //se busca un registro en el modelo Genre que tenga el mismo ID y name que el elemento actual del forEach
            }
        })
    })
}

//ROUTE PARA TRAER LOS GENEROS

module.exports = async function(req, res, next){     //exporta la function middleware, define req (la solicitud HTTP entrante), res (la res HTTP que se enviara), next (la función para pasar el control al siguiente middleware)
    await getApiInfGen();                            //llamada a la API para obtener inf
    const getDbInfGenres = await Genre.findAll();    //utiliza sequelizepara realizar una consulta enla DB.Genre es un modelo defiinido y findAll un método para buscar los registros de la tabla correspondiente al modelo Genre
    res.send(getDbInfGenres);                        //envia la respuesta HTTP con los registros obtenidos de la DB al cliente que realizó la solicitud
}
