import React, { useContext } from 'react'; 
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    // Obtener el State del proyecto y las tareas
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(TareaContext);
    
    // Obtener los props de los context
    const { proyectoActual } = proyectosContext;
    const { obtenerTareas } = tareasContext;

    // Funcion para mostrar las tareas del proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Cambia el main para mostrar las tareas
        obtenerTareas(id); // Pasamos el Id para filtrar las tareas
    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={()=> seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;