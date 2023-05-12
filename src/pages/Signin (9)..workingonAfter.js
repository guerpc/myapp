import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label, Form } from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import { Link } from "react-router-dom";

function AfterSignIn(props, queryTarget) {
    const [vid, setvid] = useState("Blank vid");
    const [vUsername, setvUsername] = useState("Blank Username");
    const [vLogin, setvLogin] = useState("Blank Login");
    const vetLoginInfoTarget = '...';
    const vetInfo = useVetInfo(vetLoginInfoTarget);
    const [signInIndex, setSignInIndex] = useState(null);
    const vetTemp = {
        vid,
        vUsername,
        vLogin
    };

    const updateVet = (item) => {
        vetTemp.vid = item.VetLoginID;
        vetTemp.vUsername = item.VetUserName;
        vetTemp.vLogin = item.VetPassword;
    }

    const user = props.user;
    let vari = user.email;
    let variH = vari;
    user.email = "testing";
    let vari2 = user.email;
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



    function renderQueryResults(vetTemp) {
        if (vLoginQueryResult) {
            return vLoginQueryResult.map(item => {
                return (
                    <div key={item.VetLoginID}>
                        <p>item.VetLoginID: {item.VetLoginID}</p>
                        <p>Username: {item.VetUserName}</p>
                        <p>Password: {item.VetPassword}</p>
                        <div>testing: {vetTemp.vUsername}</div>
                    </div>
                );
            });
        }
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
        setvid(vetInfo[matchingIndex].VetLoginID);
        setvUsername(vetInfo[matchingIndex].VetUserName);
        setvLogin(vetInfo[matchingIndex].VetPassword);

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
                            <p>Username: {ifNotNull(vetTemp).vid}</p>
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
                    <Link to="/AdminLoginPage"><Button
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


export default AfterSignIn;
