import React from 'react';

interface InputProps {
    id: string;
    name: string;
    type?: string; // Optional, defaults to text
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, name, type = 'text', value, onChange }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="border rounded-md p-2 w-full"
        />
    );
};

export default Input;
