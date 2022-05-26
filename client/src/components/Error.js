import React from 'react'
import { useSelector} from "react-redux";
import estilos from '../Estilos/Errors.module.css'

export default function Error() {
    const errores = useSelector(state => state.videogames)
  return (
    <div>
        {errores?.map((e) => {
                return (
                    <div className={estilos.contenedorError} key={e.error}>
                        <p>{e.error}</p>
                    </div>
                )
            })
        }
    </div>
  )
}
