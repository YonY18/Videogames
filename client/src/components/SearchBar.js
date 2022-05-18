import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameGames , clearGame } from '../Redux/actions/index'
import style from "../Estilos/SerchBar.module.css"

export default function SerchBar() {
  const [input , setInput] = useState('')
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const re = /^[0-9a-zA-ZÁ-ÿ.:-\s]{0,40}$/;


  const handleInputChange = (e) => {
    setInput(e.target.value)
    if(!re.exec(e.target.value)){
      e.target.value.length > 40 ? setErrors({
        name: "longitud inválida"
      })
      :  setErrors({
        name: "carácter invalido"
      })
    }else {
      setErrors({
        name: ""
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(input === ""){
      setErrors({
        name: "este campo es obligatorio"
      })
    }else {
      dispatch(getNameGames(input))
      setInput("")
      dispatch(clearGame())
    }
  }
  

  return (
    <div className={style.searchbar}>
      <form onSubmit={handleSubmit} >
        <div>
        <input className={style.input} 
        name="name"
        type="text"
        placeholder = "Buscar Juego..."
        value={input}
        onChange = {handleInputChange}
        />
        {errors.name && (
        <div className={style.errors}>
        <p>{errors.name}</p>
        </div>
       )}
        <button className= {style.button} type='submit'>Buscar</button>
        </div>
      
      </form>
    </div>
  )
}
