import React from 'react';
import InputField from '../../../components/InputField';
import Select from '../../../components/input/Select';
import DatePicker from '../../../components/input/DatePicker';

const GENERO_OPTIONS = [
  { value: 'Mujer', label: 'Mujer' },
  { value: 'Hombre', label: 'Hombre' },
];

const NACIONALIDAD_OPTIONS = [
  { value: 'V', label: 'V-' },
  { value: 'E', label: 'E-' },
];

const StepDatosPersonales = ({ formData, updateFormData, errors = {} }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-unievents-dark mb-2">Datos personales</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Nombre"
          name="nombre"
          placeholder="Juan"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          required
        />
        <InputField
          label="Segundo nombre"
          name="nombre2"
          placeholder="Carlos"
          value={formData.nombre2}
          onChange={handleChange}
        />
        <InputField
          label="Apellido"
          name="apellido"
          placeholder="Pérez"
          value={formData.apellido}
          onChange={handleChange}
          error={errors.apellido}
          required
        />
        <InputField
          label="Segundo apellido"
          name="apellido2"
          placeholder="Gómez"
          value={formData.apellido2}
          onChange={handleChange}
        />
        {/* Cédula de identidad, con selector de nacionalidad (V-/E-) integrado */}
        <div className="flex flex-col gap-1 w-full text-left">
          <label htmlFor="cedula" className="text-sm font-semibold text-unievents-teal mb-1">
            Cédula de identidad
          </label>
          <div
            className={`flex rounded-lg border bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all ${
              errors.cedula ? 'border-red-500' : 'border-gray-300 focus-within:border-unievents-teal'
            }`}
          >
            <Select
              compact
              name="nacionalidad"
              value={formData.nacionalidad}
              onChange={handleChange}
              options={NACIONALIDAD_OPTIONS}
              className="rounded-l-lg border-r border-gray-300"
              ariaLabel="Nacionalidad"
            />
            <input
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="12.345.678"
              required
              className="flex-1 min-w-0 p-3 rounded-r-lg bg-white outline-none text-sm"
            />
          </div>
          {errors.cedula && <span className="text-xs text-red-500 mt-1">{errors.cedula}</span>}
        </div>

        <Select
          label="Género"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          options={GENERO_OPTIONS}
          error={errors.genero}
        />

        <div className="sm:col-span-2">
          <DatePicker
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            error={errors.fechaNacimiento}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default StepDatosPersonales;
