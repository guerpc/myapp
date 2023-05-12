import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { InputGroup, Input, InputGroupText } from 'reactstrap';
import { useState } from 'React';

function Signin() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <InputGroup>
                <InputGroupText>
                    Enter Login Here
                </InputGroupText>
                <Input type="text" value={inputValue} onChange={handleInputChange} />

            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupText>
                    Enter Password Here
                </InputGroupText>
                <Input placeholder="username" />
            </InputGroup>

        </div>
    );
}
export default Signin;

