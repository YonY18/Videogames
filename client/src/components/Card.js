import React from "react";

export default function Card({name, image, genre, genres, platform, platforms}){
    
    return (
        <div>   
            <h2>{name}</h2>                        
            <img   src={image} alt="img not found" width = "400px" height="270px"/>
            <h5>GENEROS: {genres
                        ? genres.map((p) => p.name + ", ")
                        : genre.map((p) => p.name + ", ")}</h5>
        </div>)
}