import React from 'react';
import estilos from '../Estilos/Paginado.module.css';

export default function Paginado({ gamesPerPage, allGames, paginado, currentPage }) {

  let pageNumbers = [];
  let Paginas = Math.ceil(allGames / gamesPerPage)

  for (let i = 1; i <= Paginas; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className={estilos.ul}>
        {
          currentPage - 1 > 0 ? (
            <button className={estilos.buttonPN} onClick={() => paginado(currentPage - 1)} >Prev</button>
          )
            : null
        }
        {pageNumbers.map(number => (
          <li className={estilos.li} key={number}>
            <button className={estilos.botonPaginado} onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
        {
          currentPage < Paginas ? (
            <button className={estilos.buttonPN} onClick={() => paginado(currentPage + 1)} >Next</button>
          )
            : null
        }
      </ul>
    </nav>
  )
}
/*      
{ 
  pageNumbers && pageNumbers.map(number => (
  <li className={estilos.li} key={number}>
    <button className={estilos.botonPaginado} onClick={() => paginado(number)}>{number}</button>
  </li>
  ))
}
*/