import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';



const ListadoTareas = () => {

    // Extraer el State de los context (Proyecto y Tareas)
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(TareaContext);

    //Destructuring para los valores de los context
    const { proyectoselect, eliminarProyecto, proyectos } = proyectosContext;
    const { tareasproyecto } = tareasContext;
    

    // Confirmamos que existan proyectos.
    if(proyectos.length === 0) return <h2>Crea un proyecto</h2>;

    // Si no hay proyecto seleccionado:

    if(!proyectoselect) return <h2>Selecciona un proyecto</h2>;

    // Array Destructuring para extraer el proyecto seleccionado (Devolvera el de la posicion 0)
    const [proyectoactual] = proyectoselect;

    //Elimina un proyecto

    const onClickEliminar = () => {
        eliminarProyecto(proyectoactual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoactual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0
                    ? 
                        (<li className='tarea'><p>No hay Tareas</p></li>)
                    : 
                        <TransitionGroup>
                            {tareasproyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea.id} // El key siempre va en el primer hijo del map
                                    timeout={200}
                                    classNames='tarea'
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ) )}
                        </TransitionGroup>
                }

            </ul>
            <button
                    type='button'
                    className='btn btn-eliminar'
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;