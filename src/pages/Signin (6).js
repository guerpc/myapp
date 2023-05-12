import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { InputGroup, Input, InputGroupText } from 'reactstrap';
import { useId, useState } from 'react';

function Signin() {
    const [count, setCount] = useState(0);


    return (
        <div>
            <InputGroup>
                <InputGroupText>
                    Enter Login Here
                </InputGroupText>
                <label htmlFor={id}>Please specify:</label>
                <Input id={id} value={input} onInput={e => setInput(e.target.value)}/>
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

