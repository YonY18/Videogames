/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getGames,
    getListGenres,
    getPlatforms,
    orderByName,
    orderByRating,
    filterCreated,
    filterGamesByGenre
} from '../actions';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import estilos from '../Estilos/Home.module.css';
import Card from './Card';
import Paginado from './Paginado';
import Loading from './Loading';
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games)
    const [orden, setOrden] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getGames());
        dispatch(getListGenres());
        dispatch(getPlatforms());
    }, [dispatch])

    // ** PARA RESETEAR AL TOCAR EL BOTON volver a cargar los Juegos
    function handleClick(p){
        p.preventDefault();
        dispatch(getGames())}

    // ** ORDENAMIENTO DE PAGINA ASCENDENTE O DESCENDENTE
    function handleSort(p){
        p.preventDefault();
        dispatch(orderByName(p.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${p.target.value}`)
    }; 
    function handleSortRating(p){
        p.preventDefault();
        dispatch(orderByRating(p.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${p.target.value}`)
    }; 
    function handleFilterGamesByGenre(p){
        dispatch(filterGamesByGenre(p.target.value))
    };
    function handleFilterCreated(p) {
        p.preventDefault();
        dispatch(filterCreated(p.target.value))
    };


    return (
        <>
            <div className={estilos.home}>
                <h1 className={estilos.titulo}>** Bienvenidos a mi App de Juegos **</h1>
                <NavBar
                    handleClick={handleClick}
                    orderByName={orderByName}
                    handleFilterCreated={handleFilterCreated}
                    handleSortRating={handleSortRating}
                    handleFilterGamesByGenre={handleFilterGamesByGenre}
                    

                />
                <SearchBar
                />
                <div>
                    {allGames.length ?
                        <div>
                            <Paginado
                                gamesPerPage={gamesPerPage}
                                allGames={allGames.length}
                                paginado={paginado}
                            />
                            <div className={estilos.cards}>
                                {currentGames?.map((p) => {
                                    return (
                                        <Fragment key={p.id}>
                                            {
                                                <Link key={p.id} to={`/videogames/${p.id}`}>
                                                    <Card
                                                        name={p.name}
                                                        image={p.image ? p.image : p.image}
                                                        genre={p.genre ? p.genre : p.genres}
                                                        platform={p.platform ? p.platform : p.platforms}
                                                    />
                                                </Link>
                                            }
                                        </Fragment>
                                    )
                                })
                                }
                            </div>
                        </div> : <Loading />}
                </div>
            </div>
            <footer className={estilos.henry}><img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="Logo Henry" width='150' /></footer>
        </>
    )
}