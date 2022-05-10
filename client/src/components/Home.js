import React from 'react';
import {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {getGames, 
    getListGenres, 
    getPlatforms, 
    setPage} from '../actions';

import {Link} from 'react-router-dom';

import Card from './Card';
import Paginado from './Paginado';
import Loading from './Loading';

export default function Home (){ 
    const { games, name, page, order, genre} = useSelector(state => state);    
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games)
    const [orden, setOrden] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15); 
    const indexOfLastGame = currentPage * gamesPerPage 
    const indexOfFirstGame = indexOfLastGame - gamesPerPage 


    const currentGames =  allGames.slice(indexOfFirstGame, indexOfLastGame)

    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const ratings = useSelector((state) => state.ratings);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getGames());
        dispatch(getListGenres()); 
        dispatch(getPlatforms());        
    },[dispatch])

    function handleClick(p){
        p.preventDefault();
        dispatch(getGames())}


return(
        
    <div>        
        <div>             
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Bienvenidos a mi App de Juegos **</h1>
            </div>
        <div>
            <Link to= '/'><button>IR A PAGINA DE LANZAMIENTO</button></Link> 
            
            <button onClick={p => {handleClick(p)}}>VOLVER A CARGAR JUEGOS</button>
            <Link to= '/create'><button>CREAR JUEGO NUEVO</button></Link>                    
        </div>            
            
            <br />
  
        <div>                
        <div>
            <br />
            <select >
                <option value="" defaultValue>Por Orden alfabético</option>                
                <option value='asc'>Ascendente A-Z</option>
                <option value='desc'>Descendente Z-A</option>
            </select>            
                       
            <select >                
                <option value="" defaultValue>Mostrar Juegos</option>
                <option value="all">Todos Los Juegos</option>
                <option value="api">De la API</option>
                <option value="created">Creados</option>
            </select>   
            <select >                
                <option value="" defaultValue>Rating</option>                
                <option value="rasd">Ascendente</option>
                <option value="rdes">descendente</option>
            </select>   

            <select >
                <option value="sinFiltro" defaultValue>Generos</option>               
                {genres?.map((p) => {
                        return (
                            <option key={p.id} value={p.name}>
                                {p.name}
                            </option>
                        );
                    })}                    
            </select> 
            <br /><br /><br />
        </div>
    </div>
            {allGames.length?
            <div>
                    <Paginado
                    gamesPerPage = {gamesPerPage}
                    allGames={allGames.length}
                    paginado = {paginado}                    
                    />
                <div>
                    {currentGames?.map((p) =>{
                    return(
                    <Fragment key={p.id}>                    
                        {                           
                            <Link key={p.id} to={`/videogames/${p.id}`}>
                            <Card
                                name={p.name} 
                                image={p.image ? p.image : p.image}
                                genre={p.genre ? p.genre : p.genres}                              
                                platform={p.platform? p.platform : p.platforms}
                            />                        
                            </Link>
                        }
                    </Fragment> 
                    )})
                }
                </div>
            </div>:<Loading/>}
        </div> 
    </div>        
    )}