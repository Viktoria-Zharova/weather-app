import React from 'react';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyUp: () => void;
}

const Input: React.FC<InputProps> = ({ value, onChange, onKeyUp }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyUp={onKeyUp}
            placeholder="Введите название города"
            className="input"
        />
    );
};

export default Input;
