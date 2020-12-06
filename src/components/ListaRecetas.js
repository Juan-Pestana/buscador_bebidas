
import React, { useContext}from 'react'
import {RecetasContext} from '../context/RecetasContext'
import Receta from './Receta'

const ListaRecetas = () => {

    const {recetas }= useContext(RecetasContext)
    console.log(recetas)

    if (recetas.length < 1) return null

    return (
        <>
           <div className="row mt-5">
              {recetas.map(elm=><Receta
                  key ={elm.idDrink}
                  receta={elm}
              />)}
           </div>
        </>
    )
}

export default ListaRecetas