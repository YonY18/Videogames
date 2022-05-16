const express = require('express');
const router = express.Router();

router.use(express.json())
const axios = require('axios');
const { Videogame, Genre} = require('../db.js');
const {API_KEY} = process.env;

const getApiInfo = async () => {
    try {
      const arrVideogames = [];
      let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
  
      for (let i = 0; i < 5; i++) {
        let pages = await axios.get(apiUrl);
        pages.data.results?.map((e) => {
          arrVideogames.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres?.map((el) => el.name),
            released: e.released,
            rating: e.rating,
            platforms: e.platforms?.map((el) => el.platform.name),
          });
        });
        apiUrl = pages.data.next;
      }
      return arrVideogames;
    } catch (error) {
      console.log(error);
    }
  };

  const getDbInfo = async () => {
    const infoDb = await Videogame.findAll({
        include:{
            model: Genre,
        }
    })
    const mapInfoDb = infoDb?.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            genres: e.genres?.map((e) => e.name),
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms?.map((el) => el),
            createdInDb: e.createdInDb,
        };
    });
    return mapInfoDb;
};

const getAllVideogames = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}


router.get('/videogames', async (req, res) => {
    try {
        const name = req.query.name;
        const videogamesTotal = await getAllVideogames();
        if (name) {
          const videogameName = videogamesTotal.filter((e) =>
            e.name.toLowerCase().includes(name.toLowerCase())
          );
          try {
            res.status(200).send(videogameName)
          } catch (error) {
            res.status(404).send(error);
          }
        } else {
          res.status(200).send(videogamesTotal);
        }
      } catch (error) {
        console.log(error);
      }
    });

router.get('/genres', async (req, res) => {
    try {
        const rawg = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)  
        rawg.data.results.forEach((g) => {
            Genre.findOrCreate({
                where:{
                    id: g.id,
                    name: g.name
                },
            });
        });
        const allGenre = await Genre.findAll();
        res.json(allGenre);
    } catch (error) {
        res.status(404).json({ error: "Genre not found" })
    };
});

router.get("/videogames/:id", async (req, res) => {
    const { id } = req.params
    let detail;
  
    if (id.includes("-")) {
      try {
        detail = await Videogame.findOne({
          where: {
            id: id,
          },
          include: {
            model: Genre,
            attributes: ["name"],
          },
        });
      } catch (e) {
        console.log("Error en el primer entry", e);
      }
    } else {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const elem = response.data;
        detail = {
          id: elem.id,
          name: elem.name,
          description: elem.description_raw,
          image: elem.background_image,
          rating: elem.rating,
          released: elem.released,
          genres: elem.genres,
          platforms: elem.platforms.map((p) => p.platform.name).join(", "),
        };

      } catch (e) {
        console.log("Error en el segundo entry", e);
      }
    }
    if (detail) {
      res.send(detail);
    } else {
      res.status(404).send();
    }
  });

router.post('/videogame', async (req, res) => {
    const {
        name,
        image,
        genres,
        description,
        released,
        rating,
        platforms,
        createdInDb,
    } = req.body

    const createVideoGame = await Videogame.create({
        name,
        image,
        description,
        released,
        rating,
        platforms,
        createdInDb
    })
    const searchGenre = await Genre.findAll({
        where: {name: genres},
    });
    createVideoGame.addGenre(searchGenre)
    res.send("Videogame created successfully")
})

module.exports = router;