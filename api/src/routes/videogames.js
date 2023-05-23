const { Videogame, Genre } = require('../db.js');
const { Op } = require('sequelize');
const axios = require ('axios');
const { API_KEY } = process.env


//TRAER TODOS LOS VIDEOJUEGOSDE LA API

const getApiInf = async function() {

    let gamesData = []; //una matriz vacía para almacenar los resultados de la API

    for (let i = 1; i < 6; i++) { //realiza 5 solicitudes a la API
        gamesData.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)); //axios para realizar una solicitud GET a la API, con la clave (API_KEY) y el número de página (i)
    }

    return Promise.all(gamesData)                                 //esperar a que se completen todas las solicitudes
        .then((response) => {

            let pages = [];                                       //se crean los arreglos para almacenar los resultados
            let resultado = [];                                   //se almacena el resultado final

            for (let i = 0; i < response.length; i++) {           //iterar sobre los resultados de la API
                pages = [...pages, response[i].data.results];     //se agregan los resultados de cada página al arreglo pages
            }

            pages.map(p => {
                p.forEach(vg => {                            //itera sobre cada página y cada juego dentro de ellas
                    resultado.push({                         //crea un objeto con los campos deseadeos y agregarlo al arreglo resultado
                        id: vg.id,                           //permite tener acceso al identificador único del juego en el resultado final
                        name: vg.name,                       //permite tener acceso al nombre del juego en el resultado final
                        image: vg.background_image,          // se utiliza para asignar el valor de la propiedad background_image de un juego a la propiedad image del objeto resultante
                        rating: vg.rating.toFixed(2),        //usamos toFixed(2) para mostrar solo 2 decimales, o sea, redondear el rating a 2 decimales
                        genres: vg.genres.map(g => g.name)   //se utiliza para obtener un arreglo de los nombres de los géneros de un juego
                    })
                })
            })

            return resultado;                                //devuelve el resultado final
        })
}


//TRAER LOS VIDEOJUEGOS DE LA DB

const getDbInf = async function() {

    let dbInf = await Videogame.findAll({ //declaramos dbInf y usamos await para esperar la consulta a la DB usando el método Videogame, la consulta se hace usando el método findAll() que devuelve todos los registros de la tabla Videogame
        include: {
            model: Genre,                 //con el include, incluimos el modelo Genre.
            attributes: ['name'],        //se configura para incluir el atributo name del modelo Genre.
            through: {     //se especifica que no se requieren atributos adicionales en la tabla de unión entre Videogame y Genre al establecer attributes en un arreglo vacío dentro de through
                attributes: [],
            }
        }
    });

    dbInf = JSON.parse(JSON.stringify(dbInf)); //se usa JSON.stringify y JSON.parse para convertir el resultado de la consulta dbInf en un objeto JSON y luego en un objeto JavasCript nuevamente. Esto para asegurar que el result sea un objeto mutable y no una instancia del modelo Videogame
    dbInfModif = dbInf.reverse();              //se asigna el resultado modificiado a dbInfModif y se invierte el orden del arreglo utilizando reverse()

    return dbInfModif.map(videogame => {           //se usa el metodo map en el arreglo dbInfModif para iterar sobre cada objeto videogame
        videogame.genres = videogame.genres.map(g => g.name); //se usa otro map en la propiedad genres de cada videogame para extraer solo los nombres de los generos. Se asigna el nuevo arreglo de names a videogame.genres
        return videogame; //se retorna el arrelgo modificado que contiene objetos videogame con la propiedad genres actualizada para contener solo los nombres de los géneros
    })
}



//TRAER LOS VIDEOJUEGOS DE LA API Y DE LA DB

const getAllVideogames = async function() {
    const apiInf = await getApiInf();              //se hace una solicitud a la API y devuelve información de los vg
    const dbInf = await getDbInf();                //realiza una consulta a la DB y devuelve información de los vg almacenados
    const infTotal = dbInf.concat(apiInf);         //se une la información de los vgs obtenida de la DB y de la API en un solo arreglo
    return infTotal;                               //devuelve el arreglo infTotal que contiene la información combinada de los vgs obtenidos de la DB y de la API
}

//En resumen, la función getAllVideogames utiliza las funciones getApiInf() y getDbInf() para obtener información de videojuegos de una API y una base de datos, respectivamente
//Luego, combina ambas fuentes de información en un solo arreglo y lo devuelve como resultado.


//TREAER LOS 15 PRIMEROS VIDEOJUEGOS QUE COINCIDAN CON EL NOMBRE PASADO

const getApiInfByName = async function(name) {
    
    let gamesData = [];     //almacenamos los datos de los vg

    urlData.data.results.forEach(vg => {        //iteramos sobre los resultados de la respuesta de la API
        if(gamesData.length < 15) {             //limitamos a 15 vg
            gamesData.push({                    //agregamos los datos necesarios del vg al array gamesData
                id: vg.id,
                name: vg.name,
                description: vg.description,
                image: vg.background_image,
                released: vg.released,
                rating: vg.rating.toFixed(2),
                platforms: Array.isArray(v.platforms)?vg.platforms.map(p => p.platform.name):"Unspecified platform",
                genres: vg.genres.map(g => g.name)
        })}
    })

    return gamesData;                           //devolvemos el arraay con los datos de los vgs
}


const getDbInfByName = async function(name) {   
    let videoGames = await Videogame.findAll({  //almacenamos los vg encontrados en la DB, realizamos una consulta a la DB con el método finAll del model Videogame
        where: {
            name: {                             //debe coincidir parcialmente con el valor dado en name
                [Op.iLike]: '%' + name + '%'    //usamos Op.iLike para hacer una busqueda insensible a mayús y minús
            }
        },
        include: {                              //es una opc que se usa para incluir inf relacionada
            model: Genre,                       //se incluye el modelo Genre con atirbutos selecionades (name)
            attributes: ['name'],
            through: {                          //es otra opc que se usa para especificar que no se desean incluir atributos adicionales...
                attributes: [],                 //... sobre la relación entre los modelos Videogame y Genre
            }
        }
    });

    videoGames = JSON.parse(JSON.stringify(videoGames)); //convierte array en objetos, videoGames es una cadena JSON y JSON.parse convirte la cadena JSON nuevamente en un array de objetos. Se hace para hacer una copia profunda de los objetos y evitar cualquier referencia a los objetos originales
    videoGames = videoGames.reverse();                   //invierte el orden de los elementos en el array, se hace para que los vgs más recientes aparezcan primero en el res final
    
    return videoGames.map(videoGame => {                 //itera sobre cada obj videoGame en el array videoGames
        videoGame.genres = videoGame.genres.map(g => g.name); //itera sobre cada género en la propiedad genres, extrae solo el nombre del género, asigna un array de nombres de género actualizado a la propiedad genres del obj videoGame
        return videoGame;                                //devuelve el obj videoGme actuaalizado
    });
}



const getAllVideogamesByName = async function(name) { //obtiene todos los vgs por nombre, tanto de la DB como de una API externa
    const dbResults = await getDbInfByName(name); //obtiene los res de los vgs desde la DB, utilizando el name dado como parámetro. El resultado se guarda en la variable dbResults
    const apiResults = await getApiInfByName(name); //obtiene los res de los vgs desde una API externa, usando el name dado como parámetro. El resultado se guarda en la variable apiResults
    const allResults = dbResults.concat(apiResults); //combina los res obtenidos de la DB y de la API externa en un solo array. Se usa el método concat que concatena los dos arrays en uno solo. El res se guarda en la variable allResults
    return allResults.slice(0, 15); //devuelve los primeros 15 elements del array allResults. Se usa el método slice que toma una porción del array, desde el índice 0 hasta el índice 14. Este res final es retornado por la función getAllVideogamesByName.
}




//ROUTE PARA VIDEOGAMES CON NOMBRE O SIN NOMBRE

exports.videoGamesRoute = async function (req, res, next) {         //se utiliza como controlador para una ruta específica relacionada con los videojuegos
    const { name } = req.query;                                     //extrae el parámetro name de los parámetros de la consulta req.query. Este parámetro se usas para filtrar los vgs por nombre
    
    if (name) {                                                     //verificamos si se proporcionó un valor para el parámetro name. Si es así, se ejecuta el bloque de código dentro de este if
        let videogamesByName = await getAllVideogamesByName(name);  //se realiza una busqueda de vgs por nombre ya sea en la API, DB o ambas y devuelve el result correspondiente
        
        if(videogamesByName.length <= 0) {                          //verificamos si el arreglo videogamesByName esta vacío, lo cual indica que no se encontraron resultados de vgs con el nombre dado
            res.status(404).send("No results");                     //si es así se envía una res con un código de estado 404 y el msj No results
        } else {
            res.status(200).json(videogamesByName);                 //de lo contrario se envía una res con un código de estado 200 y el arreglo videogamesByName en formato JSON
        }

    } else {                                                        //si el parámetro name no tiene un valor, se ejecuta el bloque de código dentro del este else
        let videogames = await getAllVideogames();                  //esta función obtiene todos los vgs ya sea de la API, DB o ambas
        res.status(200).send(videogames);                           //se envía una res con un código de estado 200 y el arreglo Videogames
    }
};
//En resumen, esta función se utiliza como controlador para una ruta relacionada con los videojuegos
//Si se proporciona el parámetro name, se realizan búsquedas de videojuegos por nombre y se envían los resultados correspondientes
//Si no se proporciona el parámetro name, se obtienen todos los videojuegos y se envían como respuesta.


//ROUTE PARA ELIMINAR UN VIDEOJUEGO

exports.deleteVideoGameRoute = async function(req, res, next) { //se utiliza como controlador para una ruta especifica que manejará la eliminación de un videojuego
    const {id} = req.params;                                    //extrae el parámetro id de los parámetros de la solicitud req.params. Este parámetro indica el ID del vg que se va a eliminar
    
    Videogame.destroy({                                         //utiliza el modelo Videogame y su método destroy() para eliminar el vg de la DB
        where: {                                                //se especifica la condición where para buscar el vg con el ID proporcionado y eliminarlo
            id: id
        }
    }).then(function(result) {                                  //el método destroy devuelve una promesa que se resuelve con la cantidad de filas afectadas por la eliminación.
        if(result) {        //Dentro del then se verifica si result tiene un valor truthy (es decir si se elimino al menos una fila) y se envía una respuesta al cliente con el msj "videogame deleted"
            res.send("The game has been removed");
        }
    })
}

//En resumen, esta función se utiliza como controlador para eliminar un videojuego en una ruta específica.
//Recibe el ID del videojuego a eliminar desde los parámetros de la solicitud, utiliza el modelo Videogame y su método destroy() para eliminar el videojuego correspondiente en la base de datos
//y envía una respuesta al cliente indicando si el videojuego se eliminó correctamente