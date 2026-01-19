import { useState } from "react";

import "./ToDoList.css";

interface Task {
  id: number;
  value: string;
}

export default function ToDoList() {
  const [value, setValue] = useState("");
  const [item, setItem] = useState<Task[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleClick = () => {
    if (value.trim() === "") return;
    const newItem = {
      id: Date.now(),
      value: value,
    };
    setItem((prevItems) => [...prevItems, newItem]);
    setValue("");
  };

  const handleDelete = (idOfItem: number) => {
    setItem((prevItem) => prevItem.filter((item) => item.id != idOfItem));
  };

  const handleEdit = (task: Task) => {
    setEditId(task.id);
    setEditText(task.value);
  };

  const handleSave = (id: number) => {
    setItem((prev) =>
      prev.map((i) => (i.id === id ? { ...i, value: editText } : i)),
    );
    setEditId(null);
  };

  return (
    <>
      <div className="to-do-list-wrapper">
        <div className="to-do-list-contianer">
          <input
            type="text"
            placeholder="Add todo item"
            value={value}
            className="to-do-list-input"
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button className="to-do-list-add-btn" onClick={handleClick}>
            Add Item to list
          </button>
        </div>
        <div className="to-do-list-items">
          <ul>
            {item.map((item) => (
              <div className="to-do-list-item" key={item.id}>
                {editId === item.id ? (
                  <div className="to-do-list-edit-container">
                    <input
                      className="inline-edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSave(item.id)
                      }
                    />
                    <div className="action-items">
                      <button
                        className="save-btn"
                        onClick={() => handleSave(item.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <li>{item.value}</li>
                    <div className="action-items">
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
