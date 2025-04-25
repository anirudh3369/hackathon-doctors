export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  experience: number;
  fee: number;
  location: string;
  consultationTypes: {
    video: boolean;
    inClinic: boolean;
  };
  rating: number;
  description?: string;
  imageUrl?: string;
  languages?: string[];
  education?: string[];
}

export type ConsultationType = 'video' | 'inClinic' | null;

export interface FilterState {
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: 'fees' | 'experience' | null;
}