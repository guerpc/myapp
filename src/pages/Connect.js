import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {
    InputGroup, Input,
    Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem,
    InputGroupText, Container, Button, FormGroup, Label, Form
} from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import { Link, useNavigate } from "react-router-dom";

function Connect(user, queryTarget) {
        return (
            <Container>
                <h1>Thanks For Signing up!</h1>

                 <Link to="/" user={user} queryTarget={queryTarget}><Button>Home</Button></Link>

                </Container>
        );
    }

export default Connect;