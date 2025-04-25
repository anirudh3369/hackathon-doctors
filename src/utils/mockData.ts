import { Doctor } from '../types/doctor';

// Generate a random number between min and max
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// List of specialties from the API
export const specialtiesList = [
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Gynecologist',
  'Neurologist',
  'Psychiatrist',
  'Dentist',
  'ENT Specialist',
  'Ophthalmologist'
];

// Generate random doctors data (fallback only)
export const generateMockDoctors = (count: number): Doctor[] => {
  return Array.from({ length: count }, (_, i) => {
    const numSpecialties = getRandomNumber(1, 2);
    const specialties: string[] = [];
    
    while (specialties.length < numSpecialties) {
      const specialty = specialtiesList[getRandomNumber(0, specialtiesList.length - 1)];
      if (!specialties.includes(specialty)) {
        specialties.push(specialty);
      }
    }

    const hasVideo = Math.random() > 0.3;
    const hasInClinic = Math.random() > 0.3;

    return {
      id: `doc-${i + 1}`,
      name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'][getRandomNumber(0, 4)]} ${String.fromCharCode(65 + i % 26)}`,
      specialties,
      experience: getRandomNumber(1, 25),
      fee: getRandomNumber(300, 3000),
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'][getRandomNumber(0, 4)],
      consultationTypes: {
        video: hasVideo,
        inClinic: hasInClinic || !hasVideo, // Ensure at least one consultation type
      },
      rating: Number((getRandomNumber(35, 50) / 10).toFixed(1)),
      education: ['MBBS', 'MD', 'MS', 'DNB'].slice(0, getRandomNumber(1, 2)),
      languages: ['English', 'Hindi', 'Telugu', 'Tamil'].slice(0, getRandomNumber(2, 4))
    };
  });
};