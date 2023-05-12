import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect  } from 'react';
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label, Form } from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import { Link, useNavigate } from "react-router-dom";

function SignIn(props, queryTarget) {
    const [vid, setvid] = useState("Blank vid");
    const [vUsername, setvUsername] = useState("Blank Username");
    const [vLogin, setvLogin] = useState("Blank Login");
    const vetLoginInfoTarget = '...';
    const vetInfo = useVetInfo(vetLoginInfoTarget);
    const [signInIndex, setSignInIndex] = useState(null);
    const user = props.user;
    const navigate = useNavigate();

    const [validSignIn, setValidSignIn] = useState("");
    const vetTemp = {
        vid: "vid in signin.js",
        vUsername: "vUsername in signin.js",
        vLogin: "vLogin in signin.js"
    };


    const [vLoginQueryResult, setVLoginQueryResult] = useState(null);
    const [vAccQueryResult, setVAccQueryResult] = useState(null);
    const vetAccTarget = 'someValue';

    const [userInputUsername, setUserInputUsername] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");


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





    const ifNotNull = (variable) => {
        if (variable !== null) {
            return variable;
        } else {
            // handle the case where variable is null
            return null;
        }
    }



    function findMatchingVetInfoIndex(userInputUsername, userInputPassword, vetInfo) {
        for (let i = 0; i < vetInfo.length; i++) {
            if (userInputUsername === vetInfo[i].VetUserName && userInputPassword === vetInfo[i].VetPassword) {
                return i;
            }
        }
        return -1; // indicates no matching vet info found
    }


    const handleButtonClickAgain = () => {
        const matchingIndex = findMatchingVetInfoIndex(userInputUsername, userInputPassword, vetInfo);
        if (matchingIndex === -1) {
            console.log('No matching vet info found.');
            setSignInIndex(null);
            setValidSignIn("signin not valid");

        } else {
            console.log(`Matching vet info found at index ${matchingIndex}: ${vetInfo[matchingIndex]}`);
            setSignInIndex(matchingIndex);
            console.log(`Matching vet info found at index ${signInIndex}: ${vetInfo[signInIndex]}`);
            user.vId = vetInfo[matchingIndex].VetLoginID;
            user.vUsername = vetInfo[matchingIndex].VetUserName;
            user.vPass = vetInfo[matchingIndex].VetPassword;

            navigate('/AdminLoginPage', { user, queryTarget });
            return signInIndex;

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
