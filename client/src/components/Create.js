import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { postGame, getGenres } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import estilos from '../Estilos/Create.module.css'
import { ReactComponent as Placeholder } from '../Assets/no-img-placeholder.svg'


export default function GameCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        description: "",
        platform: [],
        image: "",
        released: "",
        rating: "",
        genre: [],
    })

    const [errors, setErrors] = useState({});

    //------------- PARTE DE VALIDACIONES ---------------

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

    //------------- PARTE DE HANDLES ---------------------
    function handleFileImage(p) {
        try {
            const file = p.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setInput({
                    ...input,
                    image: reader.result
                    ,
                    errors: validate({
                        ...input,
                        image: reader.result
                    })
                })
            }
        } catch (error) {
            setInput({
                ...input,
                image: {
                    image: ''
                },
                errors: validate({
                    ...input,
                    image: ''
                })
            })
        }
    }


    function handleChange(p) { // va a  ir modificando cuando cambien los input
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

    function handleSelect(p) {
        setInput({
            ...input,
            genre: [...input.genre, p.target.value] //para el array de Generos q concatene las selecciones
        })
    }
    function handleDelete(p) {
        setInput({
            ...input,
            // va guardando en el arreglo todo lo que voy eligiendo de generos linea 42
            genre: input.genre.filter(occ => occ !== p)
        })
    }
    function handleSubmit(p) {
        p.preventDefault();
        //console.log(p)
        setErrors(validate({
            ...input,
            [p.target.name]: p.target.value
        }));
        dispatch(postGame(input)); // input es el payload
        alert("JUEGO Creado!!!")
        setInput({ // seteo el input a cero
            name: "",
            description: "",
            platform: [],
            image: "",
            released: "",
            rating: "",
            genre: [],
        })
        navigate('/home');
    }
    //-------------------------------------------------------------------------------------------
    return (
        <div className={estilos.contenedorGral}>
            <div>
                <div>
                    <h1>** Crear Nuevo Juego **</h1>
                </div>
            </div>
            <div>
                <br />
                <Link to='/'><button>Ir a Pagina de Lanzamiento</button></Link>
                <Link to='/home'><button>Ir a Pagina Home</button></Link>
            </div>
            <br /><br /><br />
            <form className={estilos.formulario} onSubmit={(p) => handleSubmit(p)} >
                <div>
                    <div className={estilos.contenedorInputs}>
                        <label>Nombre Juego:</label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={(p) => handleChange(p)}
                            autoComplete="off"
                        />
                        {errors.name && (<p>{errors.name}</p>
                        )}
                    </div>
                    <div className={estilos.contenedorInputs}>
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
                    <div className={estilos.contenedorInputs}>
                        <label>Plataforma:</label>
                        <input
                            type="text"
                            value={input.platform}
                            name="platform"
                            onChange={(p) => handleChange(p)}
                        />
                        {errors.platform && (<p>{errors.platform}</p>
                        )}
                    </div>
                    <div className={estilos.contenedorInputs}>
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
                    <div className={estilos.contenedorInputs}>
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
                    <label>Imagen:</label>
                    {errors.image && <span>{errors.image}</span>}
                    <input
                        onChange={(p) => handleFileImage(p)}
                        type="file"
                        name="imageFile"
                        accept="image/jpeg, image/png"
                        autoComplete='off' />
                    <span className={estilos.extensions}>Supported extensions: jpg/jpeg/png</span>
                    <img className={estilos.displayImg} src={input.image || Placeholder} alt='No Img' />
                    <div className={estilos.contenedorInputs}>
                        <label>Genero:</label>
                        <select onChange={(p) => handleSelect(p)}>
                            {genres?.map((gen) => {
                                return (
                                    <option key={gen.id} value={gen.name}>
                                        {gen.name}
                                    </option>
                                );
                            })}
                        </select>
                        <div className={estilos.contenedorInputs}>
                            {input.genre.map(el =>
                                <div>
                                    <h3>{el}</h3>
                                    <button onClick={() => { handleDelete(el) }}>-X-</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button type='submit'>Crear Juego</button>
            </form>
        </div>
    )
}