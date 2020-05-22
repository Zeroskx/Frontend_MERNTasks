import { 
FORMULARIO_PROYECTO, 
OBTENER_PROYECTOS,
AGREGAR_PROYECTO,
VALIDAR_FORMULARIO,
PROYECTO_ACTUAL,
ELIMINAR_PROYECTO,
PROYECTO_ERROR
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            if (state.formulario) {
                return {
                    ...state,
                    formulario: false
                }
            } else {
                return {
                    ...state,
                    formulario: true
                }
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload // Asi cargamos los proyectos al state que le estamos pasando
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos,action.payload], // Cargamos el nuevo proyecto que recibimos por payload
                formulario:false, // Esto cerrara el formulario despues de agregarlo
                errorformulario:false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoselect:state.proyectos.filter(proyecto=> proyecto._id === action.payload) // Esto buscara en todos los proyectos el que tenga el id que pasamos por Payload
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto=> proyecto._id !== action.payload), // A Diferencia del anterior, para eliminar, lo que hacemos es un filtrado de los que NO SON EL ID DEL PAYLOAD, de esta forma creara un nuevo arreglo sin ese (Eliminandolo)
                proyectoselect:null // Reseteara la pantalla luego de Eliminar
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}



/*
export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        default:
            return state;
    }
}
*/

