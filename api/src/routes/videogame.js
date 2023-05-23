const axios = require('axios');
const { Videogame, Genre} = require('../db');
const { createVideoGameRoute } = require ('../controllers/createVideogame');
const { API_KEY } = process.env

//TRAER EL VIDEO JUEGO QUE COINCIDA CON EL ID PASADO
const getApiInfById = async function(id) {           //la función getApiInfById acepta un argumento id

    try{
        const urlData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`); //se usa axios para hacer la solicitud GET a la URL, que tiene una var id que se reemplaza por el valor dado al llamar la función, el res de la solicitud se asigna a la var urlData
        const gamesData ={                           //se almacenan los datos del vg obtenidos de la API. Se inicializan uutilizando los datos recuperados de urlData...
            id: urlData.data.id,                     //... urlData.data.id se asigna a gamesData.id
            name: urlData.data.name,                 //urlData.data.name se asigna a gamesData.name y así sucesivamente
            description: urlData.data.descriptiom_raw,
            image: urlData.data.background_image,
            released: urlData.data.released,
            rating: urlData.data.rating,
            platforms: urlData.data.platform.map(p => p.platform.name),
            genres: urlData.data.genres.map(g => g.name)
        }
        console.log(gamesData);
        return gamesData; //devuelve el obj gamesData que contiene los datos del vg recuperados de la API. getApiInfById resuelve la promesa con este obj como resultado

    } catch(error){
        return null; //si se produce un error, la función devuelve null. Esto indica que no se pudo obtener la inf del vg o se produjo un error durante la solicitud a la API
    }
}

const getDbInfById = async function(id) {             //se define una función que acepta un argumento id. La función se declara asíncronica

    try{
        let dbInf = await Videogame.findOne({ //se usa el modelo Videogame para buscar un registro en la DB que coincida con el id dado. La consulta se hace usando el método findOne
            where: {                                  //... y se especifica la condición where para encontrar el registro especifico
                id: id
            },
            include: {                                //se usa la opción include para incluir inf relacionada con el modelo Genre
                model: Genre,
                attributes: ['name'],                 //se especifica que desean obtener los atributos name del modelo Genre
                through: {                            //se usa la opción through con attributes para evitar la inclusión de atributos adicionales de la relación
                    attributes: [],
                }
            }
        });

        dbInf = JSON.parse(JSON.stringify(dbInf));    //convierte el res de la consulta de la DB en un obj JSON. Con JSON.stringify para serializar el obj dbInf a una cadena JSON y luego JSON.parse para convertir esa cadena nuevamente en un obj
        dbInf.genres = dbInf.genres.map(g => g.name); //actualiza el atributo genres y se asigna el nombre de cada género a través de la función (g = g.name) esto reemplaza los obj Genre en dbInf.gentes con solo los names de los géneros

        return dbInf;                                 //devuelve el obj dbInf que contiene inf recuoperada de la DB. El obj puede contener propiedades como id, name y genres con la inf de registro de la DB y los géneros relacionados

    } catch(error){                                   //se manejan los errores en caso de que ocurra alguno durante la ejecución del código en el bloque try
        return null;                                  //Si se produce un error, la función devuelve null. Esto indica que no se pudo obtener la información de la base de datos o se produjo un error durante la consulta
    }
}

const getAllVideogamesById = async function(id) { //verifica si el id es un número o no. Si el id no es un número, asume que es un identificador de DB y llama a la función getDbInfById para obtener la información del juego desde la DB...
                                                //si el id es un número, asume que es un identificador de API y llama a la función getApiInfById para obtener la inf del vg desde la API. Luego, devuelve la información obtenida
    if (isNaN(id)) {                                //si el id no es un número, se ejecuta el siguiente bloque de código
        const dbInfById = await getDbInfById(id); //la función getDbInfById se llama con el id como parámetro y se espera a que se resuelva antes de asignar el resultado a la variable dbInfById
        return dbInfById;                           //el valor de dbInfById se devuelve como el resultado de la función getAllVideogamesById
    } else {                                        //si el id es un número, se ejecuta el siguiente bloque de código
        const apiInfById = await getApiInfById(id); //la función getApiInfById se llama con el id como parámetro y se espera a que se resuelva antes de asignar el resultado a la variable apiInfById
        return apiInfById;                          //el valor de apiInfById se devuelve como el resultado de la función getAllVideogamesById
    }
}


//ROUTE PARA ENCONTRAR VIDEO JUEGOS POR ID
exports.videoGameByIdRoute = async function (req, res, next) { //esta función se usa como un controlador para una ruta en el servidor. req (solicitud), res (respuesta) y next (pasar el control al siguiente middleware en la cadena)
    const { id } =req.params; //se extrae el valor del parámetro id de req.params y se asigna a la variable id. req.params contiene los parámetros de la URL de la solicitud HTTP
    let videogamesById = await getAllVideogamesById(id); //se llama a la función getAll... con el id como parámetro y se espera a que se resuelva antes de asignar el res a la variable videogamesById. La función se encarga de obtener la inf del vg usando el id proporcionado

    if(videogamesById != null) {                                 //se realiza una verificación para ver si videogamesById no es null
        res.status(200).json(videogamesById);                    //si contiene datos se envía una res con un estado HTTP 200 y los datos del vg en formato JSON
    } else {
        res.status(400).send('ID NOT FOUND');                    //si videogamesById es nulo se envía una res con un estado HTTP 400 y el msj ID NOT FOUND
    }
};

exports.postVideogame = async (req, res) => { //exportamos postVideogame que maneja HTTP POST para crear un nuevo vg y puede contener operaciones asíncronicas como consultas a la DB
    const { name, description, released, rating, platforms, image, genres } = req.body;  //extraemos de req.body los valores que representan los datos necesatios para crear un vg

    try{
        const response = await createVideoGameRoute ( //pasando los valores extraidos, se encarga de crear el vg usando los datos dados, si la creación es exitosa el resultado se almacena en la variable response
            name, 
            description, 
            released, 
            rating, 
            platforms, 
            image, 
            genres 
            )
    res.status(200).json(response) //si no se produce un error, se devuelve un res HTTP con estado 200 y se envía el resultado como una res JSON
    }
    catch(error) {
        res.status(400).send(error.message) //si hay un error se devuelve una res HTTP con el estado 400 y se envía el msj de error
    }
};