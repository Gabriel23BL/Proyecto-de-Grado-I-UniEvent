import React from 'react';
import Select from '../../../components/input/Select';

// TODO: catálogos provisionales con IDs inventados — reemplazar por los
// catálogos reales del backend (profesiones/carreras/universidades) cuando exista un endpoint.
const PROFESION_OPTIONS = [
  { value: 1, label: 'Ingeniero de Sistemas' },
  { value: 2, label: 'Ingeniero Industrial' },
  { value: 3, label: 'Licenciado en Administración' },
  { value: 4, label: 'Médico' },
  { value: 5, label: 'Abogado' },
  { value: 6, label: 'Contador Público' },
  { value: 7, label: 'Arquitecto' },
  { value: 8, label: 'Diseñador Gráfico' },
  { value: 9, label: 'Docente' },
  { value: 10, label: 'Otra' },
];

const CARRERA_OPTIONS = [
  { value: 1, label: 'Ingeniería de Sistemas' },
  { value: 2, label: 'Ingeniería Industrial' },
  { value: 3, label: 'Administración de Empresas' },
  { value: 4, label: 'Medicina' },
  { value: 5, label: 'Derecho' },
  { value: 6, label: 'Contaduría Pública' },
  { value: 7, label: 'Arquitectura' },
  { value: 8, label: 'Diseño Gráfico' },
  { value: 9, label: 'Educación' },
  { value: 10, label: 'Otra' },
];

const UNIVERSIDAD_OPTIONS = [
  { value: 1, label: 'Universidad Central de Venezuela (UCV)' },
  { value: 2, label: 'Universidad Simón Bolívar (USB)' },
  { value: 3, label: 'Universidad Católica Andrés Bello (UCAB)' },
  { value: 4, label: 'Universidad Metropolitana (UNIMET)' },
  { value: 5, label: 'Universidad de Los Andes (ULA)' },
  { value: 6, label: 'Universidad del Zulia (LUZ)' },
  { value: 7, label: 'Universidad de Carabobo (UC)' },
  { value: 8, label: 'Universidad de Oriente (UDO)' },
  { value: 9, label: 'Universidad Nacional Experimental Politécnica (UNEXPO)' },
  { value: 10, label: 'Otra' },
];

const StepInformacionAcademica = ({ formData, updateFormData, errors = {} }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-unievents-dark mb-2">Información académica y de contacto</h3>

      <Select
        label="Universidad"
        name="universidad"
        value={formData.universidad}
        onChange={handleChange}
        options={UNIVERSIDAD_OPTIONS}
        error={errors.universidad}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Profesión"
          name="profesion"
          value={formData.profesion}
          onChange={handleChange}
          options={PROFESION_OPTIONS}
          placeholder="Sin especificar"
        />

        <Select
          label="Carrera"
          name="carrera"
          value={formData.carrera}
          onChange={handleChange}
          options={CARRERA_OPTIONS}
          error={errors.carrera}
        />
      </div>
    </div>
  );
};

export default StepInformacionAcademica;
