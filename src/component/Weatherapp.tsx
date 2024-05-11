import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

interface WeatherData {
  name?: string;
  main?: {
    temp?: number;
  };
}

const Weather: React.FC = () => {
  const [inputCity, setInputCity] = useState<string>("");
  const [data, setData] = useState<WeatherData>({});
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeatherDetails = async (cityName: string) => {
    try {
      if (!cityName || !apiKey) return;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-8">Weather App</h1>
      <div className="flex items-center justify-center mb-8">
        <input
          type="text"
          placeholder="Enter Your City"
          value={inputCity}
          onChange={handleChangeInput}
          className="border border-gray-400 rounded-l-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md ml-2 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
      {data.name && (
        <div className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center">
          <img src="download.jpeg" alt="Logo" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
          <p className="text-2xl">{data.main ? ((data.main.temp || 0) - 273.15).toFixed(2) : 'N/A'}°C</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
