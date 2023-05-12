import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { InputGroup, Input, InputGroupText } from 'reactstrap';

function Signin() {

    return (
        <div>
            <InputGroup>
                <InputGroupText>
                    Enter Login Here
                </InputGroupText>
                <Input placeholder="username" />
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

