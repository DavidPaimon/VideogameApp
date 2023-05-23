const { Videogame, Genre }= require ('../db')       //importamos los modelos


const createVideoGameRoute = async (name, description, released, rating, platforms, image, genres) => {     //definimos la función con varios parámetros. Esta función podrá contener operaciones asíncronicas como consultas a la DB
    
    if(!name || !description || !platforms) {       //esta condición verifica si algunos parámetros obligatorios están presentes. Si falta uno de ellos nos muestra un error
        throw new Error ("Faltan datos.")           //el mensaje que nos muestra en caso de que falten los parámetros obligatorios
    }

    let getDbInfGenres = [];                       //inicializamos la variable como un array vacío
    if(genres) {                                   //verificamos si el parámetro genres esta presente
      getDbInfGenres = await Genre.findAll({       //si es así, realizamos la consulta a la DB usando el modelo Genre...
            where: {                               //... para buscar todos los registros cuyo nanme coincida con el valor dado en genres
                name: genres                       //el resultado de la consulta se asigna a la variable getDbInfGenres
            }
        });
    }

    const newVideogame = await Videogame.create({       //creamos un nuevo registro en la DB usando el modelo Videogame
        name,                                           //pasamos los valores proporcionados en los parámetros
        description,
        released,
        rating,
        platforms,
        image
    });                                                 //el resultado de la creación se asigna a la variable newVideogame

    if(genres) {                                        //si el parámetro genres esta presente...
        await newVideogame.addGenres(getDbInfoGenres);  //... se usa el método addGenres en el obj newVideogame...
    }                                                   //... para asociar los registros de género recuperados en la DB (getDbInfGenres) al nuevo vg creado

    return newVideogame                                 //se devuelve el obj newVideogame como resultado de la función
};
module.exports = {createVideoGameRoute}