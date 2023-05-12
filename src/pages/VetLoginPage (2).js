import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Form, FormGroup, Container, Row, Col, Label, Input, Button } from 'reactstrap';
import LogIn from './Signin.js';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import User from './User';

function VetLoginPage(props, queryTarget) {
    const user = props.user;


    return (
        <Container>
            <div>This is VetLoginPage</div>
            <h6>
                md=“3“
            </h6>
            <Row md="3">
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
                <Col className="bg-light border">
                    Column
                    <div>
                       
                    </div>
                </Col>

            </Row>
            <br />
            <Row md="1">
                <LogIn user={user} queryTarget={queryTarget} />
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
                    </Row>
                    <br />
                </Col>

            </Row>

        </Container>
        );
}
export default VetLoginPage