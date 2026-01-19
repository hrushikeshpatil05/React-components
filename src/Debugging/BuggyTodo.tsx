import { useState } from 'react';
import './BuggyTodo.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const BuggyTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed'>('all');


  const handleAdd = () => {
    if (!input) return;
    const newTodo = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };


  const handleToggle = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      // We force a re-render here by creating a new array reference
      // BUT we already mutated the object inside the array above. 
      // While this *might* update the UI, it's bad practice (mutation).
      setTodos([...todos]);
    }
  };

  // Filtering logic
  const visibleTodos = todos.filter(t => {
    if (filter === 'all') return true;

    if (filter === 'completed') return !t.completed;
    return true;
  });

  return (
    <div className="buggy-todo-container">
      <h2>🐞 Buggy Todo List</h2>
      <p className="instruction">Goal: Fix the 3 bugs so items render, toggle, and filter correctly.</p>

      <div className="input-group">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      <ul className="todo-list">
        {visibleTodos.length === 0 && <li className="empty-msg">No items visible</li>}
        {visibleTodos.map(t => (
          <li key={t.id} className={t.completed ? 'completed' : ''} onClick={() => handleToggle(t.id)}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
