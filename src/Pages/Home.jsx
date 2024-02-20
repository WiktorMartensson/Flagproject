import { useEffect, useState } from 'react';
import Countrycards from '../Components/Countrycards';
import './Homepage.css';


export default function Cards() {
  const [country, setCountry] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountry(data);
        setFilteredCountry(data);
      } catch (error) {
        console.error('Error fetching all countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Filtrera baserat på vald region
  const handleFilterByRegion = (region) => {
    setSelectedRegion(region);
    if (region === 'All') {
      setFilteredCountry(country);
    } else {
      const filtered = country.filter((item) => item.region === region);
      setFilteredCountry(filtered);
    }
  };

  const handleSearch = (e) => {
    const searchTermLower = e.target.value.toLowerCase();
    setSearchTerm(searchTermLower);

    const filtered = country.filter(
      (item) =>
        item.name.common.toLowerCase().includes(searchTermLower) ||
        item.name.official.toLowerCase().includes(searchTermLower)
    );
    setFilteredCountry(filtered);
  };

  useEffect(() => {
    const searchbar = document.getElementById('searchbar');
    const dropdown = document.getElementById('dropdown');

    if (searchbar) {
      searchbar.classList.toggle('dark-mode', darkMode);
    }

    if (dropdown) {
      dropdown.classList.toggle('dark-mode', darkMode);
    }
  }, [darkMode]);

  return (
    <div>
      <div className={`top-container ${darkMode ? 'dark-mode' : ''}`}>
        <input
          id="searchbar"
          type="text"
          placeholder="Search for a country.."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Dropdown meny för regions */}
        <select
          id="dropdown"
          value={selectedRegion}
          onChange={(e) => handleFilterByRegion(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div
      style={{
        justifyContent: filteredCountry.length <= 3 ? 'flex-start' : 'space-between',
      }}
      className={`countrycards-container ${darkMode ? 'dark-mode' : ''}`}
    >
      {filteredCountry.map((item) => (
        <Countrycards key={item.cca3} data={item} />
      ))}
    </div>
    </div>
  );
}
