import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDetail , vaciarDetail } from '../Redux/actions'
import Loading from './Loading'
import style from "../Estilos/Detail.module.css"

export default function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const allDetails = useSelector(state => state.details)

  useEffect(() => {
    dispatch(getDetail(id))
    return function () {
      dispatch(vaciarDetail())
    }
  },[dispatch, id])
  console.log(allDetails)

  return (
    <div className= {style.fondoDetail}>
      { allDetails.length !== 0 ? (
        <div className= {style.contenedorGeneral}>
          <h1 className= {style.tituloName}>{allDetails.name}</h1>
          <img className= {style.image} src={allDetails.image} alt=""/>
          <div className= {style.contenedorSecundario}>
            <h4 className= {style.items}>Fecha Lanzamiento: {allDetails.released}</h4>
            <h4 className= {style.items}>🏆Rating: {allDetails.rating} </h4>
            <h4 className= {style.items}>Platforma: {allDetails.platforms}</h4>
            <h4 className= {style.items}>
              Generos: 
              {allDetails.genres?.map((g) => g.name).join(", ")}
            </h4>
            <h4 className= {style.items}>Description: </h4>
            <p 
            className={style.descriptionDetail}
            dangerouslySetInnerHTML = {{__html: allDetails.description }}/>
          </div>
          <Link to="/home">
          <button className= {style.buttonBack}>Volver al Home</button>
          </Link>
        </div>
      ):<Loading/>}
    </div>
  )
}

