import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode; // Para aceitar qualquer nó React como filho
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

export default Label;