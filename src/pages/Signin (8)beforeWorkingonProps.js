import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { InputGroup, Input, InputGroupText, Button } from 'reactstrap';
import Quer from './Quer';

function Signin() {
    const [username, setUsername] = useState("");
    const [queryResult, setQueryResult] = useState(null);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handleButtonClick = () => {
        fetch(`http://localhost:3001/users?username=${username}`)
            .then(res => res.json())
            .then(data => setQueryResult(data))
            .catch(err => console.error(err));
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
                    placeholder={queryResult || "password"}
                />
            </InputGroup>
            <Button onClick={handleButtonClick}>Click Me!</Button>
            {queryResult && <Quer users={queryResult} />}
        </div>
    );
}

export default Signin;
