import React, { useState, useEffect } from 'react';
import './App.css';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle, FaClipboardList } from 'react-icons/fa';

function App() {
  // --- STATE'LER ---

  // 2. Başlangıçta görevleri localStorage'dan yükle
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return []; // Eğer kayıtlı görev yoksa boş bir diziyle başla
    }
  });

  const [inputValue, setInputValue] = useState('');

  // --- EFFECT ---

  // 3. 'tasks' state'i her değiştiğinde bu kod çalışır
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  // --- FONKSİYONLAR ---

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">
      <div className="header">
        <FaClipboardList className="header-icon" />
        <h1 className="app-title">Yapılacaklar Listesi</h1>
      </div>
      
      {tasks.length > 0 && (
        <div className="stats">
          <span className="stat-item">
            <strong>{tasks.filter(t => t.completed).length}</strong> Tamamlandı
          </span>
          <span className="stat-item">
            <strong>{tasks.filter(t => !t.completed).length}</strong> Bekliyor
          </span>
        </div>
      )}

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="task-input"
          placeholder="Yeni bir görev ekle..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-task-btn">
          <FaPlus />
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <FaClipboardList className="empty-icon" />
          <p>Henüz görev eklemediniz</p>
          <p className="empty-subtitle">Yukarıdaki alandan yeni görev ekleyebilirsiniz</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div 
                className="task-content"
                onClick={() => handleToggleComplete(task.id)}
              >
                {task.completed ? (
                  <FaCheckCircle className="task-icon completed-icon" />
                ) : (
                  <FaRegCircle className="task-icon" />
                )}
                <p className="task-text">{task.text}</p>
              </div>
              <button
                className="delete-task-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
                title="Görevi Sil"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="footer">
        <p className="footer-text">
          <strong>Ramazan Solak</strong> tarafından kodlanmıştır
        </p>
        <p className="footer-year">© 2025</p>
      </footer>
    </div>
  );
}

export default App;

