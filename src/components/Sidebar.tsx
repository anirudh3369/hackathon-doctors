import React from 'react';
import { FilterState } from '../types/doctor';
import ConsultationFilter from './filters/ConsultationFilter';
import SpecialtyFilter from './filters/SpecialtyFilter';
import SortingFilter from './filters/SortingFilter';
import { X } from 'lucide-react';

interface SidebarProps {
  filters: FilterState;
  specialties: string[];
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  specialties,
  onFilterChange,
  isOpen,
  onClose
}) => {
  const handleConsultationChange = (type: FilterState['consultationType']) => {
    onFilterChange({ consultationType: type });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    onFilterChange({ specialties: newSpecialties });
  };

  const handleSortChange = (sortOption: FilterState['sortBy']) => {
    onFilterChange({ sortBy: sortOption });
  };

  return (
    <div 
      className={`
        fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        border-r border-gray-200 p-5 overflow-y-auto
      `}
    >
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <ConsultationFilter 
          selectedType={filters.consultationType} 
          onChange={handleConsultationChange}
        />
        
        <div className="h-px bg-gray-200"></div>
        
        <SpecialtyFilter
          specialties={specialties}
          selectedSpecialties={filters.specialties}
          onChange={handleSpecialtyChange}
        />
        
        <div className="h-px bg-gray-200"></div>
        
        <SortingFilter 
          sortOption={filters.sortBy} 
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;