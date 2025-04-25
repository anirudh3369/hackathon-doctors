import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types/doctor';
import { SearchIcon } from 'lucide-react';

interface DoctorsListProps {
  doctors: Doctor[];
  isLoading: boolean;
  searchQuery: string;
}

const DoctorsList: React.FC<DoctorsListProps> = ({ 
  doctors, 
  isLoading,
  searchQuery
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="p-5">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-px bg-gray-200 my-3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <SearchIcon size={48} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No doctors found</h3>
        <p className="text-gray-500 max-w-md">
          {searchQuery 
            ? `We couldn't find any doctors matching "${searchQuery}".` 
            : "Try adjusting your filters or search query to find more doctors."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorsList;