import React from 'react'

// libraries
import { Container } from 'react-bootstrap';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

// custom
import Weather from "./components/Weather"

export default function App() {
    return (
        <Container>
            <Weather />
        </Container>
    )
}
