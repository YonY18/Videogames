/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import estilos from '../Estilos/NavBar.module.css'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function NavBar({ handleOrder, handleOrderRating, handleFilterCreated, handleFilterGenres, handleClick }) {
  const genres = useSelector(state => state.genres)
  return (

    <div className={estilos.clase1}>
      <Link to= '/'><button className={estilos.button}>IR A PAGINA DE LANZAMIENTO</button></Link>
      <Link to='/videogame'>
        <button className={estilos.button}>Crear Videojuego</button>
      </Link>
      <button className={estilos.button} onClick={handleClick}>Recargar Videojuegos</button>
      <SearchBar />  
      <div className={estilos.selectConte}>
      <select
        className={estilos.select}
        defaultValue='Order'
        onChange={handleOrder}
      >
        <option value='Order' disabled>Ordenar</option>
        <option value='Asc'>A-Z</option>
        <option value='Desc'>Z-A</option>
      </select>
      <select
        className={estilos.select}
        defaultValue='Rating'
        onChange={handleOrderRating}
      >
        <option value='Rating' disabled>🏆Rating</option>
        <option value='high'>High</option>
        <option value='low'>Low</option>
      </select>
      <select
        className={estilos.select}
        defaultValue='Genres'
        onChange={handleFilterGenres}
      >
        <option className="options" disabled>Generos</option>
        <option className="options" value="All">All</option>
        {
          genres.map((e) => (
            <option className='options' key={e.id} value={e.name}>
              {e.name}
            </option>
          ))
        }
      </select>
      <select
        className={estilos.select}
        defaultValue='filtrados'
        onChange={handleFilterCreated}
      >
        <option className="options" disabled>Origen</option>
        <option className="options" value='All'>All</option>
        <option className="options" value='created'>Created </option>
        <option className="options" value='api'>Api</option>
      </select>
    </div>
    </div>
    
  )
}