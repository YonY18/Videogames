/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import estilos from '../Estilos/NavBar.module.css'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function NavBar({ handleOrder, handleOrderRating, handleFilterCreated, handleFilterGenres, handleClick }) {
  const genres = useSelector(state => state.genres)
  return (

    <div className={estilos.contenedorFiltro}>
      <Link to='/'><button className={estilos.button}>Lanzamiento</button></Link>
      <Link to='/videogame'>
        <button className={estilos.button}>Crear</button>
      </Link>
      <button className={estilos.button} onClick={handleClick}>Recargar</button>

      <div className={estilos.contenedorOrden}>
        <SearchBar />
        <div className={estilos.navBar1}>
        <label className={estilos.label}>Ordenar: </label>
          <select
            className={estilos.select}
            defaultValue='Order'
            onChange={handleOrder}
          >
            <option value='Order' disabled>Alfabeticamente</option>
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
        </div>
        <div className={estilos.navBar2}>
        <label className={estilos.label}>Ordenar por: </label>
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
    </div>

  )
}