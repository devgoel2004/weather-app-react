import { useState, useEffect } from "react";
const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
    city: "",
  });
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation({
            loaded: true,
            coordinates: {
              lat: latitude,
              long: longitude,
            },
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              data.address.state ||
              "",
          });
        })
        .catch((error) => {
          console.error("Error fetching city name:", error);
          setLocation((prevLocation) => ({
            ...prevLocation,
            loaded: true,
          }));
        });
    };
    const error = () => {
      setLocation({
        loaded: true,
        coordinates: { lat: "", long: "" },
      });
    };

    if (!("geolocation" in navigator)) {
      error();
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  return location;
};

export default useGeoLocation;
