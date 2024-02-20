import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Countrypage.css";
import BorderButtons from "../Components/BorderCountriesbuttons";
import darkarrowleft from "../assets/darkarrowleft.svg";
import countryDetailsLoader from "../Components/CountryDetailsLoader";
import lightarrowleft from "../assets/arrow-left.svg";
import { useTheme } from "../contexts/theme";

const CountryPage = ({}) => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const { themeMode } = useTheme();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const data = await countryDetailsLoader({
          params: { code },
        });
        console.log("Fetched country data:", data);
        setCountry(data);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchCountryDetails();
  }, [code]);

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

  const {
    flags,
    name,
    population,
    region,
    capital,
    tld,
    currencies,
    languages,
  } = country;

  console.log(name);
  const countriesNative = Object.keys(name.nativeName);
  console.log({ countriesNative });
  const nativeNameClean = name.nativeName[countriesNative[0]].common;

  return (
  <div
    className={`countrypage-container ${
      themeMode === "dark" ? "dark-mode" : ""
    }`}
  >
    <div className="img-frame_">
    <div className="back-button">
      <Link to="/">
        {themeMode === "dark" ? (
          <img src={lightarrowleft} alt={"light Back"} />
        ) : (
          <img src={darkarrowleft} alt={"dark Back"} />
        )}
        Back
      </Link>
    </div>
      <img
        className="countrypage-img"
        src={flags?.svg || flags?.png}
        alt={`${name?.common} flag`}
      />
    </div>
      <div className="countrypagedetails">
        <h1 className="country_name">{name?.common}</h1>
        <div className="country_details_container">
          <div className="details-columns">
            <div className="column">
              <p>Population: {population?.toLocaleString()}</p>
              <p>Region: {region}</p>
              <p>Capital: {capital}</p>
              <p>Native name: {nativeNameClean}</p>
            </div>
            <div className="column">
              {tld && <p>Top Level Domain: {tld}</p>}
              {currencies && (
                <p>
                  Currencies:{" "}
                  {Object.entries(currencies)
                    .map(([code, currency]) => `${code} (${currency.name})`)
                    .join(", ")}
                </p>
              )}
              {languages && (
                <p>Languages: {Object.values(languages).join(", ")}</p>
              )}
            </div>
          </div>
        </div>
        <div className="border-section">
          <p className="border-label">Border Countries: </p>
          {country.borders && country.borders.length > 0 ? (
            <BorderButtons
              borders={country.borders}
              fetchBorderedCountries={fetchBorderedCountries}
            />
          ) : (
            <p>No bordering countries.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
