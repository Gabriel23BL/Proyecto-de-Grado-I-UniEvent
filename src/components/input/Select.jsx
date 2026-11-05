'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Select custom con panel flotante (reemplaza el <select> nativo).
 * `onChange` recibe un evento sintético { target: { name, value } } para
 * poder usarse como reemplazo directo de un <select> nativo en los formularios.
 */
const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar',
  className = '',
  compact = false,
  ariaLabel,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((opt) => String(opt.value) === String(value));

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const optionList = (widthClass) => (
    <div
      className={`themed-scrollbar absolute z-20 top-full mt-2 ${widthClass} bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-60 overflow-y-auto origin-top transition-all duration-150 ease-out ${
        isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {options.map((opt) => {
        const isSelected = String(opt.value) === String(value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left whitespace-nowrap transition-colors cursor-pointer ${
              isSelected
                ? 'bg-teal-50 text-unievents-teal font-semibold'
                : 'text-unievents-dark hover:bg-gray-50'
            }`}
          >
            {opt.label}
            {isSelected && (
              <svg className="w-4 h-4 text-unievents-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );

  // Variante compacta: pensada para ir pegada a otro campo (ej. prefijo de un input).
  if (compact) {
    return (
      <div ref={containerRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={ariaLabel}
          className={`h-full flex items-center gap-1 pl-3 pr-2 text-sm font-bold outline-none cursor-pointer transition-colors ${className} ${
            isOpen ? 'bg-teal-50 text-unievents-teal' : 'bg-teal-50/60 text-unievents-teal hover:bg-teal-50'
          }`}
        >
          {selected ? selected.label : placeholder}
          <svg
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {optionList('left-0 min-w-[5rem]')}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`flex flex-col gap-1 w-full text-left ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-unievents-teal mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full flex items-center justify-between gap-2 p-3 rounded-lg border text-sm text-left transition-all outline-none cursor-pointer ${
            error
              ? 'border-red-500 bg-red-50'
              : isOpen
                ? 'border-unievents-teal ring-2 ring-teal-500 bg-white'
                : 'border-gray-300 hover:border-teal-300 bg-white'
          }`}
        >
          <span className={selected ? 'text-unievents-dark font-medium' : 'text-gray-400'}>
            {selected ? selected.label : placeholder}
          </span>
          <svg
            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-unievents-teal' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {optionList('left-0 right-0')}
      </div>

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Select;
