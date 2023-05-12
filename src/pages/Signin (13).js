import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect  } from 'react';
import {
    InputGroup, Input,
    Dropdown,DropdownToggle,
    DropdownMenu, DropdownItem,
    InputGroupText, Button, FormGroup, Label, Form
} from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function SignIn(props, queryTarget) {
    const [vid, setvid] = useState("Blank vid");
    const [vUsername, setvUsername] = useState("Blank Username");
    const [vLogin, setvLogin] = useState("Blank Login");
    //pet Owner Targets
    const petOwnerLoginInfoTarget = '...';
    const petOwnerInfo = usePetOwnerInfo(petOwnerLoginInfoTarget);
    ////
    //Vet Targets
    const vetLoginInfoTarget = '...';
    const vetInfo = useVetInfo(vetLoginInfoTarget);
    ////
    const [signInIndex, setSignInIndex] = useState(null);
    const user = props.user;
    const navigate = useNavigate();
    //dropdown
    const [selectedDropDown, setselectedDropDown] = useState("User Type");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleDropdownSelect = (event) => {
        const value = event.target.value;
        setselectedDropDown(value);
    }
    let dropdownCondition = dropdownOpen;


    const [validSignIn, setValidSignIn] = useState("");



    const [vLoginQueryResult, setVLoginQueryResult] = useState(null);
    const [vAccQueryResult, setVAccQueryResult] = useState(null);
    const vetAccTarget = 'someValue';

    const [userInputUsername, setUserInputUsername] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");


    user.type = selectedDropDown;

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

    function whichUser() {

            
     
    }


    function findMatchingVetLoginInfoIndex(userInputUsername, userInputPassword, vetInfo) {

        for (let i = 0; i < vetInfo.length; i++) {
            if (userInputUsername === vetInfo[i].VetUserName && userInputPassword === vetInfo[i].VetPassword) {
                return i;
            
        }
    }
        return -1; // indicates no matching vet info found
    }

    function findMatchingPetOwnerLoginInfoIndex(userInputUsername, userInputPassword, petOwnerInfo) {
            for (let i = 0; i < petOwnerInfo.length; i++) {
                if (userInputUsername === petOwnerInfo[i].UserUserName && userInputPassword === petOwnerInfo[i].UserUserName) {
                    return i;
                }
            }
       
        return -1; // indicates no matching vet info found
    }


    const handleButtonClickAgain = () => {
        let matchingIndex = -1;
        if (user.type === "Veterinarian") {
             matchingIndex = findMatchingVetLoginInfoIndex(userInputUsername, userInputPassword, vetInfo);
        }
        else if (user.type === "Pet Owner") {
             matchingIndex = findMatchingPetOwnerLoginInfoIndex(userInputUsername, userInputPassword, petOwnerInfo);
        }
       
        if (matchingIndex === -1) {
            console.log('No matching vet info found.');
            setSignInIndex(null);
            setValidSignIn("signin not valid");
            
        } else {
            if (user.type === "Veterinarian") {
                console.log(`Matching vet info found at index ${matchingIndex}: ${vetInfo[matchingIndex]}`);
                setSignInIndex(matchingIndex);
                console.log(`Matching vet info found at index ${signInIndex}: ${vetInfo[signInIndex]}`);
                user.vId = vetInfo[matchingIndex].VetLoginID;
                user.vUsername = vetInfo[matchingIndex].VetUserName;
                user.vPass = vetInfo[matchingIndex].VetPassword;

                navigate('/AdminLoginPage', { user, queryTarget });
                return signInIndex;
            }
            if (user.type === "Pet Owner") {
                console.log(`Matching vet info found at index ${matchingIndex}: ${petOwnerInfo[matchingIndex]}`);
                setSignInIndex(matchingIndex);
                console.log(`Matching vet info found at index ${signInIndex}: ${petOwnerInfo[signInIndex]}`);
                user.vId = petOwnerInfo[matchingIndex].UserLoginID;
                user.vUsername = petOwnerInfo[matchingIndex].UserUserName;
                user.vPass = petOwnerInfo[matchingIndex].UserPassword;

                navigate('/AdminLoginPage', { user, queryTarget });
                return signInIndex;

            }
        }

        return signInIndex, validSignIn;
    };


    return (
        <div>

            <Form>

                <FormGroup>

                    <Label for="userInputUsername">userInputUsername:</Label>
                    <Input type="userInputUsername" id="userInputUsername" value={userInputUsername}
                        onChange={(event) => setUserInputUsername(event.target.value)} />
                </FormGroup>
                <div>
                    {vetInfo ? (
                        <div>

                            <p>Current: user.vId - {user.vId}</p>
                            <p>Current: user.vUsername - {user.vUsername}</p>
                            <p>Current: user.vPass - {user.vPass}</p>
                            <p>Current: user.type - {user.type}</p>

                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <FormGroup>
                    <Label for="userInputPassword">Password:</Label>
                    <Input type="userInputPassword" id="userInputPassword" value={userInputPassword}
                        onChange={(event) => setUserInputPassword(event.target.value)} />
                </FormGroup>
                <div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret>
                             {selectedDropDown}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleDropdownSelect} value="Pet Owner">Pet Owner</DropdownItem>
                            <DropdownItem onClick={handleDropdownSelect} value="Veterinarian">Veterinarian</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <br/>
                <Button onClick={handleButtonClickAgain}>Sign In</Button>
                <div>
                    {validSignIn}
                </div>
            </Form>



        </div>
    );
}

//                <Button onClick={(userInputUsername, userInputPassword) => { handleButtonClickTwo(userInputUsername, userInputPassword); }}>Click Me Two!</Button>


//            //{vLoginQueryResult && <Quer VetLoginInfo={foundItem} />} // was between buttons             {renderQueryResults()}
//            <Button onClick={handleButtonClickTwo(userInputUsername, userInputPassword)}>Click Me Two!</Button>


export default SignIn;
