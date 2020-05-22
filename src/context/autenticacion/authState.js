import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios'; // Para comunicarnos con Backend
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    OBTENER_USUARIO, 
    LOGIN_EXITOSO, 
    LOGIN_ERROR, 
    CERRAR_SESION 
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // --- Funciones

    // Registrar usuarios

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos); // De esta forma nos comunicamos con Backend, obtenemos desde el routing del servidor y ponemos como segundo parametro que le vamos a enviar.
            console.log(respuesta); // Al inicio, hacemos peticiones para desmembrar el json y obtener el token que pasaremos en el payload
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario despues del registro exitoso
            usuarioAutenticado();
        } catch (error) {
            //console.log(error.response); // De esta forma accedemos a los errores que nos devuelve axios
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna el usuario autenticado

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            // Funcion para enviar el token por Headers
            tokenAuth(token);

        }
        try {
            const respuesta = await clienteAxios.get('api/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('api/auth',datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            // Obtener el usuario despues del inicio exitoso
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token:state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;