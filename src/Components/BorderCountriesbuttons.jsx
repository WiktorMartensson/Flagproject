import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BorderButtons.css';

const BorderButtons = ({ borders, fetchBorderedCountries }) => {
  const [borderedCountries, setBorderedCountries] = useState([]);

  useEffect(() => {
    const fetchBorders = async () => {
      try {
        const countryNames = await fetchBorderedCountries();
        setBorderedCountries(countryNames);
      } catch (error) {
        console.error('Error fetching bordered countries:', error);
      }
    };

    fetchBorders();
  }, [fetchBorderedCountries]);

  return (
    <div>
      {borderedCountries.length > 0 &&
        borderedCountries.map((borderedCountry, index) => (
          <Link
            key={index}
            to={borders[index] ? `/${borders[index].toLowerCase()}` : '/'}
            className="border-button"
            style={{ textDecoration: 'none' }}
          >
            <button className='border__button_'>
              {borderedCountry || 'Unknown Country'}
            </button>
          </Link>
        ))}
    </div>
  );
};

export default BorderButtons;

