import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { InputGroup, Input, InputGroupText, Button } from 'reactstrap';
import Quer from './Quer';
import User from './User';

function Signin(props) {
    const user = props.user;
    let vari = user.email;
    let variH = vari;
    user.email = "testing";
    let vari2 = user.email;
    const [username, setUsername] = useState("");
    const [queryResult, setQueryResult] = useState(null);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handleButtonClick = () => {
        fetch(`http://localhost:3001/VetLoginInfo?username=${username}`)
            .then(res => res.json())
            .then(data => setQueryResult(data))
            .catch(err => console.error(err));
    };
    function renderQueryResults() {                                                                                     
        if (queryResult) {
            return queryResult.map(item => {


                const username = item.VetUserName;
                userInputUsername = item.VetPassword;
                suerInputPassword = username;

                return (
                    <div key={item.VetLoginID}>
                        <p>item.VetLoginID: {item.VetLoginID}</p>
                        <p>Username: {username}</p>
                        <p>Password: {item.VetPassword}</p>
                    </div>
                );
            });
        } else {
            return null;                                                                                          
        }

    }


    return (

        <div>
            <renderQueryResults/>

            <InputGroup>
                <InputGroupText>
                    Enter Login Here : {vari}
                    Enter Login Here : {vari2}


                </InputGroupText>
                <Input
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </InputGroup>

            {renderQueryResults()}
            <br />
            <InputGroup>
                <InputGroupText>
                    Enter Password Here
                </InputGroupText>
                <Input
                    placeholder={queryResult || "password"}
                />
                
            </InputGroup>
            <Button onClick={handleButtonClick}>Click Me!</Button>
            {queryResult && <Quer VetLoginInfo={queryResult} />}
            

        </div>
    );
}

export default Signin;
