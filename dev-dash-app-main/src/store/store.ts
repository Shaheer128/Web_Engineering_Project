
import { configureStore, ThunkAction,ThunkDispatch, Action } from '@reduxjs/toolkit';
import weatherReducer from '../store/weather/weatherSlice';
import pomodoroReducer from '../store/pomodoro/pomodoroSlice';
// Define the root state type
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
     pomodoro: pomodoroReducer,
  },
});

// Define RootState (infer from store)
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch (for typed dispatch)

// Define AppThunk type (for async actions)
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
