import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import User from './User';

function SignUp(props) {

    const { user } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [id, setId] = useState("");
    const [userType, setUserType] = useState("");
    const [phone, setPhone] = useState("");

    //
    //  const handleUserChange = (event) => {
    //     setUser(event.target.value);
    //};
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
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

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleUserUpdate = (event) => {
        event.preventDefault();
        setEmail(document.getElementById('exampleEmail').value);
        setPassword(document.getElementById('examplePassword').value);
        setAddress(document.getElementById('exampleAddress').value);
        setCity(document.getElementById('exampleCity').value);
        setState(document.getElementById('exampleState').value);
        setZip(document.getElementById('exampleZip').value);
        setPhone(document.getElementById('examplePhone').value);
        setUserType(document.getElementById('exampleSelect').value);
    };

    const handleUserDeconstruction = (event) => {
        event.preventDefault();
        const { email, password, address, city, state, zip, id, userType, phone } = user;
    };

    return (
        <Container >

            <User
                email="test@example.com"
                password="testpass"
                address="123 Main St"
                city="Anytown"
                userState="CA"
                zip="12345"
                id="1234"
                userType="admin"
                phone="555-1234"
            />

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
                                value={state}
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
                                value={zip}
                            />
                        </FormGroup>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePhone">Phone Number</Label>
                            <Input
                                id="examplePhone"
                                name="Phone"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleSelect">User Type</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>Pet Owner</option>
                                <option>Veterinarian</option>
                                <option>Admin</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Button
                        color="primary"
                        size="lg"
                        onChange={handleUserUpdate}
                    >
                        Update User Class
                    </Button>
                    <Label for="ex" >phone label {user.phone}</Label>
                </Row>

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