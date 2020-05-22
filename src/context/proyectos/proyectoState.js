import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
FORMULARIO_PROYECTO, 
OBTENER_PROYECTOS,
AGREGAR_PROYECTO,
PROYECTO_ERROR,
VALIDAR_FORMULARIO,
PROYECTO_ACTUAL,
ELIMINAR_PROYECTO 
} from '../../types';

import clienteAxios from '../../config/axios';



const ProyectoState = props => {

    // State Inicial

    const initialState ={
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyectoselect: null,
        mensaje: null
    }


    // Dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        })
    }

    // Obtener los proyectos para sustituirlos del state inicial
    const obtenerProyectos = async() => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data // El Payload es lo que tome como parametros la funcion
    
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Funcion para agregar nuevos proyectos
    const agregarProyecto = async (proyecto) => { // como vamos a interactuar con la db va con async
    // Y lo almacenamos con un Dispatch

    try {
        const resultado = await clienteAxios.post('/api/proyectos', proyecto);
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: resultado.data
        });
    } catch (error) {
        const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }

}

// Valida el formulario para crear nuevos proyectos

const mostrarError = () => {
    dispatch({
        type:VALIDAR_FORMULARIO
    })
}

// Selecciona el proyecto que el usuario clickea de la Sidebar

const proyectoActual = proyectoId => {
    dispatch({
        type: PROYECTO_ACTUAL,
        payload: proyectoId
    })
}

// Elimina un proyecto seleccionado
const eliminarProyecto = async (proyectoId) => {

    try {
        await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    } catch (error) {
        const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }


}

return (
    <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorformulario: state.errorformulario,
            proyectoselect: state.proyectoselect,
            mensaje: state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}
    >
        {props.children}
    </proyectoContext.Provider>
)

}

export default ProyectoState;