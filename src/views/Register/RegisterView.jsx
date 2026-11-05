'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from './components/StepIndicator';
import StepDatosPersonales from './components/StepDatosPersonales';
import StepInformacionAcademica from './components/StepInformacionAcademica';
import StepCuenta from './components/StepCuenta';
import Button from '../../components/Button';
import imagoTipo from '../../assets/ImagoTipo.png';

// Convierte el formData interno (camelCase, valores de UI) al contrato exacto
// que espera el backend para el registro.
const buildRegisterPayload = (formData) => ({
  cedula: Number(formData.cedula.replace(/\D/g, '')),
  nombre: formData.nombre,
  nombreDos: formData.nombre2,
  apellido: formData.apellido,
  apellidoDos: formData.apellido2,
  genero: formData.genero === 'Hombre', // true = Hombre, false = Mujer
  f_n: formData.fechaNacimiento ? new Date(formData.fechaNacimiento).toISOString() : null,
  correo: formData.email,
  clave: formData.password,
  profesion: formData.profesion ? Number(formData.profesion) : null,
  carreraId: formData.carrera ? Number(formData.carrera) : null,
  nacionalidad: formData.nacionalidad === 'V', // true = Venezolano, false = Extranjero
  // Código de país + número, todo junto en un solo string, ej. "+584246789009"
  telefono: formData.telefonoCodigo + formData.telefono.replace(/\D/g, '').replace(/^0/, ''),
});

const REQUIRED = 'Este campo es obligatorio';
const SELECT_REQUIRED = 'Selecciona una opción';

// Valida los campos requeridos de cada paso. Devuelve un objeto
// { nombreDeCampo: 'mensaje' } con solo los campos que fallaron.
const validateStep = (step, formData) => {
  const errors = {};

  if (step === 1) {
    if (!formData.nombre.trim()) errors.nombre = REQUIRED;
    if (!formData.apellido.trim()) errors.apellido = REQUIRED;
    if (!formData.cedula.trim()) errors.cedula = REQUIRED;
    if (!formData.genero) errors.genero = SELECT_REQUIRED;
    if (!formData.fechaNacimiento) errors.fechaNacimiento = 'Selecciona una fecha';
  }

  if (step === 2) {
    if (!formData.universidad) errors.universidad = SELECT_REQUIRED;
    if (!formData.carrera) errors.carrera = SELECT_REQUIRED;
  }

  if (step === 3) {
    if (!formData.email.trim()) errors.email = REQUIRED;
    if (!formData.password) errors.password = REQUIRED;
    if (!formData.confirmPassword) errors.confirmPassword = REQUIRED;
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.telefono.trim()) errors.telefono = REQUIRED;
  }

  return errors;
};

const RegisterView = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    nombre2: '',
    apellido: '',
    apellido2: '',
    nacionalidad: 'V',
    cedula: '',
    genero: '',
    fechaNacimiento: '',
    profesion: '',
    universidad: '',
    carrera: '',
    telefonoCodigo: '+58',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    if (step < 3) {
      setDirection('forward');
      setStep(step + 1);
      return;
    }

    const payload = buildRegisterPayload(formData);
    console.log('Payload para el backend:', payload);
    // TODO: reemplazar por la llamada real al backend cuando exista el endpoint de registro.
    alert('¡Registro completado con éxito!');
    router.push('/'); // Volver al inicio tras registro exitoso
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection('back');
      setErrors({});
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepDatosPersonales formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <StepInformacionAcademica formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <StepCuenta formData={formData} updateFormData={updateFormData} errors={errors} />;
      default:
        return <StepDatosPersonales formData={formData} updateFormData={updateFormData} errors={errors} />;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-teal-400 to-teal-600 py-20 px-6 overflow-hidden">
      {/* Formas decorativas difuminadas de fondo */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-10 w-80 h-80 bg-unievents-dark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center">
        <div className="max-w-xl w-full bg-unievents-bg p-6 sm:p-8 rounded-3xl shadow-2xl shadow-black/20 border border-white/20">
          {/* Logotipo Imagotipo */}
          <img src={imagoTipo.src} alt="UniEvent Full Logo" className="w-40 mx-auto mb-2" />

          {/* Encabezado del Formulario */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-black text-unievents-dark">Crear Cuenta</h2>
            <p className="text-gray-500 mt-1">Únete a la comunidad</p>
          </div>

          {/* Indicador de Progreso (Stepper) */}
          <StepIndicator currentStep={step} totalSteps={3} />

          {/* Renderizado Dinámico del Paso Actual, con transición direccional */}
          <div
            key={step}
            className={`min-h-[300px] mb-8 ${
              direction === 'forward' ? 'animate-step-in-right' : 'animate-step-in-left'
            }`}
          >
            {renderStep()}
          </div>

          {/* Controles de Navegación del Formulario */}
          <div className="flex gap-4">
            {step > 1 && (
              <Button variant="back" onClick={handleBack} className="flex-1">
                Atrás
              </Button>
            )}
            <Button onClick={handleNext} className="flex-[2]">
              {step === 3 ? 'Registrar' : 'Siguiente Paso'}
            </Button>
          </div>

          {/* Botón para volver al Inicio (Solo se muestra en el Paso 1) */}
          {step === 1 && (
            <div className="text-center mt-6">
              <button
                onClick={() => router.push('/')}
                className="text-unievents-teal font-bold hover:underline"
              >
                Volver al Inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisterView;
