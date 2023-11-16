import React, { useState, useEffect } from "react";

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setLocation(data.display_name);
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      // Round latitude and longitude to 6 decimal places
      const roundedLatitude = latitude.toFixed(6);
      const roundedLongitude = longitude.toFixed(6);
      fetchLocation(roundedLatitude, roundedLongitude);
    };

    const error = (err) => {
      console.error("Error getting user location:", err);
      setLoading(false);
    };

    if (!("geolocation" in navigator)) {
      console.error("Geolocation is not available");
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : location ? (
        <p>User's Location: {location}</p>
      ) : (
        <p>Location not found</p>
      )}
    </div>
  );
};

export default LocationComponent;
