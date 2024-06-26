import React from 'react';

interface ButtonProps {
    onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className="button">Поиск</button>
    );
};

export default Button;
