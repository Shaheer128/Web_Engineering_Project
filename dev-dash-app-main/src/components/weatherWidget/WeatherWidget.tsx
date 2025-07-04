

// 2nd

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchWeather } from '../../store/weatherThunks';
import { fetchWeatherByCity } from '../../store/weatherThunks'; // ✅ import
import { fetchWeatherFailure } from '../../store/weather/weatherSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hook';
import './style.css';

export const WeatherWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const weather = useSelector((state: RootState) => state.weather);

  const [manualMode, setManualMode] = useState(false);
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeather(latitude, longitude));
        },
        (error) => {
          console.error(error);
          dispatch(fetchWeatherFailure('Failed to get geolocation'));
          setManualMode(true); // ✅ fallback to manual input
        }
      );
    } else {
      dispatch(fetchWeatherFailure('Geolocation not supported'));
      setManualMode(true);
    }
  }, [dispatch]);

  const handleCitySearch = () => {
    if (cityInput.trim()) {
      dispatch(fetchWeatherByCity(cityInput.trim()));
    }
  };

  return (
    <div className='widget-parent'>
      <div className="widget">
        {manualMode && (
          <div className="manual-input">
            <p className="error">Geolocation failed. Please enter your city manually.</p>
            <input
              type="text"
              placeholder="Enter city name"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="city-input"
            />
            <button onClick={handleCitySearch} className="search-btn">
              Search
            </button>
          </div>
        )}

        {weather.temperature && weather.description && weather.name && weather.icon && weather.wind && weather.humidity && weather.feels_like && (
          <div className="widget-data">
            <h1>{weather.name}</h1>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description || 'Weather icon'}
              style={{
                width: '100px',
                height: '100px',
                filter: 'brightness(0) saturate(100%) invert(50%) sepia(100%) hue-rotate(180deg)',
              }}
            />
            <h3>{weather.temperature}°C</h3>
            <p>{weather.description}</p>
            <div className="weather-row">
              <span>
                <p>Wind</p>
                <p>{weather.wind}</p>
              </span>
              <span>
                <p>Humidity</p>
                <p>{weather.humidity}</p>
              </span>
              <span>
                <p>Feels like</p>
                <p>{weather.feels_like}</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
