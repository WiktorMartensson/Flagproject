import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Pages/Countrypage.css";
import BorderButtons from "../Components/BorderCountriesbuttons";
import darkarrowleft from "../assets/darkarrowleft.svg";

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const encodedName = encodeURIComponent(name);
        const data = await countryDetailsLoader({
          params: { name: encodedName },
        });
        console.log(data);
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryDetails();
  }, [name]);

  const fetchBorderedCountries = async () => {
    try {
      if (country?.borders) {
        const borderedCountriesData = await Promise.all(
          country.borders.map(async (borderCountryCode) => {
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${borderCountryCode}`
            );
            const borderedCountryData = await response.json();
            return borderedCountryData[0]?.name?.common;
          })
        );

        console.log("All Bordered Countries Data:", borderedCountriesData);
        return borderedCountriesData;
      }
    } catch (error) {
      console.error("Error fetching bordered countries:", error);
    }
  };

 
  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="countrypage-container">
      <div className="back-button">
        <Link to="/">
          <img src={darkarrowleft} alt="Back" />
          Back
        </Link>
      </div>
      <img
        className="countrypage-img"
        src={country.flags?.svg}
        alt={`${country.name?.common} flag`}
      />
      <div className="countrypagedetails">
        <h1>{country.name?.common}</h1>
        <div className="country_details_container">
          <div className="details-columns">
            <div className="column">
              <p>Population: {country.population?.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
              <p>Native name: {country.nativeName?.common}</p>
            </div>
            <div className="column">
              {country.tld && <p>Top Level Domain: {country.tld}</p>}
              {country.currencies && (
                <p>
                  Currencies:{" "}
                  {Object.entries(country.currencies)
                    .map(([code, currency]) => `${code} (${currency.name})`)
                    .join(", ")}
                </p>
              )}
              {country.languages && (
                <p>Languages: {Object.values(country.languages).join(", ")}</p>
              )}
            </div>
          </div>
        </div>
        <div className="border-section">
          <p className="border-label">Border Countries:</p>
          {country.borders && (
            <BorderButtons
              borders={country.borders}
              fetchBorderedCountries={fetchBorderedCountries}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const countryDetailsLoader = async ({ params }) => {
  const { name } = params || {};
  try {
    if (!name) {
      throw new Error("Country name not provided");
    }
    const encodedName = encodeURIComponent(name);
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodedName}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        // Country data not found
        console.warn(`Country data not found for: ${name}`);
        return { notFound: true };
      } else {
        // Other errors
        throw new Error(`Det gick inte att hämta: ${name}`);
      }
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`Country data not found for: ${name}`);
      return { notFound: true };
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default CountryPage;
