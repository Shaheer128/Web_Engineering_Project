


// 2nd

// PomodoroTimer.tsx
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import TimerControls from './TimerControls';
import { updateMinutes, updateSeconds } from '../../store/pomodoro/pomodoroSlice';
import './PomodoroTimer.css';

export const PomodoroTimer = () => {
  const { minutes, seconds, mode, isRunning } = useSelector((state: RootState) => state.pomodoro.timer);
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  const playNotification = () => {
    audioRef.current?.play()
      .catch(e => console.error("Audio playback failed:", e));
  };

  // Timer logic
  useEffect(() => {
    if (!isRunning) return; // Don't run if timer is paused

    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // Timer completed
          playNotification();
          clearInterval(timer);
          return;
        }
        // Decrease minute
        dispatch(updateMinutes(minutes - 1));
        dispatch(updateSeconds(59));
      } else {
        dispatch(updateSeconds(seconds - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, isRunning, dispatch]);

  return (
    <div className={`pomodoro-timer ${mode}`}>
      <h3>{mode === 'focus' ? 'Focus Time' : 'Break Time'}</h3>
      <div className="time-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <TimerControls />
      <audio ref={audioRef} src="\sound\timer-complete.wav" preload="auto" />
    </div>
  );
};