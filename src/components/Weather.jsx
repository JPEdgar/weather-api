import React, { useEffect, useState } from "react";

// libraries
import axios from "axios";
import Zip from "react-zipcode";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Weather() {
   const apiLoc = "http://api.weatherbit.io/v2.0/current";
   const key = "5920c568fb6643ca908dc37155c3a908";
   const lang = "en";
   const units = "I"; // M for metric, S for scientific, I for farenheit
   const inc = "minutely";
   const [weather, setWeather] = useState(null);
   const [zip, setZip] = useState(99801);

   const [testData, setTestData] = useState(false);
   //    useEffect(() => {
   //       getWeather();
   //    }, []);

   //    useEffect(() => {
   //       console.log(weather);
   //    }, [weather]);

   const getWeather = async () => {
      try {
         if (testData) {
            const weatherInfo = localStorage.getItem("weatherInfo");
            const readableWeather = JSON.parse(weatherInfo);
            setWeather(readableWeather.data.data[0]);
         } else {
            const response = await axios.get(
               `${apiLoc}?postal_code=${zip}&key=${key}&include=${inc}&lang=${lang}&units=${units}`
            );
            setWeather(response.data.data[0])
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
       setTestData(curr => !curr)
   }
   return (
      <>
      <Button size="sm" variant="success" onClick={toggleTest}>{`Toggle Test => ${testData}`}</Button>
         <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group as={Row} controlId="formZipCode">
               <Col xs={4}>
                  <Form.Label>Enter Zipcode</Form.Label>
               </Col>
               <Col xs={5}>
                  <Zip
                     placeholder="xxxxx"
                     //  onChange={(e) => handleZip(e)}
                     onValue={(value) => handleZip(value)}
                     value={zip}
                  />
               </Col>
               <Col xs={3}>
                  <Button type="submit">Submit</Button>
               </Col>
            </Form.Group>
         </Form>
         {weather && (
            <>
               <p>
                  Location: {weather.city_name}, {weather.state_code}{" "}
               </p>
               <p>{weather.temp}°F</p>
               <p>{weather.weather.description}</p>
               <p>Sunrise: {weather.sunrise}</p>
               <p>Sunset: {weather.sunset}</p>
               <p>
                  Wind: {weather.wind_cdir} at {weather.wind_spd} mph{" "}
               </p>
            </>
         )}
      </>
   );
}
