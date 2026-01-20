import { useState, memo, useCallback } from "react";

import "./ToDoList.css";

interface Task {
  id: number;
  value: string;
}


const TodoItem = memo(
  ({
    task,
    isEditing,
    editText,
    onEditChange,
    onEdit,
    onDelete,
    onSave,
    onCancelEdit,
  }: {
    task: Task;
    isEditing: boolean;
    editText: string;
    onEditChange: (val: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onSave: (id: number) => void;
    onCancelEdit: () => void;
  }) => {
    return (
      <li className="to-do-list-item">
        {isEditing ? (
          <div className="to-do-list-edit-container">
            <input
              className="inline-edit-input"
              value={editText}
              onChange={(e) => onEditChange(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && onSave(task.id)}
              aria-label="Edit task"
            />
            <div className="action-items">
              <button
                className="save-btn"
                onClick={() => onSave(task.id)}
                aria-label="Save changes"
              >
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={onCancelEdit}
                aria-label="Cancel edit"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <span>{task.value}</span>
            <div className="action-items">
              <button onClick={() => onEdit(task)} aria-label="Edit task">
                Edit
              </button>
              <button onClick={() => onDelete(task.id)} aria-label="Delete task">
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    );
  },
);

export default function ToDoList() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleClick = useCallback(() => {
    if (value.trim() === "") return;
    const newItem = {
      id: Date.now() + Math.random(),
      value: value,
    };
    setTasks((prevItems) => [...prevItems, newItem]);
    setValue("");
  }, [value]);

  const handleDelete = useCallback((taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setEditId(task.id);
    setEditText(task.value);
  }, []);

  const handleSave = useCallback(
    (id: number) => {
      setTasks((prev) =>
        prev.map((i) => (i.id === id ? { ...i, value: editText } : i)),
      );
      setEditId(null);
    },
    [editText],
  );

  const handleCancelEdit = useCallback(() => {
    setEditId(null);
  }, []);

  return (
    <>
      <div className="to-do-list-wrapper">
        <div className="to-do-list-container">
          <input
            type="text"
            placeholder="Add todo item"
            value={value}
            className="to-do-list-input"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            aria-label="Add new task"
          ></input>
          <button
            className="to-do-list-add-btn"
            onClick={handleClick}
            aria-label="Add item to list"
          >
            Add Item to list
          </button>
        </div>
        <div className="to-do-list-items">
          <ul>
            {tasks.length === 0 ? (
              <p className="empty-message">No items to show</p>
            ) : (
              tasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  isEditing={editId === task.id}
                  editText={editText}
                  onEditChange={setEditText}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSave={handleSave}
                  onCancelEdit={handleCancelEdit}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
