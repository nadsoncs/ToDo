import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import './global.css';

import styles from './App.module.css';
import { PlusCircle } from 'phosphor-react';
import { Task } from './components/Task';
import { useState, ChangeEvent, FormEvent, InvalidEvent, } from 'react';
import Clipboard from '/src/assets/clipboard.png';

interface Task {
  id: string;
  description: string;
  status: 'open' | 'closed'
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleNewTaskChange (event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    console.log('aqui')
    setTasks([...tasks, {
      id: uuidv4(),
      description: newTask,
      status: 'open'
    }]);

    setNewTask('');
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    })

    setTasks(tasksWithoutDeletedOne);
  }

  function toggleStatusTask(id: string) {
    const tasksUpdated: Task[] = tasks.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          description: task.description,
          status: task.status === 'open' ? 'closed' : 'open'
        }
      } else {
        return task
      }
    })

    setTasks(tasksUpdated)
  }

  const isTasksEmpty = tasks.length === 0;
  const totalTasks = tasks.length;
  const countTasksDone = tasks.filter(task => task.status === 'closed').length;
  return (
    <div>
      <Header/>

      <main className={styles.wrapper}>
        <form className={styles.newTaskForm} onSubmit={handleCreateNewTask}>
          <input 
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            value={newTask}
          />
          <button type="submit" >
            Criar
            <PlusCircle size={16}/>
          </button>
        </form>
        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.created}>
              Tarefas criadas <span>{totalTasks}</span>
            </div>
            <div className={styles.done}>
              Concluídas <span>{isTasksEmpty ? totalTasks : `${countTasksDone} de ${totalTasks}` }</span>
            </div>        
          </div>
          <div className={styles.tasksList}>
            {
              isTasksEmpty ? (
                <div className={styles.tasksEmpty}>
                  <img src={Clipboard} alt="" />
                  <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
                
              ) : (
                tasks.map( task => {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      description={task.description}
                      status={task.status}
                      onDeleteTask={deleteTask}
                      onToggleStatus={toggleStatusTask}
                    />
                  )
                })
              )
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
