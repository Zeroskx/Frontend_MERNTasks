import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // Manejando el inicio de sesion de usuarios // No exista usuario, pss incorrecto
    useEffect(() => {
    
        if (autenticado){
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar Sesion

    const [usuario, guardarUsuario] = useState({
        email:'',
        password:'',
    });

    // Extraer de usuario

    const {email, password} = usuario;

    const sesion = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesion (Al hacer submit)

    const onSubmit = (e) => {
        e.preventDefault();

        // Validar que no hayan campos vacios

        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // Pasarlo al action
        iniciarSesion({ email, password })
    }

    return ( 
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>
                {alerta 
                    ?  
                        (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) // Mensaje retornado desde backend
                    : null
                }
                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={email}
                            onChange={sesion}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu Password'
                            value={password}
                            onChange={sesion}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                         type='submit' 
                         className='btn btn-primario btn-block'
                         value='Iniciar Sesión'
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Obtener cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;