import { AppThunk } from './store';  // Assuming you have a root store setup
import axios from 'axios';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../store/weather/weatherSlice';

const apiKey = '2ee3266ea13d14680a6cfb193e067ab5'; 

export const fetchWeather = (lat: number, lon: number): AppThunk => async (dispatch) => {
  dispatch(fetchWeatherStart());
  
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    dispatch(fetchWeatherSuccess(response.data));
    console.log(response.data)
  } catch (error) {
    dispatch(fetchWeatherFailure('Failed to fetch weather data'));
  }
};

export const fetchWeatherByCity = (city: string): AppThunk => async (dispatch) => {
  dispatch(fetchWeatherStart());

  try { 
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    dispatch(fetchWeatherSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(fetchWeatherFailure('Failed to fetch weather for city'));
  }
};