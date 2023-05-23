const { Router } = require('express');
//importamos los controladores de rutas
const { videoGamesRoute } = require('./videogames');
const { postVideogame, videoGameByIdRoute } = require('./videogame');
const genresRoute = require('./genres');
const router = Router();

//GET
router.get('/videogame/:id', videoGameByIdRoute);      //la ruta se usa para obtener inf sobre un vg mediante su id
router.get('/videogames', videoGamesRoute);            //la ruta se usa para obtener una lista de los vgs
router.get('/genres', genresRoute);                    //la ruta se usa para obtener una lista con los generos de los vgs

//POST
router.post('/videogame', postVideogame);              //la ruta se usa para crear un nuevo vg

module.exports = router;
