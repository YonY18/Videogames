import React from "react";
import estilos from '../Estilos/Card.module.css';

export default function Card({name, image, genre, genres, platform, platforms}){
    
    return (
        <div className={estilos.card}>   
            <h3 className={estilos.titulo}>{name}</h3>                        
            <img src={image} alt="img not found" width = "300px" height="250px"/>
            <h5 className={estilos.tipos}>GENEROS: {genres
                        ? genres.map((p) => p.name + ", ")
                        : genre.map((p) => p.name + ", ")}</h5>
        </div>)
}