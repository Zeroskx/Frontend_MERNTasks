import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // Manejando el registro de usuarios (Validacion OK y redireccion // Error, usuario ya existe, etc.)
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
        nombre:'',
        email:'',
        password:'',
        confirmar:'',
    });

    // Extraer de usuario

    const {nombre, email, password, confirmar} = usuario;

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
        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === ''){
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
                return;
            }

        // Validar que el password minimo es de 6 caracteres

        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }

        // Validar que los 2 passwords sean iguales

        if (password !== confirmar) {
            mostrarAlerta('Las claves no son iguales', 'alerta-error')
            return;
        }
        // Pasarlo al action

        registrarUsuario({ // Como clave valor tienen el mismo nombre, puede pasarse asi, es lo mismo que colocar nombre:nombre
            nombre,
            email,
            password
        })


    }

    return ( 
        <div className='form-usuario'>
            {alerta 
                ?  
            (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) // Mensaje retornado desde backend
                : null
            }
            <div className='contenedor-form sombra-dark'>
                <h1>Obtener una Cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Tu Nombre'
                            value={nombre}
                            onChange={sesion}
                        />
                    </div>
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
                        <label htmlFor='confirmar'>Confirmar Password</label>
                        <input
                            type='password'
                            id='confirmar'
                            name='confirmar'
                            placeholder='Repite tu Password'
                            value={confirmar}
                            onChange={sesion}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                         type='submit' 
                         className='btn btn-primario btn-block'
                         value='Registrarse'
                        />
                    </div>
                </form>
                <Link to={'/'} className='enlace-cuenta'>
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;