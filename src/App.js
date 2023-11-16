import "./App.css";
import WeatherApp from "./WeatherApp";
import useGeoLocation from "./services/useGeoLocation";
function App() {
  const location = useGeoLocation();
  const longitude = location.coordinates.long;
  const lattitude = location.coordinates.lat;
  const city = location.city;
  return (
    <div>
      {location.loaded ? (
        <p>
          <WeatherApp longitude={longitude} lattitude={lattitude} city={city} />
        </p>
      ) : (
        <>Loading..</>
      )}
    </div>
  );
}

export default App;
