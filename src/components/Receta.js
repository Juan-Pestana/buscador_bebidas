import React, {useContext, useState} from 'react'
import {ModalContext} from '../context/ModalContext'


import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}




const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      height: '100vh',
      width: 400,
      overflow: 'scroll',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


const Receta = ({receta}) => {

        const [modalStyle] = useState(getModalStyle())
        const [open, setOpen] = useState(false)

        const classes = useStyles()
        
        const handleOpen = () =>{
            setOpen(true)
        }

        const handleClose = () =>{
            setOpen(false)
        }

        const {setIdReceta, infoReceta, setReceta} = useContext(ModalContext)

        console.log(infoReceta)

        const mostrarIngredientes = informacion => {
            let ingredientes=[];
            for(let i = 1; i<16; i++ ){
                if (informacion[`strIngredient${i}`])
                ingredientes.push(<li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>)
            }
            return ingredientes
        }

    return (
        <>
            <div className="col-md-4 mb-3">
                <div className="card">
                       <h2 className="card-header">{receta.strDrink}</h2>
                       <img src={receta.strDrinkThumb} className='card-img-top' alt={`recetas de ${receta.strDrink}`}/>
                       <div className="card-body">
                           <button type='button' onClick={()=>{setIdReceta(receta.idDrink); handleOpen()}} className='btn btn-block btn-primary' >Ver Receta</button>



                           <Modal
                           open={open}
                           onClose={()=>{handleClose();
                                        setIdReceta(null);
                                        setReceta({})}}>
                               <div style={modalStyle} className={classes.paper}>
                                   <h2>{infoReceta.strDrink}</h2>
                                   <h3 className="mt-4">Instrucciones</h3>
                                   <p>{infoReceta.strInstructions}</p>
                                   <h3>Ingredientes y Cantidades</h3>
                                   <ul>
                                       {mostrarIngredientes(infoReceta)}
                                   </ul>
                                   <img src={infoReceta.strDrinkThumb} alt={infoReceta.strDrink} className="img-fluid"/>
                               </div>
                           </Modal>
                       </div>                
                </div>
            </div>
        </>
    )
}

export default Receta
