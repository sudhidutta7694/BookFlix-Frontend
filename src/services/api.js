import axios from 'axios'

const token= "1dc8f67cb5ee2d801ef91ff145b4c3a9"

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${token}`,
    }
})