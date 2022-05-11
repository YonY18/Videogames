import React from 'react';
import estilos from '../Estilos/Paginado.module.css';

export default function Paginado ({gamesPerPage, allGames, paginado}){
    const pageNumbers = []

    for (var i=1; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className={estilos.navbar}>
            <ul>
            {pageNumbers &&                   
                pageNumbers.map ( number => (
                    <li key={number}>
                        <button className={estilos.button} onClick={() => paginado(number)}>{ number }</button>
                    </li>
                ))}
            </ul> 
        </nav>
    )
}