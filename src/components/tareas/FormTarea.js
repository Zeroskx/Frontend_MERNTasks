import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer si un proyecto esta activo con context
    const proyectosContext = useContext(proyectoContext);
    const { proyectoselect } = proyectosContext;

    // Obtener la funcion del context para agregar las tareas
    const tareasContext = useContext(TareaContext);
    const { errortarea, tareaseleccionada, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada para su edicion

    useEffect(()=> {
        if(tareaseleccionada !==null){
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    },[tareaseleccionada]);




    // State del Formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: '',
    })

    // Extraer el nombre del proyecto

    const { nombre } = tarea;

    // Si no hay proyecto seleccionado:

    if(!proyectoselect) return null;

    // Array Destructuring para extraer el proyecto seleccionado (Devolvera el de la posicion 0)
    const [proyectoactual] = proyectoselect;

    // Leer los valores del formulario

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // Funcion para agregar nuevas tareas al proyecto

    const onSubmitTarea = e => {
        e.preventDefault();

        // Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Revisa si es Edicion o si es nueva tarea
        if(tareaseleccionada === null){
            // Nueva Tarea
                // Agregar la nueva tarea al State
                tarea.proyecto = proyectoactual._id;
                agregarTarea(tarea);
        } else {
            // Tarea Existente
            actualizarTarea(tarea);
            //Limpia la tarea seleccionada del state
            limpiarTarea();
        }

        // Obtener nuevamente las tareas del proyecto actual para agregar la nueva
        obtenerTareas(proyectoactual._id);

        // Reiniciar el form

        guardarTarea({
            nombre:''
        })

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nombre de Tarea'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-block'
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea
                ?
                    <p className='mensaje error'>El nombre de la tarea es obligatorio</p>
                :
                    null
            }
        </div>
     );
}
 
export default FormTarea;