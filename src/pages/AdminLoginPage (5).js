import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Form, FormGroup, Container, Row, Col, Label, Input, Button } from 'reactstrap';
import LogIn from './Signin.js';
import { useNavigate } from "react-router-dom";
import PageLayout from './PageLayout';
import User from './User';
import queryTarget from '../index';
import AfterSignIn from './AfterSignIn';

function AfterVetSignIn(props, queryTarget) {
    const navigate = useNavigate();
    const user = props.user;

    const handleSignOut = () => {
        user.type = 'Signed Out - Type';
        user.vPass = 'Signed Out - Type';
        user.vId = 'Signed Out - Type';
        user.vUsername = 'Signed Out - Type';
        navigate('/', { state: { user: user, queryTarget: queryTarget } });
    };


    return (
        <Container>
            <Row>               
                <Col className="bg-light border">
                    <div>The veiw apointments page</div>
                    <div>DISPLAY USER: {user.type} ID- ({user.vId})Username- ({user.vUsername}) Password- ({user.vPass})</div>
                    <div></div>
                </Col>
            </Row>

            <Row>

                <Col
                    className="bg-light border"
                    bg="auto"
                >
                    .col-auto - variable width content
                    <AfterSignIn user={user} />

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
                    <Button onClick={handleSignOut}>Sign out</Button>

                </Col>

            </Row>
        </Container>




    );
}
export default AfterVetSignIn