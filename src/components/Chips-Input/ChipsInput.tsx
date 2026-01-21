import React, { useState, useEffect } from "react";
import './ChipsInput.css'
function ChipsInput() {

  const [tag, setTag] = useState<string[]>(() => {
    const saved = localStorage.getItem("chips");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chips", JSON.stringify(tag));
  }, [tag]);
  const [value, setValue] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      const newTag = value.trim();
      if (newTag !== "") {
        if (!tag.includes(newTag)) {
          setTag([...tag, newTag]);
        }
      }
      else {
        setValue("");
      }
    }
  }

  const handleClick = (value: string) => {
    setTag(tag.filter((val) => val !== value))
  }

  const listOfChips = (val: string, idx: number) => {
    return (
      <div className="chips" key={idx}>
        <div className="chips-item">{val}</div>
        <button className="chips-btn" onClick={() => handleClick(val)}>X</button>
      </div >
    );
  }

  return (
    <div className='main-container'>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        className="input"
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
        onKeyDown={handleKeyDown}
      />
      <div className="chips-wrapper">
        {tag.map((item, idx) => (listOfChips(item, idx)))}
      </div>
    </div>
  );
}

export default ChipsInput;