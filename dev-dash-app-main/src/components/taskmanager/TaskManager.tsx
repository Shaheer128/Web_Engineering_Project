// TaskManager.tsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addTask, toggleTask } from '../../store/pomodoro/pomodoroSlice';
import { PomodoroTimer } from '../pomodorotimer/PomodoroTimer';
import './TaskManager.css'

 export const TaskManager = () => {
  const [newTask, setNewTask] = useState('');
  const tasks = useSelector((state: RootState) => state.pomodoro.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask('');
    }
  };

  return (
    <div className='widget-parent'>
            <div className="widget">
    <div className="task-manager">
      <h3>Tasks</h3>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
        />
        <button className='control-button' onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
    <PomodoroTimer />
    </div>
    </div>
  );
};