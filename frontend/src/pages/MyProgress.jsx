import { useState, useEffect } from 'react';

function MyProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch progress data from API
    // const fetchProgress = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/progress`, {
    //       headers: { 'Authorization': `Bearer ${token}` }
    //     });
    //     const data = await response.json();
    //     setProgress(data);
    //   } catch (error) {
    //     console.error('Error fetching progress:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchProgress();
    setLoading(false);
  }, []);

  if (loading) return <div>Loading progress...</div>;

  return (
    <div className="page-container">
      <h1>My Progress</h1>
      <p>Track your development across competencies</p>
      {!progress && (
        <div className="empty-state">
          <p>Start a case to track your progress!</p>
        </div>
      )}
    </div>
  );
}

export default MyProgress;
