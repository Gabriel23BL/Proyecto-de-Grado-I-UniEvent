import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Etiqueta del campo si se proporciona */}
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-unievents-dark">
          {label}
        </label>
      )}
      
      {/* Campo de entrada principal */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-unievents-teal focus:border-unievents-teal outline-none transition-all ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      
      {/* Mensaje de error si existe */}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
