// src/components/pomodoro/TimerControls.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  startTimer, 
  pauseTimer, 
  resetTimer,
  switchMode 
} from '../../store/pomodoro/pomodoroSlice';
import './TimerControls.css'

const TimerControls = () => {
  const dispatch = useDispatch();
  const { isRunning, mode } = useSelector((state: RootState) => state.pomodoro.timer);

  return (
    <div className="timer-controls">
      <button 
        onClick={() => dispatch(isRunning ? pauseTimer() : startTimer())}
        className="control-button"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button 
        onClick={() => dispatch(resetTimer())}
        className="control-button"
      >
        Reset
      </button>
      <button 
        onClick={() => dispatch(switchMode(mode === 'focus' ? 'break' : 'focus'))}
        className="control-button"
      >
        Switch to {mode === 'focus' ? 'Break' : 'Focus'}
      </button>
    </div>
  );
};

export default TimerControls;