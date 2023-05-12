import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import User from './User';

function SignUp(props) {
    let vari = "0";

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
                    />
                </FormGroup>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleCity">City</Label>
                            <Input
                                id="exampleCity"
                                name="city"
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
                    >
                        Update User Class
                    </Button>
                    <Label for="ex" >phone label </Label>
                </Row>
                <div>
                    <p>Email: {vari}</p>
           
                </div>
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