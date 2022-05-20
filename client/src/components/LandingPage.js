import React from 'react';
import { Link } from 'react-router-dom';
import Start from '../Assets/image02.gif';
import estilos from '../Estilos/LandingPage.module.css';
import Videomp4 from '../Assets/video.mp4';
import Videowebm from '../Assets/video.webm';
import audiomp3 from '../Assets/audio.mp3';
import audiowebm from '../Assets/musica.webm'


export default function LandingPage() {
    return (

        <div className={estilos.contenedorGeneral}>
            <video autoPlay muted className={estilos.video}>
                <source src={Videomp4} type="video/mp4"></source>
                <source src={Videowebm} type="video/webm"></source>
            </video>
            <div>
            <audio id="myAudio" autoPlay>
                <source src={audiowebm} type="audio/ogg"></source>
                <source src={audiomp3} type="audio/mpeg"></source>
            </audio>
            </div>
            <div className={estilos.contenedor}>
                <div className={estilos.LandingPage}>
                    <div className={estilos.titulo}><Link to='/home'>
                        <img className={estilos.button} src={Start}
                            alt='Start'
                            width="300"
                            height="250" />
                    </Link></div>
                </div>
            </div>
        </div>
    )
}