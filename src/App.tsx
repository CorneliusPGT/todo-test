import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type TaskType = {
  text: string,
  isDone: boolean
}
type TaskFilter = 'all' | 'done' | 'undone'

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [value, setValue] = useState<string>('')
  const [filter, setFilter] = useState<TaskFilter>('all')

  const visibleTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'done') return task.isDone;
    if (filter === 'undone') return !task.isDone;
  });
  const doneCount = tasks.filter(task => task.isDone).length;

  const addTask = () => {
    if (value === '') return;
    const newTask: TaskType = {
      text: value,
      isDone: false,
    }
    setTasks([...tasks, newTask])
    setValue('')
  }
  const toggleDone = (index: number) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, isDone: true } : task
    );
    setTasks(newTasks);
  };
  const clearDone = () => {
    const clearedTasks = tasks.filter((t) => t.isDone !== true)
    setTasks(clearedTasks)
  }

  return (
    <div className="App">
      <input placeholder={'Новая задача'} value={value} type="text" onChange={(e) => setValue(e.target.value)} /><button onClick={() => addTask()}>Добавить</button>
      <div className='tasks'>
        {visibleTasks.map((t, i) => {
          return <div className='task-block'>
            <div className='task-block__inside'>
              <button onClick={() => toggleDone(i)
              }>✓</button>
              <p className={t.isDone ? 'done' : ''}>{t.text}</p>
            </div>
          </div>
        })}
      </div>
      <div className="bottom">
        <p>Осталось задач: {tasks.length - doneCount}</p>
        <div className="filters">
          <button
            data-testid="filter-all"
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            data-testid="filter-undone"
            className={filter === 'undone' ? 'active' : ''}
            onClick={() => setFilter('undone')}
          >
            Активные
          </button>
          <button
            data-testid="filter-done"
            className={filter === 'done' ? 'active' : ''}
            onClick={() => setFilter('done')}
          >
            Выполненные
          </button>
        </div>

        <button onClick={() => clearDone()}>Очистить выполненные задачи</button>
      </div>
    </div>
  );
}

export default App;
