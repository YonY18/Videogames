import React from 'react';
import estilos from '../Estilos/Card.module.css';

export default function Card({name, image, genres, rating}) {
  return (
    <div className={estilos.cardItem}>
        <div className= {estilos.card}>
        <h1 className= {estilos.nombre}>{name}</h1>
        <img className={estilos.imagen} src={image} alt='Img not found' />
        <h2 className={estilos.generos}>GENEROS: {genres.join(",  ")}</h2>
        <h2 className={estilos.rating}>🏆 Rating: {rating}</h2>
      </div>
    </div>
  )
}

