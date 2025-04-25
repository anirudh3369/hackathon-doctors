import React from 'react';

interface SpecialtyFilterProps {
  specialties: string[];
  selectedSpecialties: string[];
  onChange: (specialty: string) => void;
}

const SpecialtyFilter: React.FC<SpecialtyFilterProps> = ({
  specialties,
  selectedSpecialties,
  onChange
}) => {
  return (
    <div className="mb-6">
      <h3 
        className="text-md font-semibold mb-3 text-gray-700"
        data-testid="filter-header-speciality"
      >
        Specialties
      </h3>
      
      <div className="max-h-60 overflow-y-auto pr-2 space-y-1">
        {specialties.map((specialty) => (
          <label 
            key={specialty} 
            className="flex items-center cursor-pointer py-1"
          >
            <input
              type="checkbox"
              checked={selectedSpecialties.includes(specialty)}
              onChange={() => onChange(specialty)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
              data-testid={`filter-specialty-${specialty}`}
            />
            <span className="ml-2 text-gray-700">{specialty}</span>
          </label>
        ))}
      </div>
      
      {selectedSpecialties.length > 0 && (
        <button 
          onClick={() => selectedSpecialties.forEach(specialty => onChange(specialty))} 
          className="text-sm text-blue-600 hover:text-blue-800 mt-3"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default SpecialtyFilter;