import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';

function PatientInsights() {
  const [speciesCounts, setSpeciesCounts] = useState(null);
  const [topBreeds, setTopBreeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientInsights = async () => {
      try {
        setLoading(true);
        const [speciesRes, breedsRes] = await Promise.all([
          axios.get('http://localhost:5000/patients/species-count'), // Ensure your base URL is configured if needed
          axios.get('http://localhost:5000/patients/top-breeds'),   // Ensure your base URL is configured if needed
        ]);

        setSpeciesCounts(speciesRes.data);
        setTopBreeds(breedsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching patient insights');
        console.error(err);
        setLoading(false);
      }
    };

    fetchPatientInsights();
  }, []);

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6"><DotLoader size={20} /> Loading Patient Insights...</div>;
  }

  if (error) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Patient Insights
      </h2>

      {speciesCounts && (
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Patient Count by Species
          </h3>
          <ul>
            {Object.entries(speciesCounts).map(([species, count]) => (
              <li key={species} className="py-1 text-gray-600 dark:text-gray-400">
                {species}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}

      {topBreeds && (
        <div>
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Top Breeds
          </h3>
          <ol className="list-decimal list-inside">
            {topBreeds.map((breedInfo) => (
              <li key={breedInfo.breed} className="py-1 text-gray-600 dark:text-gray-400">
                {breedInfo.breed}: {breedInfo.count}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default PatientInsights;