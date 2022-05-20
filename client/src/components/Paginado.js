import React from 'react';
import estilos from '../Estilos/Paginado.module.css';

export default function Paginado({gamesPerPage, allGames, paginado,currentPage}) {

  let pageNumbers = [];
  let Paginas = Math.ceil(allGames/gamesPerPage)

  for(let i = 1 ; i <= Paginas; i++){
    pageNumbers.push(i)
  }
 
  return (
    <nav>
      <ul className={estilos.ul}>
      {
        currentPage - 1 > 0 ? (
          <button className={estilos.buttonPN} onClick={() => paginado(currentPage - 1)} >Prev</button>
        ) : null
      }
        {currentPage>=3 ?  <li><button className={estilos.botonPaginado} onClick={() => paginado(currentPage-2)}>{currentPage-2}</button></li> : null}
        {currentPage>=2 ? <li><button className={estilos.botonPaginado}  onClick={() => paginado(currentPage-1)}>{currentPage-1}</button></li> : null}
        <li><button className={estilos.botonPaginado} onClick={() => paginado(currentPage)}>{currentPage}</button></li>
        {currentPage<=22 ? <li><button className={estilos.botonPaginado} onClick={() => paginado(currentPage+1)}>{currentPage+1}</button></li>: null}
        {currentPage<=23 ? <li><button className={estilos.botonPaginado} onClick={() => paginado(currentPage+2)}>{currentPage+2}</button></li>: null}

      {
        currentPage < Paginas ? (
          <button className={estilos.buttonPN} onClick={() => paginado(currentPage + 1)} >Next</button>
        ) : null
      }
      </ul>
    </nav>
  )
}
/*  Paginado simple    
{ 
  pageNumbers && pageNumbers.map(number => (
  <li className={estilos.li} key={number}>
    <button className={estilos.botonPaginado} onClick={() => paginado(number)}>{number}</button>
  </li>
  ))
}
*/