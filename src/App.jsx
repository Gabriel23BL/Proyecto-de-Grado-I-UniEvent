import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/Home/HomeView';
import LoginView from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';
import RecoverPasswordView from './views/RecoverPassword/RecoverPasswordView';
import CatalogView from './views/Catalog/CatalogView';
import Dashboard from './views/Student/Dashboard/Dashboard';
import './App.css';

function App() {
  // Estado que controla qué vista se muestra actualmente
  const [view, setView] = useState('home'); // 'home', 'login', 'register', 'recover', 'cursos', 'eventos', 'student-dashboard'

  const isDashboardView = view === 'student-dashboard';

  return (
    <div className="min-h-screen bg-unievents-bg text-gray-900 flex flex-col">
      {/* El Navbar recibe la función setView para permitir la navegación global */}
      {!isDashboardView && <Navbar onNavigate={setView} />}

      {/* Contenedor principal donde se inyectan las diferentes vistas */}
      <main className="flex-grow">
        {view === 'login' ? (
          <LoginView
            onBack={() => setView('home')}
            onRecover={() => setView('recover')}
            onRegister={() => setView('register')}
            onLoginSuccess={() => setView('student-dashboard')}
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
        ) : view === 'student-dashboard' ? (
          <Dashboard onLogout={() => setView('home')} />
        ) : (
          <HomeView onNavigate={setView} />
        )}
      </main>

      {/* Pie de página global persistente */}
      {!isDashboardView && <Footer />}
    </div>
  );
}

export default App;
