import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  temperature: number | null;
  description: string | null;
  name: string | null;
  icon: string | null;
  wind: number | null;
  feels_like: number | null;
  humidity: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  temperature: null,
  description: null,
  name: null,
  icon: null,
  humidity: null,
  wind: null,
  feels_like: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<any>) => {
      state.temperature = action.payload.main.temp;
      state.description = action.payload.weather[0].description;
      state.name = action.payload.name;
      state.icon = action.payload.weather[0].icon;
      state.wind = action.payload.wind.speed;
      state.humidity = action.payload.main.humidity;
      state.feels_like = action.payload.main.feels_like;
      state.loading = false;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions;
export default weatherSlice.reducer;