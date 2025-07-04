// pomodoroSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface PomodoroState {
  tasks: Task[];
  timer: {
    minutes: number;
    seconds: number;
    isRunning: boolean;
    mode: 'focus' | 'break';
    sessionsCompleted: number;
  };
}

const initialState: PomodoroState = {
  tasks: [],
  timer: {
    minutes: 25, // Default focus time
    seconds: 0,
    isRunning: false,
    mode: 'focus',
    sessionsCompleted: 0,
  },
};

export const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    // Add other reducers for timer control
    startTimer: (state) => {
    state.timer.isRunning = true;
  },
  pauseTimer: (state) => {
    state.timer.isRunning = false;
  },
  resetTimer: (state) => {
    state.timer.isRunning = false;
    state.timer.minutes = state.timer.mode === 'focus' ? 25 : 1;
    state.timer.seconds = 0;
  },
  switchMode: (state, action: PayloadAction<'focus' | 'break'>) => {
    state.timer.mode = action.payload;
    state.timer.minutes = action.payload === 'focus' ? 25 : 1;
    state.timer.seconds = 0;
    state.timer.isRunning = false;
  },
   updateMinutes: (state, action: PayloadAction<number>) => {
      state.timer.minutes = action.payload;
    },
    updateSeconds: (state, action: PayloadAction<number>) => {
      state.timer.seconds = action.payload;
    },
  },
});

export const { addTask, toggleTask, startTimer, pauseTimer, resetTimer, switchMode, updateMinutes, updateSeconds } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;