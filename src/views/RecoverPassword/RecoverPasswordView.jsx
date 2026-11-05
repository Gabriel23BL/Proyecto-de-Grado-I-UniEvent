'use client';

import { useRouter } from 'next/navigation';
import Button from '../../components/Button';
import imagoTipo from '../../assets/ImagoTipo.png';

const RecoverPasswordView = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 py-20 px-6 overflow-hidden">
      {/* Formas decorativas difuminadas de fondo */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-10 w-80 h-80 bg-unievents-dark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative bg-unievents-bg p-8 rounded-2xl shadow-2xl shadow-black/20 border border-white/20 w-full max-w-md text-center">
        {/* Logotipo Imagotipo */}
        <img src={imagoTipo.src} alt="UniEvent Full Logo" className="w-40 mx-auto mb-2" />
        <p className="text-gray-600 mb-8 font-medium">Recuperar contraseña</p>

        {/* Formulario de Recuperación */}
        <form className="space-y-6 text-left">
          <div>
            <label className="block text-unievents-teal font-semibold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@ejemplo.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full !py-3 shadow-md">
            Enviar enlace de recuperación
          </Button>
        </form>

        {/* Enlace de retorno al flujo de acceso */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-unievents-teal font-bold hover:underline flex items-center justify-center w-full"
          >
            <span className="mr-2">←</span> Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordView;
