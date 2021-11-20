import React, { useEffect, useState } from "react";

// libraries
import axios from "axios";
import Zip from "react-zipcode";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// custom components
import Settings from "./Settings";

export default function Weather() {
   const apiLoc = "http://api.weatherbit.io/v2.0/current";
   const key = "5920c568fb6643ca908dc37155c3a908";
   const lang = "en";
   const units = "I";
   const inc = "minutely";
   const [weather, setWeather] = useState(null);
   const [zip, setZip] = useState(99801);
   const [testData, setTestData] = useState(true);
   const [weatherSettings, setWeatherSettings] = useState(true);
   const [settings, setSettings] = useState({
      lang: "en",
      units: "I", // M for metric, S for scientific, I for farenheit
      inc: "minutely",
   });
   //   useEffect(() => {
   //      navigator.geolocation ? console.log("true") : console.log("false");
   //   }, []);

   useEffect(() => {
      console.log("weather = ", weather);
   }, [weather]);

   useEffect(() => {
      console.log("settings = ", settings)
   }, [settings])

   const getWeather = async () => {
      try {
         if (testData) {
            const weatherInfo = localStorage.getItem("weatherInfo");
            const readableWeather = JSON.parse(weatherInfo);
            setWeather(readableWeather.data.data[0]);
         } else {
            const response = await axios.get(
               `${apiLoc}?postal_code=${zip}&key=${key}&include=${settings.inc}&lang=${settings.lang}&units=${settings.units}`
            );
            setWeather(response.data.data[0]);
         }
         //   console.log(response);
         //   localStorage.setItem("weatherInfo", JSON.stringify(response))
      } catch (error) {
         console.log(error);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      getWeather();
   };

   const handleZip = (value) => {
      setZip(parseInt(value));
   };

   const toggleTest = () => {
      setTestData((curr) => !curr);
   };
   return (
      <>
         <Button
            size="sm"
            variant="warning"
            onClick={toggleTest}
         >{`Toggle Test => ${testData}`}</Button>
         <Button size="sm" variant="success" onClick={() => setWeatherSettings(true)}>
            Settings
         </Button>
         <hr />
         <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group as={Row} controlId="formZipCode">
               <Col xs={4}>
                  <Form.Label>Enter Zipcode</Form.Label>
               </Col>
               <Col xs={5}>
                  <Zip
                     placeholder="xxxxx"
                     onValue={(value) => handleZip(value)}
                     value={zip}
                  />
               </Col>
               <Col xs={3}>
                  <Button type="submit">Submit</Button>
               </Col>
            </Form.Group>
         </Form>

         {weatherSettings && (
            <Settings
               weatherSettings={weatherSettings}
               setWeatherSettings={setWeatherSettings}
               settings={settings}
               setSettings={setSettings}
            />
         )}

         {weather && (
            <>
               <p>
                  Location: {weather.city_name}, {weather.state_code}{" "}
               </p>
               <p>{weather.temp}°F</p>
               <p>{weather.weather.description}</p>
               {/* 
               <p>I think this weather API is incorrect on the sunrise/sunset</p> 
               <p>Sunrise: {weather.sunrise} (8:21a)</p>
               <p>Sunset: {weather.sunset} (5:00p)</p> 
               */}
               <p>
                  Wind: {weather.wind_cdir} at {weather.wind_spd} mph{" "}
               </p>
            </>
         )}
      </>
   );
}
