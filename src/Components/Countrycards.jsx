import React from 'react';
import './Countrycards.css';
import { Link } from 'react-router-dom';

const Countrycards = ({ data }) => {

  console.log("Data in Countrycards:", data);

  if (!data || !data.flags) {
    return <div>Loading...</div>;
  }

  const flags = data.flags;

  return (
    <Link to={`/${data.cca2}`}>
    <div className='country-details'>
      <div className='country-image-frame'>
      <img className='country-image' src={flags.png} alt="" />
      </div>
      <div className='country__details'>
        <p className='country-name'>{data.name?.common}</p>
        <p>Population: {data.population.toLocaleString()}</p>
        <p>Region: {data.region} </p>
        <p>Capital: {data.capital} </p>
      </div>
    </div>
  </Link>
  );
};

export default Countrycards;
