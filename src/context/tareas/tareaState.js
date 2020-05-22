import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import {
TAREAS_PROYECTO,
AGREGAR_TAREA,
VALIDAR_TAREA,
ELIMINAR_TAREA,
TAREA_ACTUAL,
ACTUALIZAR_TAREA,
LIMPIAR_TAREA
} from '../../types/index'

const TareaState = props => {
    // Iniciamos el State
    const initialState ={
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada:null

    }

    // Crear el dispatch y State
    const [state,dispatch]= useReducer(TareaReducer, initialState);

    // --------- FUNCIONES ---------------

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto:proyecto } });
            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Agregar una Tarea al proyecto seleccionado

    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea);
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Valida y muestra un error en el form de la tarea

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar Tareas por Id

    const eliminarTarea = async (id,proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload:id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Funcion para Actualizar la tarea seleccionada

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Extrae una tarea para editarla

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Funcion para limpiar la tarea seleccionada despues de editarla

    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                agregarTarea,
                obtenerTareas,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
