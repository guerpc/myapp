import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Form, FormGroup, Container, Row, Col, Label, Input, Button } from 'reactstrap';
import User from './User';
import queryTarget from '../index';

function PageLayout(props, queryTarget) {
    //const [user, setUser] = useState(new User()); // Initialize a new User instance

    //user.phone = "51651669999";
    const user = props.user;

    return (
        <Container>
            <h6>
                xs=“3“
            </h6>
            <Row xs="3">
                <Col className="bg-light border">
                    Column
                    <div>
                        <Link to="/VetLoginPage" user={user} queryTarget={queryTarget}><Button
                            color="primary"
                            size="lg"
                        >
                            VetLoginPage
                        </Button></Link>
                    </div>
                </Col>
                <Col className="bg-light border">
                    Column
                    <div>
                        <Link to="/UserLoginPage"><Button
                            color="primary"
                            size="lg"
                        >
                            UserLoginPage
                        </Button></Link>
                    </div>
                </Col>
                <Col className="bg-light border">
                    Column
                    <div>
                        <Link to="/AdminLoginPage" user={user} queryTarget={queryTarget}><Button
                            color="primary"
                            size="lg"
                        >
                            AdminLoginPage
                        </Button></Link>
                    </div>
                </Col>

            </Row>

        </Container>
        
        );
}
export default PageLayout;