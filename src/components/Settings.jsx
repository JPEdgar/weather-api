import React, { useState, useEffect } from "react";

// libraries
import {
   Modal,
   Button,
   InputGroup,
   FormControl,
   Form,
   Row,
   Col,
} from "react-bootstrap";

// custom components
import UnitSettings from "./UnitSettings";

/*
const [settings, setSettings] = useState({
   lang: "en",
   units: "I", // M for metric, S for scientific, I for farenheit
   inc: "minutely",
});
*/

export default function Settings({
   settings,
   setSettings,
   weatherSettings,
   setWeatherSettings,
}) {
   const [tempSettings, setTempSettings] = useState(settings);

   const handleClose = () => setWeatherSettings(false);
   const handleSubmit = (e) => {
      e.preventDefault();
        setSettings(tempSettings);
        setWeatherSettings(false);
      console.log("tempSettings = ", tempSettings);
   };

   useEffect(() => {
      console.log("tempSettings = ", tempSettings)
   }, [tempSettings])
   
   return (
      <div>
         <Modal show={weatherSettings} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => handleSubmit(e)}>
               <Modal.Body>
                  <Form.Group as={Row} className="mb-3">
                     <Form.Label column sm={2}>
                        Unit
                     </Form.Label>
                     <Col sm={10}>
                        <UnitSettings id={1} label="Metric" value="M" tempSettings={tempSettings} setTempSettings={setTempSettings} />
                        <UnitSettings id={2} label="Scientific" value="S" tempSettings={tempSettings} setTempSettings={setTempSettings} />
                        <UnitSettings id={3} label="Fahrenheit" value="I" tempSettings={tempSettings} setTempSettings={setTempSettings} />
                     </Col>
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     Close
                  </Button>
                  <Button variant="primary" type="submit">
                     Save Changes
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </div>
   );
}
