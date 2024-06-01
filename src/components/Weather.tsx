import React from 'react';

interface WeatherProps {
    cityName: string;
    temperature: number;
    description: string;
}

const Weather = ({ cityName, temperature, description }: WeatherProps) => {
    return (
        <div className="weather">
            <h2>Weather in {cityName}</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Description: {description}</p>
        </div>
    );
};

export default Weather;
