import "./App.css";
import { useState } from "react";
import Search from "./component/search/search";
import Header from "./component/header/header";
import CurrentWeather from "./component/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./constants/constants";
import Forecast from "./component/forecast/forecast";
import Footer from "./component/footer/footer";
// import { useMemo } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  // const bgImage = useMemo(() => {
  //   if (!currentWeather) return "";
  //   console.log(currentWeather.weather[0].main, "for the image");
  // }, [currentWeather]);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData, "this is the HandleOnSearchChange");
    const [lat, long] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        console.log(weatherResponse, "response of promise all");
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => console.log(error));
  };
  console.log(currentWeather, "current weather response");
  console.log(forecastWeather, "forecast weather response");

  return (
    // <div
    //   className='parent'
    //   style={{ backgroundImage: "url('weather-background/thunderstorm.jpg')" }}
    // >
    <div className='container'>
      <Header />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
      <Footer />
    </div>
    // </div>
  );
}

export default App;
