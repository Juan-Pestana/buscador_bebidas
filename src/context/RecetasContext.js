import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const RecetasContext = createContext()

const RecetasProvider = (props) =>{
        const [recetas, setRecetas] = useState([])
        const [busqueda, setBuscarRecetas] = useState({
            nombre: '',
            categoria: ''
        })
        const [consultar, setConsultar]= useState(false)

        useEffect(()=>{

        if(consultar){
            const obtenerRecetas = async () =>{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`
                const recetas = await axios.get(url)

                // console.log(recetas.data.drinks);
                setRecetas(recetas.data.drinks)
            }
            obtenerRecetas()
        }
        },[busqueda])


    return (

        <RecetasContext.Provider
            value={{
                recetas,
                setBuscarRecetas, 
                setConsultar
            }}
        >
            {props.children}

        </RecetasContext.Provider>

    )

}

export default RecetasProvider
