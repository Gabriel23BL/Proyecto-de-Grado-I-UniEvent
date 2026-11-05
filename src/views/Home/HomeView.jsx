'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Hero from './components/Hero';
import Button from '../../components/Button';
import EventsBoard from '../Catalog/components/EventsBoard';

/**
 * Vista de Inicio (HomeView).
 * Incorpora la sección Hero, la tarjeta decorativa del catálogo en vivo y los eventos en miniatura.
 */
const HomeView = () => {
  const router = useRouter();
  return (
    <>
      {/* Sección Hero */}
      <Hero />

      {/* Sección de Acción / Llamado al Registro */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-unievents-bg">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6 text-left">
                  <span className="inline-block text-unievents-teal font-bold uppercase tracking-widest text-sm">
                    Únete ahora
                  </span>
                  <h2 className="text-4xl font-black text-unievents-dark leading-tight">Comienza tu viaje hoy</h2>
                  <p className="text-xl text-gray-600">Únete a la plataforma líder en gestión de eventos académicos.</p>
                  <Button onClick={() => router.push('/register')} className="!px-10 !py-4 text-xl shadow-xl shadow-teal-100 hover:scale-105 transition-transform">
                    Crear Cuenta Gratis
                  </Button>
               </div>

               {/* Tarjeta decorativa del Home */}
               <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-2xl hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-video bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl mb-4 flex items-center justify-center text-unievents-teal relative overflow-hidden">
                    <svg className="w-20 h-20 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-unievents-dark text-left">Eventos en Vivo</h3>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Activo
                    </span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cartelera de Eventos (Versión Miniatura para el Inicio) */}
      <EventsBoard limit={3} />
    </>
  );
};

export default HomeView;
