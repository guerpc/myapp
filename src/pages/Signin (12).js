import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label, Form } from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import { Link } from "react-router-dom";

function SignIn(props, queryTarget) {
    const [vid, setvid] = useState("Blank vid");
    const [vUsername, setvUsername] = useState("Blank Username");
    const [vLogin, setvLogin] = useState("Blank Login");
    const vetLoginInfoTarget = '...';
    const vetInfo = useVetInfo(vetLoginInfoTarget);
    const [signInIndex, setSignInIndex] = useState(null);
    const user = props.user;

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

        } else {
            console.log(`Matching vet info found at index ${matchingIndex}: ${vetInfo[matchingIndex]}`);
            setSignInIndex(matchingIndex);
            console.log(`Matching vet info found at index ${signInIndex}: ${vetInfo[signInIndex]}`);
        }
        user.vId = vetInfo[matchingIndex].VetLoginID;
        user.vUsername = vetInfo[matchingIndex].VetUserName;
        user.vPass =vetInfo[matchingIndex].VetPassword;

        return signInIndex;
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
                            <p>Username: {vetInfo[ifNotNull(signInIndex) || 0].VetUserName}</p>
                            <p>Password: {vetInfo[ifNotNull(signInIndex) || 0].VetPassword}</p>
                            <p>Username: {ifNotNull(vetTemp).vid} - user.vId - {user.vId}</p>
                            <p>Username: {ifNotNull(vetTemp).vid} - user.vUsername - {user.vUsername}</p>
                            <p>Username: {ifNotNull(vetTemp).vid} - user.vPass - {user.vPass}</p>
                            <p>Password: {ifNotNull(vetTemp).vUsername}</p>
                            <p>Password: {ifNotNull(vetTemp).vLogin}</p>
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
                <Button onClick={handleButtonClickAgain}>Click Me!</Button>
                <div>
                    <Link to="/AdminLoginPage" user={user} queryTarget={queryTarget}><Button
                        color="primary"
                        size="lg"
                    >
                        AdminLoginPage
                    </Button></Link>
                </div>
            </Form>



        </div>
    );
}

//                <Button onClick={(userInputUsername, userInputPassword) => { handleButtonClickTwo(userInputUsername, userInputPassword); }}>Click Me Two!</Button>


//            //{vLoginQueryResult && <Quer VetLoginInfo={foundItem} />} // was between buttons             {renderQueryResults()}
//            <Button onClick={handleButtonClickTwo(userInputUsername, userInputPassword)}>Click Me Two!</Button>


export default SignIn;
