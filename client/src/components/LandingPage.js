import React  from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>            
            <h1>P.I. Henry Games</h1>            
            <div>
                <h1>Bienvenidos a mi PI de Video Juegos</h1>
            </div>              
            <Link to = '/home'>     
            <br /><br /><br /> 
                <br /><br />
                <button src='/Home'>INGRESAR</button>
                <br/><br/><br/>
            </Link>

        </div>
    )
}