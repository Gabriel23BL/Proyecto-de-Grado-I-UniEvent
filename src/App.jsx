import { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/Home/HomeView';
import LoginView from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';
import RecoverPasswordView from './views/RecoverPassword/RecoverPasswordView';
import CatalogView from './views/Catalog/CatalogView';
import './App.css';

function App() {
  // Estado que controla qué vista se muestra actualmente
  const [view, setView] = useState('home'); // 'home', 'login', 'register', 'recover', 'cursos', 'eventos'

  return (
    <div className="min-h-screen bg-unievents-bg text-gray-900 flex flex-col">
      {/* El Navbar recibe la función setView para permitir la navegación global */}
      <Navbar onNavigate={setView} />

      {/* Contenedor principal donde se inyectan las diferentes vistas */}
      <main className="flex-grow">
        {view === 'login' ? (
          <LoginView 
            onBack={() => setView('home')} 
            onRecover={() => setView('recover')} 
            onRegister={() => setView('register')} 
          />
        ) : view === 'recover' ? (
          <RecoverPasswordView onBack={() => setView('login')} />
        ) : view === 'register' ? (
          <RegisterView onBack={() => setView('home')} />
        ) : view === 'cursos' || view === 'eventos' ? (
          <CatalogView 
            key={view} 
            type={view === 'cursos' ? 'curso' : 'evento'} 
          />
        ) : (
          <HomeView onNavigate={setView} />
        )}
      </main>

      {/* Pie de página persistente */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 bg-white">
        <p>© 2026 UniEvent. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
