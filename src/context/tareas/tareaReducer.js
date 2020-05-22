import { 
TAREAS_PROYECTO,
AGREGAR_TAREA,
VALIDAR_TAREA,
ELIMINAR_TAREA,
TAREA_ACTUAL,
ACTUALIZAR_TAREA,
LIMPIAR_TAREA
} from '../../types';


export default (state,action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
                //No se necesita porque tenemos el filtro en el backend ->tareasproyecto: state.tareasproyecto.filter(tarea => tarea.proyectoId === action.payload)
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [...state.tareasproyecto, action.payload],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }

        case TAREA_ACTUAL:
            return{
                ...state,
                tareaseleccionada: action.payload
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaseleccionada:null
            }
        default:
            return state;
    }
}