import { useState, useEffect } from 'react';
import queryTarget from '../index';

function Quer() {
    const [VetLoginInfo, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>VetLoginInfo</h1>
            <ul>
                {VetLoginInfo.map(item => (
                    <li key={item.VetLoginID}>
                        {item.VetUserName} {item.VetPassword}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Quer;
