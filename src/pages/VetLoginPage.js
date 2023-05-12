import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Form, FormGroup, Container, Row, Col, Label, Input, Button } from 'reactstrap';
import LogIn from './Signin.js';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import User from './User';

function VetLoginPage(props, queryTarget) {
    const user = props.user;
    let vari = user.password;
    let vari2 = user.state;

    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <div>The veiw apointments page</div>
                    <div>DISPLAY USER: {user.type} LoginID- ({user.vId})Username- ({user.vUsername}) Password- ({user.vPass})  otherUID- ({user.otherUID})</div>
                    <div></div>
                </Col>
            </Row>
            <Row>

                <Col
                    className="bg-light border"
                    bg="auto"
                >
                    <div>Sign in page</div>

                <LogIn user={user} queryTarget={queryTarget} />
                </Col>
                
            </Row>
            <Row>
                <Col
                    className="bg-light border"
                    sm={{
                        offset: 1,
                        size: 'auto'
                    }}
                >
                    Group 2
                </Col>
                <Col
                    className="bg-light border"
                    sm={{
                        offset: 1,
                        size: 'auto'
                    }}
                >
                    BCS 430w

                </Col>

            </Row>
        </Container>
        );
}
export default VetLoginPage