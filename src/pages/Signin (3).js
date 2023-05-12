import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { InputGroup, Input, InputGroupText } from 'reactstrap';
import { useState } from 'React';

function Signin() {
    const [vari, setVal] = useState("Hello World")
    const click = () => { alert(vari) }
    const change = event => {
        setVal(event.target.value)
    }
    return (
        <div>
            <InputGroup>
                <InputGroupText>
                    Enter Login Here
                </InputGroupText>
                <Input name="input1" type="text" onChange={(e) => this.onChange(`${e.target.value}`)} />

            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupText>
                    Enter Password Here
                </InputGroupText>
                <Input placeholder="username" />
            </InputGroup>
            <button onClick={click}> Click Me </button>

        </div>
    );
}
export default Signin;

