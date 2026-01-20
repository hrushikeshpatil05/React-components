import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">My Logo</div>
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "bar-open" : "bar"}></div>
          <div className={isOpen ? "bar-open" : "bar"}></div>
          <div className={isOpen ? "bar-open" : "bar"}></div>
        </div>
        <ul className={`nav-links${isOpen ? "-active" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
