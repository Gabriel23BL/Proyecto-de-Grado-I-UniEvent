'use client';

import React, { useEffect, useRef, useState } from 'react';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const DIAS_SEMANA = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const pad2 = (n) => String(n).padStart(2, '0');
const toValue = (year, month, day) => `${year}-${pad2(month + 1)}-${pad2(day)}`;

// Días del mes anterior/actual/siguiente necesarios para completar la grilla
// de semana empezando en lunes.
const buildGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  // getDay(): 0=domingo..6=sábado -> lo convertimos a offset con lunes=0
  const offset = (firstDay.getDay() + 6) % 7;

  const cells = [];
  for (let i = offset; i > 0; i--) {
    cells.push({ day: daysInPrevMonth - i + 1, inMonth: false, month: month - 1, year });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, inMonth: true, month, year });
  }
  while (cells.length % 7 !== 0) {
    const day = cells.length - (offset + daysInMonth) + 1;
    cells.push({ day, inMonth: false, month: month + 1, year });
  }
  return cells;
};

/**
 * Selector de fecha con calendario propio (reemplaza <input type="date">),
 * ya que el popup nativo del navegador no se puede re-estilizar con CSS.
 * `value`/`onChange` usan el mismo formato "YYYY-MM-DD" que un input nativo,
 * así que es intercambiable con el resto del formulario sin tocar el payload.
 */
const DatePicker = ({
  label,
  name,
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
  required = false,
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;
  const today = new Date();

  const [viewYear, setViewYear] = useState((selectedDate ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((selectedDate ?? today).getMonth());

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Al abrir, centra el calendario en la fecha ya seleccionada (si hay).
  const handleToggle = () => {
    if (!isOpen && selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
    setIsOpen((prev) => !prev);
  };

  const handlePick = (day, month, year) => {
    onChange({ target: { name, value: toValue(year, month, day) } });
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
    setIsOpen(false);
  };

  const handleToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    handlePick(today.getDate(), today.getMonth(), today.getFullYear());
  };

  const years = Array.from({ length: 100 }, (_, i) => today.getFullYear() - i);
  const grid = buildGrid(viewYear, viewMonth);

  const goToMonth = (delta) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  const displayValue = selectedDate
    ? `${pad2(selectedDate.getDate())}/${pad2(selectedDate.getMonth() + 1)}/${selectedDate.getFullYear()}`
    : '';

  const isSelected = (cell) =>
    selectedDate &&
    cell.day === selectedDate.getDate() &&
    cell.month === selectedDate.getMonth() &&
    cell.year === selectedDate.getFullYear();

  const isToday = (cell) =>
    cell.day === today.getDate() && cell.month === today.getMonth() && cell.year === today.getFullYear();

  return (
    <div ref={containerRef} className={`flex flex-col gap-1 w-full text-left ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-unievents-teal mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          id={name}
          onClick={handleToggle}
          aria-required={required}
          className={`w-full flex items-center justify-between gap-2 p-3 rounded-lg border bg-white text-sm text-left transition-all outline-none cursor-pointer ${
            error
              ? 'border-red-500 bg-red-50'
              : isOpen
                ? 'border-unievents-teal ring-2 ring-teal-500'
                : 'border-gray-300 hover:border-teal-300'
          }`}
        >
          <span className={displayValue ? 'text-unievents-dark font-medium' : 'text-gray-400'}>
            {displayValue || placeholder}
          </span>
          <svg className="w-4 h-4 text-unievents-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Panel del calendario */}
        <div
          className={`absolute z-20 left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 origin-top transition-all duration-150 ease-out ${
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {/* Navegación de mes/año */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-unievents-teal hover:bg-teal-50 transition-colors cursor-pointer"
              aria-label="Mes anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="text-sm font-bold text-unievents-dark bg-transparent outline-none cursor-pointer"
              >
                {MESES.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="themed-scrollbar text-sm font-bold text-unievents-dark bg-transparent outline-none cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => goToMonth(1)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-unievents-teal hover:bg-teal-50 transition-colors cursor-pointer"
              aria-label="Mes siguiente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-1 select-none">
            {DIAS_SEMANA.map((d, i) => <span key={`${d}-${i}`}>{d}</span>)}
          </div>

          {/* Grilla de días */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {grid.map((cell, i) => {
              const selected = isSelected(cell);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePick(cell.day, cell.month, cell.year)}
                  className={`aspect-square flex items-center justify-center rounded-lg font-semibold transition-all cursor-pointer ${
                    selected
                      ? 'bg-unievents-teal text-white shadow-sm'
                      : cell.inMonth
                        ? `text-unievents-dark hover:bg-teal-50 ${isToday(cell) ? 'ring-1 ring-inset ring-teal-300' : ''}`
                        : 'text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Acciones rápidas */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-xs font-bold text-unievents-teal hover:underline cursor-pointer"
            >
              Hoy
            </button>
          </div>
        </div>
      </div>

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default DatePicker;
