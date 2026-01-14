import { useId } from 'react';

type ControlProps = {
    mode: string;
    onChangeMode: (mode: string) => void;
};

export default function Control({ mode, onChangeMode }: ControlProps) {
    const id = useId();
    return (
        <div className="controls">
            <label htmlFor={id}>Sort</label>
            <select
                id={id}
                value={mode}
                onChange={(e) => onChangeMode(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
    )
}