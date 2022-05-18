import React from 'react'
import { useSelector} from "react-redux";


export default function Error() {
    const errores = useSelector(state => state.videogames)
  return (
    <div>
        {errores?.map((e) => {
                return (
                    <div key={e.id}>
                        <p>{e.error}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

