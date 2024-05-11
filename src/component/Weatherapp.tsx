import axios from 'axios';
import { useState } from 'react';

const Weather = () => {
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  console.log(apiKey)

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    axios.get(apiUrl)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }

  return (
    <>
      <div className='min-h-screen bg-gray-200 flex flex-col justify-center items-center'>
        <h1 className='text-4xl mb-8'>Weather App</h1>
        <div className='flex items-center justify-center mb-8'>
          <input
            type="text"
            placeholder="Enter Your City"
            id="Search1"
            name="fname"
            value={inputCity}
            onChange={handleChangeInput}
            className='border border-gray-400 rounded-l-md px-3 py-2 focus:outline-none focus:border-blue-500'
          />
          <button
            id="button"
            type="button"
            onClick={handleSearch}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md ml-2 transition duration-300 ease-in-out'
          >
            Search
          </button>
        </div>
        {Object.keys(data ).length > 0 &&
          <div className='bg-white shadow-md rounded-lg p-8 flex flex-col items-center'>
            <img className='w-24 h-24 mb-4' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F925716%2Fscreenshots%2F3333720%2Fattachments%2F722375%2Fnight.png%3Fcompress%3D1%26resize%3D400x300&f=1&nofb=1&ipt=7351238224b617254bee68131dfcde2bd691c8b101a10fb1bf759539fa83ce29&ipo=images" alt="Logo" />
            <h2 className='text-2xl font-semibold mb-2'>{data.name}</h2>
            <p className='text-2xl'>{((data.main?.temp || 0) - 273.15).toFixed(2)}°C</p>
          </div>
        }
      </div>
    </>
  );
}

export default Weather;
