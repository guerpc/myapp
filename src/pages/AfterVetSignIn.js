import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Form, FormGroup, Container, Row, Col, Label, Input, Button } from 'reactstrap';
import LogIn from './Signin.js';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import PageLayout from './PageLayout';
import User from './User';
import queryTarget from '../index';
import AfterSignIn from './AfterSignIn';

function AdminLoginPage(props, queryTarget) {
    const user = props.user;



    return (
        <Container>
            <div>This is going to be the veiew vet apointments page</div>

            <Row md="3">
                <Col className="bg-light border">
                    Column
                    DISPLAY USER:
                    <p>user.vId - {user.vId}</p>
                    <p>user.vPass - {user.vPass}</p>
                    <p>user.vUsername - {user.vUsername}</p>
                    <div>

                    </div>
                </Col>
                <Col className="bg-light border">
                    Column
                    <div>

                    </div>
                </Col>
                <Col className="bg-light border">
                    Column
                    <div>

                    </div>
                </Col>

            </Row>
            <AfterSignIn user={user} />

            <br />
            <Row md="1">
            </Row>
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
                    <br />
                    <Row md="1">
                        <Label>Logged in as: </Label>
                    </Row>
                    <br />
                </Col>

            </Row>

        </Container>
    );
}
export default AdminLoginPage