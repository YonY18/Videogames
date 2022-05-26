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
  cleanFilters,
} from '../Redux/actions';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import estilos from '../Estilos/Home.module.css';
import Card from './Card';
import Paginado from './Paginado';
import Loading from './Loading';
import Error from './Error';

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()
  const allGames = useSelector(state => state.videogames)

  const [currentPage, setCurrentPage] = useState(1)
  const [gamesPerPage, setGamesPerPage] = useState(15)
  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

  const paginado = pageNumber => setCurrentPage(pageNumber)

  const [sort, setSort] = useState()
  const [sortRating, setSortRating] = useState()

  useEffect(() => {
    dispatch(getGames())
    dispatch(getGenres())
    return () => {
      dispatch(cleanFilters());
    }
  }, [dispatch])

  const handleClick = () => {
    window.location.reload();
  };

  if (currentPage && loader) {
    setLoader(false)
  }

  const handleFilterGenres = (p) => {
    dispatch(filterByGenres(p.target.value))
    setCurrentPage(1)
    setRefresh((prevState) => !prevState); // refresh 
  }

  const handleFilterCreated = (p) => {
    dispatch(filterCreated(p.target.value))
    setCurrentPage(1)
    setRefresh((prevState) => !prevState);
  }

  const handleOrder = (p) => {
    dispatch(orderByName(p.target.value))
    setCurrentPage(1)
    setSort(p.target.value)
    setRefresh((prevState) => !prevState);
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
                        {p.error ? <div key={p.id}> <Error /> </div> :
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