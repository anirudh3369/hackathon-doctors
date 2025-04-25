import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);

    if (value.trim()) {
      // Filter doctors based on input value
      const filtered = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase()) ||
          doctor.specialties.some(specialty => 
            specialty.toLowerCase().includes(value.toLowerCase())
          )
        )
        .slice(0, 3); // Limit to 3 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctorName: string) => {
    setQuery(doctorName);
    onSearch(doctorName);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search doctors by name or specialty"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="autocomplete-input"
          onFocus={() => query.trim() && setShowSuggestions(true)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {suggestions.map((doctor) => (
              <li 
                key={doctor.id}
                onClick={() => handleSuggestionClick(doctor.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                data-testid="suggestion-item"
              >
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-gray-500">
                    {doctor.specialties.join(', ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;