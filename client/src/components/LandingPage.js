import React  from 'react';
import {Link} from 'react-router-dom';
import login from '../Img/image02.gif'

export default function LandingPage(){
    return(
        <div>                         
            <Link to = '/home'>     
                <img src={login}
				alt='Login'
                width="300"
                height="250"/>
            </Link>

        </div>
    )
}