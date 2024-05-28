import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import debounce from 'lodash/debounce';
import './styles.css';
import Input from "./components/Input";
import Button from "./components/Button";
import Weather from "./components/Weather";

interface City {
    name: string;
}

interface WeatherData {
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
}

const cache = setupCache({
    maxAge: 15 * 60 * 1000 // Кэш на 15 минут
});

const api = axios.create({
    adapter: cache.adapter
});

const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response: AxiosResponse<{ data: City[] }> = await api.get('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions', {
                headers: {
                    'X-RapidAPI-Key': 'f439183f41msh1dd025c7901bee2p17d9e9jsnce447540bd8f',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            });
            setCities(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const fetchWeatherData = async () => {
        try {
            const response: AxiosResponse<WeatherData> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=762e5ee1591ef8fad4b67bfe3e823fb0&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleCityChange = (value: string) => {
        setCity(value);
    };

    const handleSearchClick = () => {
        fetchWeatherData();
    };

    return (
        <div className="container">
            <Input value={city} onChange={handleCityChange} />
            <Button onClick={handleSearchClick} />
            {weatherData && (
                <Weather
                    cityName={city}
                    temperature={weatherData.main.temp}
                    description={weatherData.weather[0].description}
                />
            )}
            <div>
                <ul>
                    {cities.map((city: City, index: number) => (
                        <li key={index}>{city.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
