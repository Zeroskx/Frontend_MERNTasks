import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    // Obtener el state del formulario desde proyectoContext de esta forma podemos consumir el state del formulario sin necesidad de pasarlo por todo el arbol a traves de props
    const proyectosContext = useContext(proyectoContext);
    // Extraemos el formulario (Su state)
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    // State para el formulario de nuevos proyectos

    const [proyecto, guardarProyecto] = useState({
        nombre: '',
    });

    // Lee los contenidos del input de Nuevo Proyecto

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    // Destructuring al state para el value del form

    const { nombre } = proyecto;

    // Cuando el usuario envia un proyecto

    const onSubmitProyecto = (e) => {
        e.preventDefault();

        // Validar el Proyecto

        if (nombre.trim() === ''){
            mostrarError();
            return;
        };

        // Agregarlo al State

        agregarProyecto(proyecto);

        // Reiniciar el form

        guardarProyecto({
            nombre:''
        })

        
    }

    // Mostrar el Formulario


    return ( 
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>
            {formulario
                ?
                    (
                        <form 
                        className='formulario-nuevo-proyecto'
                        onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                className='input-text'
                                placeholder='Nombre Proyecto'
                                name='nombre'
                                value={nombre}
                                onChange={onChangeProyecto}
                            />
                            <input 
                                type="submit" 
                                value="Agregar Proyecto"
                                className='btn btn-primario btn-block'
                            />
                        </form>
                    )
                : null
            }
            {errorformulario 
                ? 
                    <p className='mensaje error'>El nombre del Proyecto es Obligatorio</p> 
                : 
                    null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;