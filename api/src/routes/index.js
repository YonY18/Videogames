const express = require('express');
const router = express.Router();
// const router = Router();

router.use(express.json())
const axios = require('axios');
const { Videogame, Genres} = require('../db.js');
const {API_KEY} = process.env;

const getApiInfo = async () => {
    try {
        // API:
        let Page1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
        let Page2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
        let Page3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
        let Page4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
        let Page5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);

        let pageALL = await Promise.all([Page1, Page2, Page3, Page4, Page5]);                                            

        Page1 = pageALL[0].data.results;
        Page2 = pageALL[1].data.results;
        Page3 = pageALL[2].data.results;
        Page4 = pageALL[3].data.results;
        Page5 = pageALL[4].data.results;       

        let apiHtml = Page1.concat(Page2).concat(Page3).concat(Page4).concat(Page5);                  
            
        let ApiInfo = apiHtml.map(p => {
        return {
        id: p.id,
        name:p.name,        
        description:p.description,        
        platform:p.platforms.map(a=>a),
        genre:p.genres.map(a=>a),
        image:p.background_image,
        released:p.released,
        rating:p.rating,    
    }})
        return ApiInfo;
    } 
    catch (error) 
        {console.log(error);
    }
};

const getDbInfo = async () => {    
    const infoDB = await Videogame.findAll({
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes:[],
                },
            },
        });
        return infoDB;    
    }

const getAllGames = async () => {
    //const getAllVgames = async() => {
        try {
            const apiInfo = await getApiInfo();
            const dbInfo = await getDbInfo();            
            const infoTotal = apiInfo.concat(dbInfo);    
            return infoTotal;    
        } catch (error) {
            console.log(error);
        }
    };


// [ ] GET /videogames:
router.get('/videogames', async (req, res) => {
    const name = req.query.name;
    const gamesAll = await getAllGames();
    if (name) {
        const gamesName = await gamesAll.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        gamesName.length?
            res.status(200).send(gamesName) :
            res.status(404).send('NO EXISTE EL JUEGO BUSCADO');
    }else{
        res.status(200).send(gamesAll)
    }
});

router.get('/genres', async (req, res) => {
    var apiHtml = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = apiHtml.data.results.map(p => p.name) 
    const genre1 = await genres.filter(p => p.length > 0);   
    genre1.forEach(p => { 
        if (p!==undefined) Genres.findOrCreate({where:{name:p}})
    })  
    const allGenres = await Genres.findAll();            
    res.send(allGenres);
    });

router.get("/videogames/:id", async (req, res) => {
    const id = req.params.id;
    const GamesTotal = await getAllGames();    
    // console.log (GamesTotal)
    if (id){
        const gamesId = await GamesTotal.filter((p) => p.id == id)
        console.log(gamesId)        
        gamesId.length ? 
                res.status(200).send(gamesId) : 
                res.status(404).send('NO EXISTE EL JUEGO BUSCADO')        
    } 
});

router.post('/videogame', async (req, res) => {
    let{       
        name,        
        description,        
        platform,
        genre,
        image,
        rating,
        released,
        createInDb,
    } = req.body

    let gamesCreated = await Videogame.create({ 
        name,        
        description,        
        platform,
        genre,
        image,
        rating,
        released,
        createInDb,
        })
    
        let genresDb = await Genres.findAll({
            where: { name: genre }
        })
        gamesCreated.addGenres(genresDb)
        res.send('Video Juego Creado')
});

module.exports = router;