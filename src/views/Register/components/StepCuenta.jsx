import React from 'react';
import InputEmail from '../../../components/input/types/InputEmail';
import InputPassword from '../../../components/input/types/InputPassword';
import Select from '../../../components/input/Select';

// Códigos de país para el teléfono. Venezuela (+58) por defecto, al ser el
// público principal de la plataforma.
const PAIS_OPTIONS = [
  { value: '+58', label: '+58' },
  { value: '+57', label: '+57' },
  { value: '+51', label: '+51' },
  { value: '+593', label: '+593' },
  { value: '+54', label: '+54' },
  { value: '+56', label: '+56' },
  { value: '+52', label: '+52' },
  { value: '+55', label: '+55' },
  { value: '+34', label: '+34' },
  { value: '+1', label: '+1' },
];

const StepCuenta = ({ formData, updateFormData, errors = {} }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const passwordsMismatch =
    formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-unievents-dark mb-2">Crea tu cuenta</h3>

      <InputEmail
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <InputPassword
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <InputPassword
        label="Confirmar contraseña"
        name="confirmPassword"
        placeholder="**********"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword || (passwordsMismatch ? 'Las contraseñas no coinciden' : undefined)}
        required
      />

      {/* Teléfono, con selector de código de país integrado */}
      <div className="flex flex-col gap-1 w-full text-left">
        <label htmlFor="telefono" className="text-sm font-semibold text-unievents-teal mb-1">
          Teléfono
        </label>
        <div
          className={`flex rounded-lg border bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all ${
            errors.telefono ? 'border-red-500' : 'border-gray-300 focus-within:border-unievents-teal'
          }`}
        >
          <Select
            compact
            name="telefonoCodigo"
            value={formData.telefonoCodigo}
            onChange={handleChange}
            options={PAIS_OPTIONS}
            className="rounded-l-lg border-r border-gray-300"
            ariaLabel="Código de país"
          />
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="424-3540261"
            required
            className="flex-1 min-w-0 p-3 rounded-r-lg bg-white outline-none text-sm"
          />
        </div>
        {errors.telefono && <span className="text-xs text-red-500 mt-1">{errors.telefono}</span>}
      </div>
    </div>
  );
};

export default StepCuenta;
