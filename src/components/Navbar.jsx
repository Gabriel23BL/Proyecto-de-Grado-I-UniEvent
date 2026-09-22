'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import isoTipo from '../assets/IsoTipo.png';
import Button from './Button';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Función para navegar y cerrar el menú móvil (usada por el Button de Inicia Sesión)
  const handleNavigate = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  // Función para cerrar el menú móvil al navegar
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-unievents-bg/90 backdrop-blur-md shadow-sm border-b border-teal-900/5 sticky top-0 z-50 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logotipo interactivo con IsoTipo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          onClick={closeMenu}
        >
          <img src={isoTipo.src} alt="UniEvent Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-unievents-teal tracking-tight">
            UniEvent
          </span>
        </Link>

        {/* Botón Menú Hamburguesa (Móvil) */}
        <button 
          className="md:hidden text-unievents-teal focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Enlaces de Navegación (Escritorio) */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/cursos"
            className="text-gray-600 hover:text-unievents-teal font-medium transition"
          >
            Cursos
          </Link>
          <Link
            href="/eventos"
            className="text-gray-600 hover:text-unievents-teal font-medium transition"
          >
            Eventos
          </Link>
          <Link
            href="/register"
            className="text-gray-600 hover:text-unievents-teal font-medium transition"
          >
            Regístrate
          </Link>

          <Button
            variant="primary"
            className="!px-5 !py-2 shadow-md"
            onClick={() => handleNavigate('/login')}
          >
            Inicia Sesión
          </Button>
        </div>
      </div>

      {/* Menú Desplegable (Móvil) con animación de 1 segundo */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-[1000ms] ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-4 pb-4">
          <Link
            href="/cursos"
            className="text-left text-gray-600 hover:text-unievents-teal font-medium py-2 border-b border-gray-100"
            onClick={closeMenu}
          >
            Cursos
          </Link>
          <Link
            href="/eventos"
            className="text-left text-gray-600 hover:text-unievents-teal font-medium py-2 border-b border-gray-100"
            onClick={closeMenu}
          >
            Eventos
          </Link>
          <Link
            href="/register"
            className="text-left text-gray-600 hover:text-unievents-teal font-medium py-2 border-b border-gray-100"
            onClick={closeMenu}
          >
            Regístrate
          </Link>

          <Button
            variant="primary"
            className="w-full !py-3 shadow-md"
            onClick={() => handleNavigate('/login')}
          >
            Inicia Sesión
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
