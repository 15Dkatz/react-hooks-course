import React, { useState, useEffect, useReducer } from 'react';
import uuid from 'uuid/v4';

const initialTasksState = {
  tasks: [],
  completedTasks: []
};

const TYPES = {
  ADD_TASK: 'ADD_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

const tasksReducer = (state, action) => {
  console.log('state', state, 'action', action);

  switch(action.type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      }
    case TYPES.COMPLETE_TASK:
      const { completedTask } = action;

      return {
        ...state,
        completedTasks: [...state.completedTasks, completedTask],
        tasks: state.tasks.filter(t => t.id !== completedTask.id)
      }
    case TYPES.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(t => t.id !== action.task.id)
      }
    default:
      return state;
  }
}

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (taskMap) => {
  localStorage.setItem(
    TASKS_STORAGE_KEY,
    JSON.stringify(taskMap)
  );
}

const readStoredTasks = () => {
  const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

  return tasksMap ? tasksMap : initialTasksState;
}

function Tasks() {
  const [taskText, setTaskText] = useState('');
  const storedTasks = readStoredTasks();

  const [state, dispatch] = useReducer(tasksReducer, storedTasks);
  const { tasks, completedTasks } = state;

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

  const updateTaskText = event => {
    setTaskText(event.target.value);
  }

  const addTask = () => {
    dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid() } });
  }

  const completeTask = completedTask => () => {
    dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
  }

  const deleteTask = task => () => {
    dispatch({ type: TYPES.DELETE_TASK, task });
  }

  return (
    <div>
      <h3>Tasks</h3>
      <div className='form'>
        <input value={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='task-list'>
        {
          tasks.map(task => {
            const { id, taskText } = task;

            return (
              <div key={id} onClick={completeTask(task)}>
                {taskText}
              </div>
            );
          })
        }
      </div>
      <div className='completed-list'>
        {
          completedTasks.map(task => {
            const { id, taskText } = task;

            return (
              <div key={id}>
                {taskText}{' '}
                <span onClick={deleteTask(task)} className='delete-task'>x</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Tasks;
