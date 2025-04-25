import React from 'react';
import { ConsultationType } from '../../types/doctor';

interface ConsultationFilterProps {
  selectedType: ConsultationType;
  onChange: (type: ConsultationType) => void;
}

const ConsultationFilter: React.FC<ConsultationFilterProps> = ({ 
  selectedType, 
  onChange 
}) => {
  return (
    <div className="mb-6">
      <h3 
        className="text-md font-semibold mb-3 text-gray-700"
        data-testid="filter-header-moc"
      >
        Consultation Type
      </h3>
      <div className="space-y-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="consultationType"
            checked={selectedType === 'video'}
            onChange={() => onChange('video')}
            className="form-radio h-4 w-4 text-blue-600"
            data-testid="filter-video-consult"
          />
          <span className="ml-2 text-gray-700">Video Consult</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="consultationType"
            checked={selectedType === 'inClinic'}
            onChange={() => onChange('inClinic')}
            className="form-radio h-4 w-4 text-blue-600"
            data-testid="filter-in-clinic"
          />
          <span className="ml-2 text-gray-700">In Clinic</span>
        </label>
        {selectedType !== null && (
          <button 
            onClick={() => onChange(null)} 
            className="text-sm text-blue-600 hover:text-blue-800 mt-1"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ConsultationFilter;