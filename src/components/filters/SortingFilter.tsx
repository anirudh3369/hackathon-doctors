import React from 'react';

interface SortingFilterProps {
  sortOption: 'fees' | 'experience' | null;
  onChange: (option: 'fees' | 'experience' | null) => void;
}

const SortingFilter: React.FC<SortingFilterProps> = ({ sortOption, onChange }) => {
  return (
    <div className="mb-6">
      <h3 
        className="text-md font-semibold mb-3 text-gray-700"
        data-testid="filter-header-sort"
      >
        Sort By
      </h3>
      <div className="space-y-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="sortOption"
            checked={sortOption === 'fees'}
            onChange={() => onChange('fees')}
            className="form-radio h-4 w-4 text-blue-600"
            data-testid="sort-fees"
          />
          <span className="ml-2 text-gray-700">Fees (Ascending)</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="sortOption"
            checked={sortOption === 'experience'}
            onChange={() => onChange('experience')}
            className="form-radio h-4 w-4 text-blue-600"
            data-testid="sort-experience"
          />
          <span className="ml-2 text-gray-700">Experience (Descending)</span>
        </label>
        {sortOption !== null && (
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

export default SortingFilter;