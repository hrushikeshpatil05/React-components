import { useState } from "react";
import './popover.css';

export default function Popover() {
    const [open, setOpen] = useState(false);
    const content = 'This is a popover content, make use of close modal button to close the modal';

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className="popover">
            <button onClick={handleClick}>Open popover</button>
            {open && <div className="popover-content-wrapper" onClick={handleClick}>
                <div className="popover-content" onClick={(e) => e.stopPropagation()}>
                    <p>{content}</p>
                    <button onClick={handleClick}>Close Modal</button>
                </div>
            </div>
            }
        </div>
    )
}