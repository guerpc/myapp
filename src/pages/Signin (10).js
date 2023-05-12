import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { InputGroup, Input, InputGroupText, Button } from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';

function Signin(props, queryTarget) {
    const [vid, setvid] = useState("Blank vid");
    const [vUsername, setvUsername] = useState("Blank Username");
    const [vLogin, setvLogin] = useState("Blank Login");
    let vetInfo = [];

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
    const vetLoginInfoTarget = 'someValue';
    const vetAccTarget = 'someValue';


    const [userInputUsername, setUserInputUsername] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");

    // if (vLoginQueryResult) {
    //    vLoginQueryResult.map(item => {
    //         vLid = item.VetLoginID;
    //         vUName = item.VetUserName;
    //         vPass = item.VetPassword;
    //      });
    //   }


    const handleUsernameChange = event => {
        setUserInputUsername(event.target.value);
    };
    const handlePasswordChange = event => {
        setUserInputPassword(event.target.value);
    };



    const handleButtonClickTwo = (userInputUsername, userInputPassword) => {
        console.log(userInputUsername, userInputPassword);
        const uUsernameInput = userInputUsername;
        const uPWinput = userInputPassword;
        console.log('uUsernameInput:', uUsernameInput);

        fetch(`http://localhost:3001/VetLoginInfo?VetLoginInfoTable=${vetLoginInfoTarget}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                       
                        if (data[i].VetUserName == userInputUsername && data[i].VetPassword == userInputPassword) {
                            handleSetVetInfo(data[i]);
                            console.log(data[i]);

                        };
                    }
                }
            });
    };


    const getVetInfo = () => {
        fetch(`http://localhost:3001/VetLoginInfo?VetLoginInfoTable=${vetLoginInfoTarget}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    vetInfo = data; // assign fetched data to the object
                }
            });
    };



    const handleSetVetInfo = (vetInfo) => {
        setvid(vetInfo.VetLoginID);
        setvLogin(vetInfo.VetPassword);
        setvUsername(vetInfo.VetUserName);
    };


    const handleButtonClick = () => {
        fetch(`http://localhost:3001/VetAccountInfo?VetAccountInfoTable=${vetAccTarget}`)
            .then(res => res.json())
            .then(data => setVAccQueryResult(data))
            .catch(err => console.error(err));
    };


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

    //           <renderQueryResults/>
    const ifUserPass = (data, userInputUsername, userInputPassword) => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (item.VetUserName === userInputUsername && item.VetPassword === userInputPassword) {
                    setvid(item.VetLoginID);
                    setvUsername(item.VetUserName);
                    setvid(item.VetPassword);

                }
            }
        }
    };


    return (

        <div>
            <InputGroup>
                <InputGroupText>
                    Enter Login Here vetTemp : {JSON.stringify(ifNotNull(vetInfo))}
                    <br />
                    Enter Login Here vUsername : {ifNotNull(vUsername)}
                    <br />
                    Enter Login Here : {vari2}
                    <br />

                    Enter userInputUsername Here : {userInputUsername}
                    <br />

                    Enter userInputPassword Here : {userInputPassword}


                </InputGroupText>
                <input
                    type="text" value={userInputUsername} onChange={(event)
                        => setuserInputUsername(event.target.value)} />

            </InputGroup>

            <br />
            <InputGroup>
                <InputGroupText>
                    Enter Password Here
                </InputGroupText>
                <input
                    type="password" value={userInputPassword} onChange={(event)
                        => setuserInputPassword(event.target.value)} />

                
            </InputGroup>

            <Button onClick={handleButtonClick}>Click Me!</Button>
            <Button onClick={(userInputUsername, userInputPassword) => { handleButtonClickTwo(userInputUsername, userInputPassword);  }}>Click Me Two!</Button>

            {renderQueryResults(vetTemp)}
        </div>
    );
}
//            //{vLoginQueryResult && <Quer VetLoginInfo={foundItem} />} // was between buttons             {renderQueryResults()}
//            <Button onClick={handleButtonClickTwo(userInputUsername, userInputPassword)}>Click Me Two!</Button>
 

export default Signin;
