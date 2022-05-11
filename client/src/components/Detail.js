/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsGames, cleanId } from "../actions/index";
import { Link } from "react-router-dom";
import Loading from './Loading';
import estilos from '../Estilos/Detail.module.css'

export default function Details() {
    const dispatch = useDispatch();
    const allDetails = useSelector((state) => state.gamesDetails); 
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetailsGames(id));
        return()=>{
            dispatch(cleanId(id))
        } 
    },[])

    return (
        <div>
            {allDetails.length > 0 ? (
            <div className={estilos.todo}>
                <Link to='/home'><button>REGRESAR AL HOME</button></Link>
                <h1 className={estilos.titulo}>{allDetails[0].name}</h1>
                <div className={estilos.contGral}>
                <img src={allDetails[0].image} alt="img not found" width = "300px" height="250px"/>
                    <div className={estilos.contenedorInfo}>
                    <div><label> LANZAMIENTO: </label>{allDetails[0].released}</div> 
                    <div><label> RATING: </label>{allDetails[0].rating}</div>
                    <div><label>DESCRIPCION: </label>{allDetails[0].description
                        ? allDetails[0].description
                        : "NO POSEE DESCRIPCION"}</div>
                    <div><label>GENEROS: </label>{allDetails[0].genres
                        ? allDetails[0].genres.map((p) => p.name + ", ")
                        : allDetails[0].genre.map((p) => p.name + ", ")}</div> 
                    <div><label>PLATAFORMAS: </label>{Array.isArray(allDetails[0].platform)
                        ? allDetails[0].platform.map((p) =>p.platform.name + ", ")
                        : "Pc"}                       
                    </div>
                    </div>
                </div>
            </div>
            ):<Loading/>}
        </div>
    )
}