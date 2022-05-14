/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';


export default function NavBar({orderByName, handleSortRating, handleFilterCreated, handleFilterGamesByGenre, handleClick }) {
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres);
return (
    
   
<div className="selectfont">
    <div>
        <Link to= '/'><button className="selectfont">IR A PAGINA DE LANZAMIENTO</button></Link> 
        <button className="selectfont" onClick={p => {handleClick(p)}}>VOLVER A CARGAR JUEGOS</button>
        <Link to= '/create'><button className="selectfont">CREAR JUEGO NUEVO</button></Link>
     </div>        
<select className="selectfont" onChange={p => orderByName(p)}>
    <option value="" defaultValue>Por Orden alfabético</option>                
    <option value='asc'>Ascendente A-Z</option>
    <option value='desc'>Descendente Z-A</option>
</select>            
           
<select className="selectfont" onChange={p => handleFilterCreated(p)}>                
    <option value="" defaultValue>Mostrar Juegos</option>
    <option value="all">Todos Los Juegos</option>
    <option value="api">De la API</option>
    <option value="created">Creados</option>
</select>   
<select className="selectfont" onChange={p => handleSortRating(p)}>                
    <option value="" defaultValue>Rating</option>                
    <option value="rasd">Ascendente</option>
    <option value="rdes">descendente</option>
</select>   

<select className="selectfont" onChange={p => handleFilterGamesByGenre(p)}>
    <option value="sinFiltro" defaultValue>Generos</option>               
    {genres?.map((p) => {
            return (
                <option key={p.id} value={p.name}>
                    {p.name}
                </option>
            );
        })}                    
</select></div>
    )}