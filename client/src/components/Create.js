import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postGame, getGenres, getGames } from '../Redux/actions'
import estilos from "../Estilos/Create.module.css"
import Placeholder from "../Assets/no-img-placeholder.svg"

export default function GameCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector(state => state.genres);
  const platforms = useSelector(state => state.platforms);
  const allVideogames = useSelector((state) => state.videogames);

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getGames())
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value)
        ? input.genres
        : [...input.genres, e.target.value]
    })
  }

  const handleSelect2 = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value]
    })
  }
  function handleFileImage(p) {
    try {
      const file = p.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        setInput({
          ...input,
          image: reader.result,
        })
      }
    } catch (error) {
      setInput({
        ...input,
        image: {
          image: ''
        },
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.name.trim()) {
      return alert("Necesita introducir un Nombre")
    }else if (allVideogames.find(e =>
      e.name.toLowerCase().trim() === input.name.toLowerCase().trim())) {
      return alert(`El nombre ${input.name} ya existe`)
    } else if (input.name.length < 3 || input.name.length > 40) {
      return alert("Nombre debe ser entre 3 y 40 caracteres")
    } else if (input.description.trim() === "") {
      return alert("Descripcion requerida")
    } else if(input.description.length < 3 || input.description.length > 40){
      return alert("Largo maximo sobrepasado")
    }
    else if (input.released.trim() === "") {
      return alert("Fecha de publicacion requerido")
    } else if (input.released < "1951-05-03") {
      return alert("La fecha no puede ser inferior a 05/03/1951")
    } else if (input.rating === "" || input.rating < 1 || input.rating > 5) {
      return alert("Rating debe estar entre 1 y 5")
    } else if (input.genres.length === 0) {
      return alert("Seleccione uno o más géneros")
    } else if (input.platforms.length === 0) {
      return alert("Seleccione una o más plataformas")
    } else if (!input.image) {
      return alert("Imagen requerida")
    }
    else {
      dispatch(postGame(input))
      alert("Creado con exito!😀")
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      })
      navigate("/home")
    }
  }


  const handleDelete1 = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e)
    })
  }
  const handleDelete2 = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e)
    })
  }

  return (
    <div className={estilos.fondoCreate}>
      <div className={estilos.contenedorAll}>
        <Link to="/home">
          <button className={estilos.buttonCreate} >Volver al Home</button>
        </Link>
        <h1 className={estilos.titulo}>** Crear Nuevo Juego **</h1>
        <form onSubmit={handleSubmit}>
          <div className={estilos.item}>
            <label className={estilos.label}>Nombre del Juego</label>
            <br></br>
            <input
              className={estilos.input}
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className={estilos.item}>
            <label className={estilos.label}>🏆Rating</label>
            <br></br>
            <input
              className={estilos.input}
              type="number"

              value={input.rating}
              name="rating"
              onChange={handleChange}
            />
          </div>

          <div className={estilos.item}>
            <label className={estilos.label}>Descripción</label>
            <br></br>
            <textarea
              className={estilos.inputDescription}
              type="text"
              value={input.description}
              name="description"
              onChange={handleChange}
            />
          </div>

          <div className={estilos.item}>
            <label className={estilos.label}>Fecha Lanzamiento</label>
            <br></br>
            <input
              className={estilos.input}
              type="date"
              value={input.released}
              name="released"
              onChange={handleChange}
            />
          </div>

          <div className={estilos.item}>
            <label className={estilos.label}>Imagen</label>
            <br></br>
            <input
              className={estilos.input}
              onChange={(p) => handleFileImage(p)}
              type="file"
              name="imageFile"
              accept="image/jpeg, image/png"
              autoComplete='off' />
            <br></br>
            <span className={estilos.extensions}>Extenciones Soportadas: jpg/jpeg/png</span>
            <br></br>
            <img className={estilos.displayImg} src={input.image || Placeholder} alt='No Img' />
          </div>

          <div className={estilos.item}>
            <label className={estilos.label}>Generos</label>
            <br></br>
            <select
              className={estilos.select}
              defaultValue="select"
              onChange={handleSelect}
            >
              <option className={estilos.select} disabled>Generos</option>
              {
                genres?.map((e) => {
                  return (
                    <option className={estilos.select} value={e.name} key={e.id}>{e.name}</option>
                  )
                })
              }
            </select>

            <ul className="ul">
              {input.genres.map((e) => (
                <li key={e} className={estilos.listaP}>
                  <div className={estilos.divP}>
                    {e + " "}
                    <button className={estilos.buttonx} type='button' onClick={() => handleDelete1(e)}>
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={estilos.item}>
            <label className={estilos.label}>Plataforma</label>
            <br></br>
            <select
              className={estilos.select}
              defaultValue="platforms"
              onChange={handleSelect2}
            >
              <option className={estilos.select} disabled>Plataformas</option>
              {
                platforms?.map((e) => {
                  return (
                    <option className={estilos.select} value={e} key={e}>{e}</option>
                  )
                })
              }
            </select>
            <ul className="ul">
              {input.platforms.map((e) => (
                <li key={e} className={estilos.listaP}>
                  <div className={estilos.divP}>
                    {e + " "}
                    <button className={estilos.buttonx} type='button' onClick={() => handleDelete2(e)}>
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br></br>
          <button className={estilos.buttonCreate} type='submit'>Crear Juego!</button>
        </form>
      </div>
    </div>
  )
}

