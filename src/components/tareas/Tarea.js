import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

    // Extraer si un proyecto esta activo con context
    const proyectosContext = useContext(proyectoContext);
    const { proyectoselect } = proyectosContext;
        // Extraemos el id del proyecto para cuando eliminemos las tareas
        const [proyectoactual] = proyectoselect;

    // Obtener la funcion del context para eliminar las tareas
    const tareasContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // Funcion que se ejecuta para eliminar Tareas
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoactual._id);
        obtenerTareas(proyectoactual.id);
    }

    // Funcion que modifica el estado de las tareas

    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        }else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // Funcion que selecciona las tareas para editarlas
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className='tarea sombra'>
            <p>{tarea.nombre} </p>
            <div className="estado">
                {tarea.estado 
                    ? 
                        (                        
                            <button
                                type='button'
                                className='completo'
                                onClick={() => cambiarEstado(tarea)}
                            >Realizado</button>
                        )
                    :
                        (
                            <button
                                type='button'
                                className='incompleto'
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                
                }
            </div>
            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
                
            </div>
        </li> 
     );
}
 
export default Tarea;