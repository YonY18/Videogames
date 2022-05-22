import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getDetail, vaciarDetail, deleteVideogame } from '../Redux/actions'
import Loading from './Loading'
import estilos from "../Estilos/Detail.module.css"

export default function Detail() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams()
  const allDetails = useSelector(state => state.details)

  useEffect(() => {
    dispatch(getDetail(id))
    return function () {
      dispatch(vaciarDetail())
    }
  }, [dispatch, id])
  console.log(allDetails)

  const handleDelete = () =>{
    dispatch(deleteVideogame(id));
    alert('Juego eliminado correctamente')
    navigate('/home')
}
  return (
    <div>
      <div className={estilos.navbar}>
      <Link to="/home">
        <button className={estilos.buttonBack}>Volver al Home</button>
      </Link>
      {typeof allDetails.id === 'string' && (
                <button className={estilos.buttonBack}onClick={handleDelete}>DELETE</button>
            )}
      </div>
      {allDetails.length !== 0 ? (
        <div className={estilos.imagen}>
        <div className={estilos.contenedorGeneral}>
          <h1 className={estilos.tituloName}>{allDetails.name}</h1>
          <img className={estilos.image} src={allDetails.image} alt="" />
          <div className={estilos.contenedorSecundario}>
            <h4 className={estilos.items}>Fecha Lanzamiento: {allDetails.released}</h4>
            <h4 className={estilos.items}>🏆Rating: {allDetails.rating} </h4>
            <h4 className={estilos.items}>Platforma: {allDetails.platforms}</h4>
            <h4 className={estilos.items}>
              Generos:
              {allDetails.genres?.map((g) => g.name).join(", ")}
            </h4>
            <h4 className={estilos.items}>Description: </h4>
            <p
              className={estilos.descriptionDetail}
              dangerouslySetInnerHTML={{ __html: allDetails.description }} />
          </div>
        </div>
        </div>
      ) : <Loading />}
    </div>
  )
}

