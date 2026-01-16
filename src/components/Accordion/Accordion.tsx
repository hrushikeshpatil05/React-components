import { useState } from "react";
import './accordion.css';

export default function Accordion() {

    const [toggleButton, setToggleButton] = useState(false);

    const toggleAccordion = () => {
        setToggleButton(!toggleButton);
    }

    return( <div className="accordion-wrapper">
        <div className="accordion-contianer">
            <div className="accordion-header" onClick={toggleAccordion}>
                <h2>This is an Accordion</h2>
                <button className="toggle-btn">{!toggleButton ? `+` : `-`}</button>
            </div>
            {toggleButton && <div className="accrodion-content">
                <p>This is an accordion content made by Hrushikeh Patil What is remaining is mostly layout refinement and CSS fixes. 
                    Right now, your CSS actually contradicts your React code (you have display: none in CSS, but you're also using in JS), and your wrapper units have a small typo.</p>
            </div>
            }
        </div>
    </div>
    )
}