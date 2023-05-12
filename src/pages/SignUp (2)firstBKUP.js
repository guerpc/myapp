import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import User from './User';

function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [option, setOption] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleAddress2Change = (event) => {
        setAddress2(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleZipChange = (event) => {
        setZip(event.target.value);
    };

    const handleOptionChange = (event) => {
        setOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here


    };

    return (
        <Container >



            <h1>this is the SignUp</h1>

            <br />

            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="with a placeholder"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="password placeholder"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleAddress">Address</Label>
                    <Input
                        id="exampleAddress"
                        name="address"
                        placeholder="1234 Main St"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleAddress2">Testing Address{address}</Label>
                    <Label for="exampleAddress2">Address 2</Label>
                    <Input
                        id="exampleAddress2"
                        name="address2"
                        placeholder="Apartment, studio, or floor"
                        value={address2}
                        onChange={handleAddress2Change}
                    />
                </FormGroup>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleCity">City</Label>
                            <Input
                                id="exampleCity"
                                name="city"
                                value={city}
                                onChange={handleCityChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleState">
                                State
                            </Label>
                            <Input
                                id="exampleState"
                                name="state"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="exampleZip">
                                Zip
                            </Label>
                            <Input
                                id="exampleZip"
                                name="zip"
                            />
                        </FormGroup>

                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Pet Owner</option>
                        <option>Veterinarian</option>
                        <option>Admin</option>
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                    />
                    <Label
                        check
                        for="exampleCheck"
                    >
                        Check me out
                    </Label>
                </FormGroup>
                <Button>
                    Sign in
                </Button>
            </Form>
            <br />
            <Row md="2">
                <Col className="bg-light border">
                    <div>
                        <Link to="/SignUp"><Button
                            color="primary"
                            size="lg"
                        >
                            Sign up
                        </Button></Link>
                    </div>
                </Col>
                <Col className="bg-light border">

                    <div>
                        <Link to="/"><Button
                            color="primary"
                            size="lg"
                        >
                            Home Screen
                        </Button></Link>
                    </div>
                </Col>

            </Row>
        </Container >
    );
}

export default SignUp;