import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {CategoriasContext} from '../context/CategoriasContext'
import {RecetasContext} from '../context/RecetasContext'

const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })


    const [alert, setAlert] = useState(false)

    const {categorias} = useContext(CategoriasContext)
    const {setBuscarRecetas, setConsultar} = useContext(RecetasContext)


    const handleChanghe = e =>{
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault()

        if(busqueda.nombre === '' || busqueda.categoria === ''){
            setAlert(true)
            return
        }

        setConsultar(true)
        setBuscarRecetas(busqueda)
        setAlert(false)
        setBusqueda({
            nombre: '',
            categoria: ''
        })


    }

    return (
        <>
            <form className='col-12' onSubmit={ handleSubmit}>
                {alert ? (<h2>Rellena ambos campos porfavor</h2>) : null}
                <fieldset className='text-center'>
                    <legend>Busca Bebidas por categoria</legend>
                </fieldset>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <input type="text" name='nombre' value={busqueda.nombre} onChange={handleChanghe} placeholder='selecciona el ingrediente' className="form-control"/>
                    </div>
                    <div className="col-md-4">
                        <select name="categoria" className="form-control" onChange={handleChanghe}>
                            <option value="">--selecciona categoria--</option>
                            {categorias.map(elm =><option key={elm.strCategory} value={elm.strCategory}>{elm.strCategory}</option>)}
                        </select>
                    </div>
                    <div className="col-md 4">
                        <input type='submit' value='buscar recetas' className="btn-block btn-primary"></input>
                    </div>
                </div>
            </form>
        </>
    )
}

Formulario.propTypes = {

}

export default Formulario
