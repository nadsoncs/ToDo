import {
  Trash,
  Circle,
  Check
} from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  id: string;
  description: string;
  status: 'open' | 'closed';
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function Task ({id, description, status, onDeleteTask, onToggleStatus}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }
  function handleToggleStatus() {
    onToggleStatus(id)
  }
  return (
    <div className={styles.container}>
      {
        status === 'open' ?
        <button className={styles.check} onClick={handleToggleStatus}>
          
        </button>
        :
        <button className={styles.done} onClick={handleToggleStatus}>
          <Check size={16} />
        </button>
      }


      <p className={status==='closed' ? styles.through: ''}>{description}</p>
      
      <button className={styles.trash}>
        <Trash size={24} onClick={handleDeleteTask} />
      </button>
    </div>
  );
}