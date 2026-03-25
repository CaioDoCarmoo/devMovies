import axios from 'axios'


const api = axios.create ({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '7bf9fa1712e3dc8b2531f864aec3d370',
        language: 'pt-BR',
        page: 1
    }
})


export default api