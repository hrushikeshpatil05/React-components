import { useState } from "react";

import "./ToDoList.css";

interface Task {
  id: number;
  value: string;
}

export default function ToDoList() {
  const [value, setValue] = useState("");
  const [item, setItem] = useState<Task[]>([]);

  const handleClick = () => {
    if (value.trim() === "") return;
    const newItem = {
      id: Date.now(),
      value: value,
    };
    setItem((prevItems) => [...prevItems, newItem]);
    setValue("");
  };

  const handleDelete = (idOfItem:number) => {
    setItem((prevItem) => (
        prevItem.filter((item) => (item.id != idOfItem)) 
    ));
  }

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
          <button className="to-do-list-add-btn" onClick={handleClick}>Add Item to list</button>
        </div>
        <div className="to-do-list-items">
          <ul>
            {item.map((item) => (
              <div className="to-do-list-item" key={item.id}>
                <li>{item.value}</li>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
