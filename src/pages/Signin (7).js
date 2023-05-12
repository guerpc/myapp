import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { InputGroup, Input, InputGroupText, Button } from 'reactstrap';

function Signin() {
    const [username, setUsername] = useState("");
    const [passwordPlaceholder, setPasswordPlaceholder] = useState("");

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handleButtonClick = () => {
        setPasswordPlaceholder(username);
    };

    return (
        <div>
            <InputGroup>
                <InputGroupText>
                    Enter Login Here
                </InputGroupText>
                <Input
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupText>
                    Enter Password Here
                </InputGroupText>
                <Input
                    placeholder={passwordPlaceholder || "password"}
                />
            </InputGroup>
            <Button onClick={handleButtonClick}>Click Me!</Button>
        </div>
    );
}

export default Signin;
