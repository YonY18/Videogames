import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { postGame, getGenres, getPlatforms } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GameCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
    });
    const [errors, setErrors] = useState({});


    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = 'Requiere Nombre de JUEGO';
        } else if (!input.description) {
            errors.description = 'Requiere Descripción'
        } else if (!input.platform) {
            errors.platform = 'Requiere Plataforma'
        } else if (!input.rating) {
            errors.rating = 'Requiere Rating'
        }
        else if (!input.released) {
            errors.released = 'Requiere Fecha Lanzamiento'
        }
        return errors;
    };



    function handleChange(p) {
        setInput({
            ...input,
            [p.target.name]: p.target.value
        })
        setErrors(validate({
            ...input,
            [p.target.description]: p.target.value
        }))
        console.log(input)
    }

    const handleSelectG = (e) => {
        setInput({
            ...input,
            genres: input.genres.includes(e.target.value)
                ? input.genres
                : [...input.genres, e.target.value]
        })
    }
    const handleSelectP = (e) => {
        setInput({
          ...input,
          platforms: input.platforms.includes(e.target.value) 
          ? input.platforms 
          : [...input.platforms, e.target.value]
        })
      }
    function handleSubmit(p) {
        p.preventDefault();
        setErrors(validate({
            ...input,
            [p.target.name]: p.target.value
        }));
        dispatch(postGame(input));
        alert("JUEGO Creado!!!")
        setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
        });
        navigate('/home');
    }

    const handleDeleteG = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter((el) => el !== e)
        })
    }
    const handleDeleteP = (e) => {
        setInput({
          ...input,
          platforms: input.platforms.filter((el) => el !== e)
        })
      }
    return (
        <div>
            <div>
                <div className="padre">
                    <h1 className="colorLetrasBienvenido">** Crear Nuevo Juego **</h1>
                </div>
            </div>
            <div>

                <br />
                <Link to='/'><button>Ir a Pagina de Lanzamiento</button></Link>
                <Link to='/home'><button>Ir a Pagina Home</button></Link>
            </div>
            <br/><br/><br/>
            <form onSubmit={(p) => handleSubmit(p)} >
                <div>
                    <div>
                        <label>Nombre Juego:</label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                        />
                        {errors.name && (<p>{errors.name}</p>
                        )}
                    </div>
                    <br/>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={(p) => handleChange(p)}
                        />
                        {errors.description && (
                            <h2>{errors.description}</h2>
                        )}
                    </div>
                    <br/>
                    <div>
                        <label>Rating:</label>
                        <input
                            type="text"
                            value={input.rating}
                            name="rating"
                            onChange={(p) => handleChange(p)}
                        />
                        {errors.rating && (<p>{errors.rating}</p>
                        )}
                    </div>
                    <br/>
                    <div>
                        <label>Fecha Lanzamiento:</label>
                        <input
                            type="text"
                            value={input.released}
                            name="released"
                            onChange={(p) => handleChange(p)}
                        />
                        {errors.released && (<p>{errors.released}</p>
                        )}
                    </div>
                    <br/><br/>
                    <label>Imagen:</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(p) => handleChange(p)}
                    />
                    <br/><br/>

                    <br></br>
                    <div>
                        <label>Genres</label>
                        <br></br>
                        <select
                            defaultValue="select"
                            onChange={handleSelectG}
                        >
                            <option disabled>Select</option>
                            {
                                genres?.map((e) => {
                                    return (
                                        <option value={e.name} key={e.id}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                        <ul className="ul">
                            {input.genres.map((e) => (
                                <li key={e}>
                                    <div>
                                        {e + " "}
                                        <button type='button' onClick={() => handleDeleteG(e)}>
                                            X
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <br /><br /><br />
                <button type='submit'>Crear Juego</button>
            </form>
        </div>
    )
}