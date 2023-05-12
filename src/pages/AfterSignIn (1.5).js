import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label, Form, Container, Row, Col, Table } from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AfterSignIn(props, queryTarget, vetTemp) {
    const user = props.user;
    const [clickedDate, setClickedDate] = useState(null);
    //let clickedDate = "";
    const vetAppInfoTarget = '...';
    const vetAppInfo = useAppVetInfo(vetAppInfoTarget);
    const petOwnerAppInfoTarget = '...';
    const petOwnerAppInfo = useAppPetOwnerInfo(petOwnerAppInfoTarget);
    const [selectedDate, setSelectedDate] = useState(null);

    const [userInputUsername, setUserInputUsername] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");

    function useAppVetInfo(vetAppInfoTarget) {
        const [vetAppInfo, setVetAppInfo] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/AppointmentInfo?AppointmentInfoTable=${vetAppInfoTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setVetAppInfo(data);
                    }
                });
        }, []);
        return vetAppInfo;
    }

    function useAppPetOwnerInfo(vetAppInfoTarget) {
        const [petOwnerAppInfo, setpetOwnerAppInfo] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/AppointmentInfo?AppointmentInfoTable=${petOwnerAppInfoTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setpetOwnerAppInfo(data);
                    }
                });
        }, []);
        return petOwnerAppInfo;
    }
    const ifNotNull = (variable) => {
        if (variable !== null) {
            return variable;
        } else {
            // handle the case where variable is null
            return null;
        }
    }

    function AppointmentsTable(vetAppInfoTarget) {
        const vetAppInfo = useAppVetInfo(vetAppInfoTarget);
        const petOwnerAppInfo = useAppPetOwnerInfo(petOwnerAppInfoTarget);

        if (!vetAppInfo) {
            return <div>Loading...</div>;
        }
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Veterinarian</th>
                                    <th>Pet</th>
                                    <th>Description</th>
                                    <th>Cancelled</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.type === "pet Owner" ?
                                    petOwnerAppInfo
                                        .filter((appointment) => appointment.UserLoginID === user.vId)
                                        .map((appointment) => (
                                            <tr key={appointment.AppointmentID}>
                                                <td>{appointment.Date}</td>
                                                <td>{appointment.Time}</td>
                                                <td>{appointment.VetID}</td>
                                                <td>{appointment.PetID}</td>
                                                <td>{appointment.AppointDesc}</td>
                                                <td>{appointment.Cancelled ? 'Cancelled' : 'Not Cancelled'}</td>
                                            </tr>
                                        ))
                                    :
                                    vetAppInfo
                                        .filter((appointment) => appointment.VetID === user.vId)
                                        .map((appointment) => (
                                            <tr key={appointment.AppointmentID}>
                                                <td>{appointment.Date}</td>
                                                <td>{appointment.Time}</td>
                                                <td>{appointment.VetID}</td>
                                                <td>{appointment.PetID}</td>
                                                <td>{appointment.AppointDesc}</td>
                                                <td>{appointment.Cancelled ? 'Cancelled' : 'Not Cancelled'}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>

                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }

    const MyCalendar = () => {
        const [selectedDate, setSelectedDate] = useState(new Date());

        const handleDateChange = (date) => {
            setClickedDate(selectedDate.toISOString().split("T")[0])

            setSelectedDate(date);
        };

        return (
            
            <Calendar onChange={handleDateChange} value={selectedDate}  />
            
        );
    };

    return (
        <div>

            <div>
                {vetAppInfo ? (
                    <div>

                        <p>User ID: {user.vId}</p>
                        <p>Username: {user.vUsername}</p>
                        <p>Password: {user.vPass}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {AppointmentsTable(vetAppInfo, vetAppInfoTarget)}
            <MyCalendar />
            displaying selected date {clickedDate}
        </div>
    );
}

export default AfterSignIn;
