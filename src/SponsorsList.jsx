import React, { useEffect, useState } from 'react';

const SponsorsList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sponsors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSponsors(data);
      } catch (error) {
        console.error('Error fetching sponsor data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="sponsors-list">
      <h1 className="text-center text-xl font-bold mb-4">Our Sponsors</h1>
      {sponsors.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="sponsor-card p-2 border border-gray-300 rounded shadow">
              <img src={sponsor.imageUrl} alt={sponsor.name} className="sponsor-image max-h-32 max-w-full object-contain mx-auto" />
              <h3 className="sponsor-name text-center mt-2">{sponsor.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4">No sponsors found.</div>
      )}
    </div>
  );
};

export default SponsorsList;
