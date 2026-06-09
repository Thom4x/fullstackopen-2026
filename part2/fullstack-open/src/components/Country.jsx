import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import countryServices from '../services/countries.js'

const CountryDetails = ({ country, climate, wind }) => {
    return (
        <div>
            <h1 style={{ color: 'black' }}>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages || {}).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="" style={{ width: '200px', marginLeft: '10px' }} />
            <h2>Weather in {country.name.common}</h2>
            <p>Temperature {climate} Celsius</p>
            <p>Wind {wind}</p>
        </div>
    )
}

const Country = () => {
    const [allCountries, setAllCountries] = useState([]); // Lista completa
    const [countryView, setViewCountry] = useState([]);
    const [busqueda, setBusqueda] = useState('')
    const [temperature, setTemperature] = useState({ temperature: '', wind: '' })

    // Agrega todos los paises a una lista
    useEffect(() => {
        countryServices
            .getCountry()
            .then((data) => {
                setAllCountries(data)
            }).catch((error) =>
                console.log("error", error))
    }, [])

    // Obtener clima
    const successCountry = countryView.length === 1 ? countryView[0]?.name?.common : '';

    useEffect(() => {
        if (!successCountry) return;
        setTemperature({ temperature: '', wind: '' });

        countryServices
            .getWeather(successCountry)
            .then((data) => {
                console.log("La temperatura de ", data.location.country, "es", data.current.temp_c)
                const convertWind = (data.current.wind_mph / 2.237).toFixed(2)
                const recurrentTemperature = {
                    "temperature": data.current.temp_c,
                    "wind": convertWind
                }
                setTemperature(recurrentTemperature)
            }).catch((error) => {
                console.log("error", error)
            })
    }, [successCountry])

    const handleInput = (event) => {
        const value = event.target.value
        setBusqueda(value)

        if (value) {
            const filtered = allCountries.filter((country) =>
                country.name.common.toLowerCase().includes(value.toLowerCase())
            );
            setViewCountry(filtered)

        } else {
            setViewCountry([]);
        }

    }

    return (
        <div>
            find countries
            <input type="text" value={busqueda} onChange={handleInput} /><br />
            {busqueda.length === 0 ? null :
                countryView.length > 10 ? (
                    <p>Too many matches, specify another filter</p>
                ) : countryView.length === 1 ? (
                    <CountryDetails country={countryView[0]} climate={`${temperature.temperature}°`} wind={`${temperature.wind} m/s`} />

                ) : (
                    <ul>
                        {countryView.map((country) => (
                            <li key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => {
                                    setViewCountry([country]);
                                    setBusqueda(country.name.common)
                                }}>View</button>
                            </li>
                        ))}
                    </ul>
                )
            }

        </div>

    )
}

export default Country
