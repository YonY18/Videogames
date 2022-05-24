import React from 'react';
import estilo from '../Estilos/NotFoundPg.module.css'
import {NavLink} from 'react-router-dom'


export default function NotFoundPage() {
    return(
      <div className={estilo.container}>
        <div className={estilo.bg}>
          <div className={estilo.btnAlign}>
          <NavLink to='/home'>
           <button className={estilo.button}>Back Home</button>
          </NavLink> 
          </div>
        </div>
      </div>
    )
  }
  