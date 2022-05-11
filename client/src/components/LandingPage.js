import React  from 'react';
import {Link} from 'react-router-dom';
import login from '../Img/image02.gif'
import estilos from '../Estilos/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={estilos.LandingPage}>                         
            <div className={estilos.titulo}><Link to = '/home'>     
                <img className={estilos.button} src={login}
				alt='Login'
                width="300"
                height="250"/>
            </Link></div>

        </div>
    )
}