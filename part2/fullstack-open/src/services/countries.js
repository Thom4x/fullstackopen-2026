import axios from "axios";
const API_KEY = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all' // servidor API
const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`


const getCountry = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (city) => {
    const request = axios.get(`${weatherUrl}&q=${city}`)
    return request.then(
        response => response.data
    )
}



export default { getCountry, getWeather }