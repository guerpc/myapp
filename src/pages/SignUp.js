import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import { BrowserRouter, Route, Link, Routes, useNavigate } from "react-router-dom";
import User from './User';
import axios from 'axios';
import queryTarget from '../index';

function SignUp(props, queryTarget) {
    const user = props.user;
    const [VetUserName, setVetUserName] = useState('');
    const [VetPassword, setVetPassword] = useState('');
    const [UserUserName, setUserUserName] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedDropDown, setselectedDropDown] = useState("User Type");
    const [validSignIn, setValidSignIn] = useState("");
    const navigate = useNavigate();

    const vetLoginInfoTarget = '...';
    const vetInfo = useVetInfo(vetLoginInfoTarget);
    const petOwnerLoginInfoTarget = '...';
    const petOwnerInfo = usePetOwnerInfo(petOwnerLoginInfoTarget);


    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleDropdownSelect = (event) => {
        const value = event.target.value;
        setselectedDropDown(value);
    }

    function useVetInfo(vetLoginInfoTarget) {
        const [vetInfo, setVetInfo] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/VetLoginInfo?VetLoginInfoTable=${vetLoginInfoTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setVetInfo(data);
                    }
                });
        }, []);
        return vetInfo;
    }
    function usePetOwnerInfo(petOwnerLoginInfoTarget) {
        const [petOwnerInfo, setPetOwnerInfo] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/UserLogininfo?PetOwnerLoginInfoTable=${petOwnerLoginInfoTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setPetOwnerInfo(data);
                    }
                });
        }, []);
        return petOwnerInfo;
    }
    const ifNotNull = (variable) => {
        if (variable !== null) {
            return variable;
        } else {
            // handle the case where variable is null
            return null;
        }
    }



    function findMatchingVetInfoIndex(VetUserName, vetInfo) {
        for (let i = 0; i < vetInfo.length; i++) {
            if (VetUserName === vetInfo[i].VetUserName) {
                return i;
            }
        }
        return -1; // indicates no matching vet info found
    }


    function findMatchingPetOwnerInfoIndex(UserUserName, petOwnerInfo) {
        for (let i = 0; i < petOwnerInfo.length; i++) {
            if (UserUserName === petOwnerInfo[i].UserUserName) {
                return i;
            }
        }
        return -1; // indicates no matching owner info found
    }
    const handleButtonClickElse = () => {
        setValidSignIn("Invalid Signin: Pick a User Type");
    };

    const handleSubmitVet = async (event) => {
        event.preventDefault();
        const matchingIndex = findMatchingVetInfoIndex(VetUserName, vetInfo);
        if (matchingIndex != -1) {
            setValidSignIn("Please choose a different Vet User Name to log in with.")
            return validSignIn;
        }
        {
            try {

            const response = await fetch('http://localhost:3001/addVet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    VetUserName: VetUserName,
                    VetPassword: VetPassword


                })

            });

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error(error);
            }
            navigate('/Connect', { user, queryTarget });

        }
    };

    const handleSubmitPetOwner = async (event) => {
        event.preventDefault();
        const matchingIndex = findMatchingPetOwnerInfoIndex(UserUserName, petOwnerInfo);

        if (matchingIndex != -1) {
            setValidSignIn("Please choose a different Pet User Name to log in with.")
            return validSignIn;
        }
        {
            try {
                const response = await fetch('http://localhost:3001/addPetOwner', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        UserUserName: UserUserName,
                        UserPassword: UserPassword


                    })

                });

                const result = await response.json();
                console.log(result);


            } catch (error) {
                console.error(error);
            }
            navigate('/Connect', { user, queryTarget }); 

        }
    };
    return (
        <Container>
        <div>
            <h1>Sign up Page</h1>
            <Form>
                <FormGroup>
                    <Label for="VetUserName">Create your Log-in</Label>
                        <Input type="text" name="VetUserName" id="VetUserName" onChange={(event) => { setVetUserName(event.target.value); setUserUserName(event.target.value); }} />
                </FormGroup>
                <FormGroup>
                    <Label for="VetPassword">Create your password</Label>
                        <Input type="text" name="VetPassword" id="VetPassword" onChange={(event) => { setVetPassword(event.target.value); setUserPassword(event.target.value); }}/>
                </FormGroup>
                    <div>
                    <Label for="UserType">Choose your account type</Label>

                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selectedDropDown}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleDropdownSelect} value="Pet Owner">Pet Owner</DropdownItem>
                            <DropdownItem onClick={handleDropdownSelect} value="Veterinarian">Veterinarian</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                    <br/>
                    <Button onClick={selectedDropDown === 'Veterinarian' ? handleSubmitVet : (selectedDropDown === 'Pet Owner' ? handleSubmitPetOwner : handleButtonClickElse)}>Sign Up</Button>
                    <div>
                        {validSignIn}
                    </div>
                    <br />
                    <Link to="/" user={user} queryTarget={queryTarget}><Button>Home</Button></Link>

            </Form>
            </div>
        </Container>
    );
}                    //<Button type="submit" color="primary" name="submit">Submit</Button>
 
export default SignUp;