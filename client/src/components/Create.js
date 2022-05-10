import React from 'react';
// import { useHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {postGame, getGenres } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react';

export default function GameCreate (){ 
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]) 

    const [input, setInput] = useState({
        name:"",      
        description:"",         
        platform:"",        
        image:"",
        released:"",
        rating:"",
        genre:[],          
    })
    const [errors, setErrors] = useState({});

    
    function validate(input){
        let errors ={};
        if (!input.name) {
            errors.name = 'Requiere Nombre de JUEGO';
        }else if (!input.description) {
            errors.description = 'Requiere Descripción'        
        }else if (!input.platform) {
        errors.platform = 'Requiere Plataforma'        
        }else if (!input.rating) {
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
            [p.target.name] : p.target.value
        })
        setErrors(validate({
            ...input,
            [p.target.description] : p.target.value
        }))
        console.log(input)
    }

    function handleSelect(p){
        setInput({
        ...input,
        genre:[...input.genre, p.target.value]
        })
    }
    function handleDelete(p){
        setInput({
            ...input,
            genre: input.genre.filter (occ => occ !== p)
        })
    }  
    function handleSubmit(p) {
        p.preventDefault();
        setErrors(validate({
            ...input,
            [p.target.name]:p.target.value
        }));        
        dispatch(postGame(input));
        alert ("JUEGO Creado!!!")
        setInput({
            name:"",      
            description:"",         
            platform:"",            
            image:"",
            released:"",
            rating:"",
            genre:[],
        })
        navigate('/home');
    } 
    


    return(
        <div>
        <div>                        
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Crear Nuevo Juego **</h1>
            </div>
        </div>   
            <div>            

            <br/>
            <Link to= '/'><button>Ir a Pagina de Lanzamiento</button></Link> 
            <Link to= '/home'><button>Ir a Pagina Home</button></Link> 
            </div>  
            <br/><br/><br/> 
        <form onSubmit={(p) => handleSubmit(p)} >
                <div>
                    <div>
                        <label>Nombre Juego:</label>
                        <input
                        type="text"                    
                        name="name"
                        value= {input.name}
                        onChange={(p)=>handleChange(p)}
                        autoComplete="off"
                        />
                        {errors.name && (<p>{errors.name}</p>
                        )}   
                    </div>             
                <br/>
                    <div>
                        <label>Descripción:</label>
                        <input
                        type="text"
                        value= {input.description}
                        name="description"
                        onChange={(p)=>handleChange(p)}
                        />
                        {errors.description && (
                            <h2>{errors.description}</h2>
                        )}
                    </div>                
                <br/>
                    <div>
                        <label>Plataforma:</label>
                        <input
                        type="text"
                        value= {input.platform}
                        name="platform"
                        onChange={(p)=>handleChange(p)}
                        />
                        {errors.platform && (<p>{errors.platform}</p>
                        )}
                    </div>
                <br/>
                    <div>
                        <label>Rating:</label>
                        <input
                        type="text"
                        value= {input.rating}
                        name="rating"
                        onChange={(p)=>handleChange(p)}
                        />
                        {errors.rating && (<p>{errors.rating}</p>
                        )}
                    </div>                 
                <br/>
                    <div>
                        <label>Fecha Lanzamiento:</label>
                        <input
                        type="text"
                        value= {input.released}
                        name="released"
                        onChange={(p)=>handleChange(p)}
                        />  
                        {errors.released && (<p>{errors.released}</p>
                        )}
                    </div>                   
                <br/><br/>                
                    <label>Imagen:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange={(p)=>handleChange(p)}
                    />                 
                    <br/> <br/>
                    <div>
                    <label>Genero:</label>
                    <select onChange={(p)=>handleSelect(p)}>                    

                        {genres?.map((gen) => {
                        return (
                            <option key={gen.id} value={gen.name}>
                                {gen.name}
                            </option>
                        );
                    })}                    
                    </select>
                    <div>                    
                    {input.genre.map(el => 
                    <div> 
                        <h3>{el}</h3>
                    <button onClick={() => {handleDelete(el)}}>-X-</button>
                    </div>
                    )}
                    </div>
                    </div>                       
                </div>
                <br/><br/><br/>                
                <button type='submit'>Crear Juego</button> 
            </form> 
        </div>            
    )}