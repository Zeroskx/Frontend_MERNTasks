import axios from 'axios';
 // Todos los lugares donde se hagan consultas, se actualizaran a este nuevo backend
const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
})

export default clienteAxios;