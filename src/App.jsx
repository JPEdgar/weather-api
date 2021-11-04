import React, { useState } from "react";

// libraries
import { Container, Button } from "react-bootstrap";

// styles
import "bootstrap/dist/css/bootstrap.min.css";

// custom
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
   const [show, setShow] = useState(true);

   const toggleShow = () => {
      setShow((curr) => !curr);
   };

   return (
      <Container style={{ backgroundColor: "rgb(240, 240, 240)" }}>
         <Button size="sm" className="mb-3" onClick={toggleShow}>
            Toggle Show
         </Button>
         {show ? <Home /> : <About />}
      </Container>
   );
}
