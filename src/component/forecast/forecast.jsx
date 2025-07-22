import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { WEEK_DAYS } from "../../constants/constants";
import "./forecast.css";

const Forecast = ({ data }) => {
  const daysInAWeek = new Date().getDay();

  const forecastDays = WEEK_DAYS.slice(daysInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, daysInAWeek)
  );
  //   console.log(forecastDays, "forecastDays");
  return (
    <>
      <label className='title'>7-DAY WEATHER FORECAST </label>
      <Accordion allowZeroExpanded style={{ marginBottom: "50px" }}>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img
                    alt='forecast-weather icon'
                    className='icon-small'
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className='forecast-day'>{forecastDays[idx]}</label>
                  <label className='forecast-description'>
                    {item.weather[0].description}
                  </label>
                  <label className='forecast-min-max'>
                    {Math.round(item.main.temp_min)} °C /{" "}
                    {Math.round(item.main.temp_max)} °C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className='daily-details-grid'>
                <div className='daily-details-grid-items'>
                  <label>Pressure:</label>
                  <label>{item.main.pressure} hpa</label>
                </div>
                <div className='daily-details-grid-items'>
                  <label>Humidity:</label>
                  <label>{item.main.humidity} %</label>
                </div>
                <div className='daily-details-grid-items'>
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className='daily-details-grid-items'>
                  <label>Wind Speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className='daily-details-grid-items'>
                  <label>Sea level:</label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className='daily-details-grid-items'>
                  <label>Feels Like:</label>
                  <label>{Math.round(item.main.feels_like)} °C </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
