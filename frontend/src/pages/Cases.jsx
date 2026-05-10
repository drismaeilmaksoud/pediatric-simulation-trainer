import { useState, useEffect } from 'react';

function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch cases from API
    // const fetchCases = async () => {
    //   try {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/cases`);
    //     const data = await response.json();
    //     setCases(data.cases);
    //   } catch (error) {
    //     console.error('Error fetching cases:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCases();
    setLoading(false);
  }, []);

  if (loading) return <div>Loading cases...</div>;

  return (
    <div className="page-container">
      <h1>Available Cases</h1>
      <p>Browse and select from available clinical scenarios</p>
      {cases.length === 0 && (
        <div className="empty-state">
          <p>No cases available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

export default Cases;
