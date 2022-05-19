/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getGames, 
  getGenres, 
  filterByGenres, 
  orderByRating,
  filterCreated, 
  orderByName, 
  } from '../Redux/actions';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import estilos from '../Estilos/Home.module.css';
import Card from './Card';
import Paginado from './Paginado';
import Loading from './Loading';
import Error from './Error';

export default function Home() {
  const dispatch = useDispatch()
  const allGames = useSelector(state => state.videogames)
  const genres = useSelector(state => state.genres)
  const [currentPage, setCurrentPage] = useState(1)
  const [gamesPerPage, setGamesPerPage] = useState(15)
  const [sort, setSort] = useState()
  const [sortRating, setSortRating] = useState()

  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getGames())
    dispatch(getGenres())
  }, [dispatch])

  const handleClick = (p) => {
    p.preventDefault();
    dispatch(getGames())
  }

  const handleFilterGenres = (p) => {
    dispatch(filterByGenres(p.target.value))
    setCurrentPage(1)
  }

  const handleFilterCreated = (p) => {
    dispatch(filterCreated(p.target.value))
    setCurrentPage(1)
  }

  const handleOrder = (p) => {
    dispatch(orderByName(p.target.value))
    setCurrentPage(1)
    setSort(p.target.value)
  }

  const handleOrderRating = (p) => {
    dispatch(orderByRating(p.target.value))
    setCurrentPage(1)
    setSortRating(`rating ${p.target.value}`)
  }

  return (
    <>
      <div >
        <div >
          <h1 className={estilos.titulo}>** Bienvenidos a mi App de Juegos **</h1>
          <NavBar
            handleClick={handleClick}
            orderByName={orderByName}
            handleOrder={handleOrder}
            handleFilterCreated={handleFilterCreated}
            handleFilterGenres={handleFilterGenres}
            handleOrderRating={handleOrderRating}
          />
          {allGames.length ?
            <div>
              <Paginado
                gamesPerPage={gamesPerPage}
                allGames={allGames.length}
                paginado={paginado}
                currentPage={currentPage}
              />
              <div>
                <div className={estilos.contenedorCards}>
                  {currentGames?.map((p) => {
                    return (
                      <Fragment key={p.id}>
                        {p.error ? <div className={estilos.error}><Error /></div> :
                          <Link key={p.id} to={`/videogames/${p.id}`}>
                            <Card
                              name={p.name}
                              image={p.image}
                              genres={p.genres}
                              rating={p.rating}
                            />
                          </Link>}
                      </Fragment>
                    )
                  })
                  }
                </div>
              </div>
            </div> : <Loading />
          }
        </div>
      </div>
      <footer className={estilos.henry}><img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="Logo Henry" width='150' /></footer>
    </>
  )
}