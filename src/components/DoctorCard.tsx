import React from 'react';
import { Star, ThumbsUp, Video, MapPin, GraduationCap, Languages } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
      data-testid="doctor-card"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {doctor.imageUrl && (
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 
                  className="text-lg font-semibold text-gray-800" 
                  data-testid="doctor-name"
                >
                  {doctor.name}
                </h3>
                <p 
                  className="text-sm text-gray-600"
                  data-testid="doctor-specialty"
                >
                  {doctor.specialties.join(', ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <ThumbsUp size={16} className="mr-1 text-blue-600" />
              <span data-testid="doctor-experience">{doctor.experience} years experience</span>
            </div>
            
            {doctor.location && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin size={16} className="mr-1 text-gray-500" />
                <span>{doctor.location}</span>
              </div>
            )}

            {doctor.languages && doctor.languages.length > 0 && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Languages size={16} className="mr-1 text-gray-500" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
            <Star size={16} className="text-yellow-500" />
            {doctor.rating}
          </div>
        </div>

        {doctor.description && (
          <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2">
            {doctor.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mr-auto">
            {doctor.consultationTypes.video && (
              <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                <Video size={12} className="mr-1" />
                Video Consult
              </span>
            )}
            
            {doctor.consultationTypes.inClinic && (
              <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-1">
                <MapPin size={12} className="mr-1" />
                In Clinic
              </span>
            )}
          </div>
          
          <div 
            className="text-right text-lg font-semibold text-blue-700" 
            data-testid="doctor-fee"
          >
            ₹{doctor.fee}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 px-5 py-3 flex justify-between items-center">
        <button className="text-gray-700 text-sm hover:underline">
          View Profile
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;