import React from 'react';

const InputEmail = ({ label = "Correo electrónico", value, onChange, placeholder = "ejemplo@ejemplo.com", error }) => {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label className="text-sm font-semibold text-unievents-teal mb-1">
          {label}
        </label>
      )}
      
      <input
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default InputEmail;
