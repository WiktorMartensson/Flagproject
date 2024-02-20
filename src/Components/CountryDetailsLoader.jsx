export default async function countryDetailsLoader({ params }) {
  const { code } = params || {};

  try {
    if (!code) {
      throw new Error("Country code not provided");
    }

    const apiUrl = `https://restcountries.com/v3.1/alpha/${code}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch country data for: ${code}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`Country data not found for: ${code}`);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
