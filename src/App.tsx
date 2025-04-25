import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import DoctorsList from './components/DoctorsList';
import { Doctor, FilterState } from './types/doctor';
import { fetchDoctors } from './api/doctorsApi';
import { specialtiesList, generateMockDoctors } from './utils/mockData';
import { Filter, Menu } from 'lucide-react';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    consultationType: null,
    specialties: [],
    sortBy: null
  });

  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from API
        const data = await fetchDoctors();
        
        // Check if data is an array
        if (Array.isArray(data)) {
          if (data.length === 0) {
            console.log('API returned no doctors.');
            const mockData = generateMockDoctors(24);
            setDoctors(mockData);
            setFilteredDoctors(mockData);
          } else {
            setDoctors(data);
            setFilteredDoctors(data);
          }
        } else {
          console.error('Invalid data format from API:', data);
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError('Failed to load doctors. Using mock data instead.');
        
        // Fallback to mock data
        const mockData = generateMockDoctors(24);
        setDoctors(mockData);
        setFilteredDoctors(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Apply filters and search whenever filters or search query changes
  useEffect(() => {
    if (doctors.length === 0) return;

    let result = [...doctors];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        doctor => 
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialties.some(s => s.toLowerCase().includes(query))
      );
    }

    // Apply consultation type filter
    if (filters.consultationType) {
      result = result.filter(
        doctor => doctor.consultationTypes[filters.consultationType as keyof typeof doctor.consultationTypes]
      );
    }

    // Apply specialties filter
    if (filters.specialties.length > 0) {
      result = result.filter(
        doctor => doctor.specialties.some(s => filters.specialties.includes(s))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          return a.fee - b.fee; // Ascending
        } else if (filters.sortBy === 'experience') {
          return b.experience - a.experience; // Descending
        }
        return 0;
      });
    }

    setFilteredDoctors(result);
  }, [doctors, filters, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-red-700">MEDICOVER</h1>
            </div>
            
            <button
              onClick={toggleSidebar}
              className="md:hidden inline-flex items-center justify-center rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 p-2"
              aria-label="Open filters"
            >
              <Filter size={20} />
              <span className="ml-1">Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:mb-6">
          <SearchBar 
            doctors={doctors} 
            onSearch={handleSearchChange} 
          />
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-red bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar 
            filters={filters}
            specialties={specialtiesList}
            onFilterChange={handleFilterChange}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content area */}
          <div className="flex-1">
            {error && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div>
                    <p className="text-sm text-yellow-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {isLoading ? 'Loading doctors...' : 
                  `${filteredDoctors.length} ${filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found`
                }
              </h2>
              
              <div className="md:hidden">
                <button
                  onClick={toggleSidebar}
                  className="inline-flex items-center justify-center rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 p-2"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>

            <DoctorsList 
              doctors={filteredDoctors} 
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;