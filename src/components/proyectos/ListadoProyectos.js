import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

    // Obtener el state de los proyectos declarados en el state principal
    const proyectosContext = useContext(proyectoContext);

    // Extraemos los proyectos con Destructuring
    const {proyectos, mensaje, obtenerProyectos} = proyectosContext;  

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

        // Obtener proyectos cuando carga el compononente
    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
        //eslint-disable-next-line
    },[mensaje]);

    // Verifico si existen proyectos
    if(proyectos.length === 0) return <p>No hay proyectos actualmente. Comienza creando un nuevo proyecto.</p>;
    
    return ( 
        <ul className='listado-proyectos'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                    key={proyecto._id}
                    timeout={200}
                    classNames='proyecto'
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;