import { Doctor, ApiResponse } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

const transformApiDoctor = (apiDoctor: any): Doctor => {
  // Extract numeric value from experience string (e.g., "13 Years of experience" -> 13)
  const experienceYears = parseInt(apiDoctor.experience.toString().split(' ')[0], 10) || 0;
  
  // Extract numeric value from fees string (e.g., "₹ 500" -> 500)
  const feeAmount = parseInt(apiDoctor.fees?.toString().replace(/[^\d]/g, '') || '0', 10);

  // Safely handle consultation types
  const consultationTypes = (() => {
    try {
      return {
        video: Boolean(apiDoctor.video_consult),
        inClinic: Boolean(apiDoctor.in_clinic)
      };
    } catch (error) {
      console.error("Error parsing consultationTypes:", error);
      return {
        video: false,
        inClinic: false
      };
    }
  })();

  // Safely handle specialties
  const specialties = (() => {
    try {
      return Array.isArray(apiDoctor.specialities) 
        ? apiDoctor.specialities.map((s: { name: string }) => s.name)
        : [apiDoctor.specialities?.name || 'General Practitioner'];
    } catch (error) {
      console.error("Error parsing specialties:", error);
      return ['General Practitioner'];
    }
  })();

  return {
    id: apiDoctor.id?.toString() || '',
    name: apiDoctor.name || 'Unknown Doctor',
    specialties,
    experience: experienceYears,
    fee: feeAmount,
    location: `${apiDoctor.clinic?.address?.locality || ''}, ${apiDoctor.clinic?.address?.city || ''}`.trim() || 'Location not specified',
    consultationTypes,
    rating: 4.5, // Default rating since it's not in the API
    description: apiDoctor.doctor_introduction || '',
    imageUrl: apiDoctor.photo !== 'null' ? apiDoctor.photo : undefined,
    languages: Array.isArray(apiDoctor.languages) ? apiDoctor.languages : [],
    education: [] // Add education if available in the API
  };
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response format');
    }
    
    return data.map(transformApiDoctor);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const searchDoctors = (doctors: Doctor[], query: string): Doctor[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return doctors
    .filter(doctor => 
      doctor.name.toLowerCase().includes(normalizedQuery) ||
      doctor.specialties.some(specialty => 
        specialty.toLowerCase().includes(normalizedQuery)
      )
    )
    .slice(0, 3); // Limit to 3 suggestions
};