import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label, Form, Container, Row, Col, Table } from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Cal from './Cal';
import CalTwo from './CalTwo';
function AfterSignIn(props, queryTarget, vetTemp) {
    const user = props.user;
    const [clickedDate, setClickedDate] = useState(null);
    //let clickedDate = "";
    const vetAppInfoTarget = '...';
    const vetAppInfo = useAppVetInfo(vetAppInfoTarget);
    const vetInfoTableTarget = '...';
    const vetInfoTable = useVetInfoTable(vetInfoTableTarget);
    const petOwnerInfoTableTarget = '...';
    const petOwnerInfoTable = usePetOwnerInfoTable(petOwnerInfoTableTarget);
    const [selectedDate, setSelectedDate] = useState(null);

    const [userInputUsername, setUserInputUsername] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [otherUID, setotherUID] = useState(props.otherUID);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    function showCal() {



        return (
            <div>
                

            </div>
        );
    }

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


    function useVetInfoTable(vetInfoTableTarget) {
        const [vetInfoTable, setvetInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/VetAccountInfo?VetAccountInfoTable=${vetInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setvetInfoTable(data);
                    }
                });
        }, []);
        return vetInfoTable;
    }

    function usePetOwnerInfoTable(petOwnerInfoTableTarget) {
        const [petOwnerInfoTable, setpetOwnerInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/UserAccountInfo?UserAccountInfoTable=${petOwnerInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setpetOwnerInfoTable(data);
                    }
                });
        }, []);
        return petOwnerInfoTable;
    }

    function findVetIDinVetInfo(vetInfoTable, user) {
        if (!vetInfoTable) {
            return -1; // indicates null or undefined vetInfoTable
        }
        for (let i = 0; i < vetInfoTable.length; i++) {
            if (user.vId === vetInfoTable[i].VetLoginID) {

                return i;

            }
        }
        return -5; // indicates no matching vet info found
    }

    function findpetOwnerIDinPetOwnerInfo(petOwnerInfoTable, user) {
        if (!petOwnerInfoTable) {
            return -1; // indicates null or undefined vetInfoTable
        }
        for (let i = 0; i < petOwnerInfoTable.length; i++) {
            if (user.vId === petOwnerInfoTable[i].UserLoginID) {

                return i;

            }
        }
        return -5; // indicates no matching vet info found
    }


    function settingvetUID(vetInfoTable, user) {
        const findIndex = findVetIDinVetInfo(vetInfoTable, user);
        if (findIndex >= 0) {
            user.otherUID = vetInfoTable[findIndex].VetID;
        }
        return user.otherUID;
    }


    function settingpetUID(petOwnerInfoTable, user) {
        const findIndex = findpetOwnerIDinPetOwnerInfo(petOwnerInfoTable, user);
        if (findIndex >= 0) {
            user.otherUID = petOwnerInfoTable[findIndex].UserID;
        }
        return user.otherUID;
    }


    const ifNotNull = (variable) => {
        if (variable !== null) {
            return variable;
        } else {
            // handle the case where variable is null
            return null;
        }
    }
  

    function AppointmentsTable(vetAppInfoTarget, vetInfoTableTarget) {
        const vetAppInfo = useAppVetInfo(vetAppInfoTarget);
        const vetInfoTable = useVetInfoTable(vetInfoTableTarget);

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
                                {user.type === "Pet Owner"
                                    ? vetAppInfo
                                        .filter((appointment) => appointment.UserID === user.otherUID)
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
                                    : vetAppInfo
                                        .filter((appointment) => appointment.VetID === user.otherUID)
                                        .map((appointment) => (
                                            <tr key={appointment.AppointmentID}>
                                                <td>{appointment.Date}</td>
                                                <td>{appointment.Time}</td>
                                                <td>{appointment.VetID}</td>
                                                <td>{appointment.PetID}</td>
                                                <td>{appointment.AppointDesc}</td>
                                                <td>{appointment.Cancelled ? 'Cancelled' : 'Not Cancelled'}</td>
                                            </tr>
                                        ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }



    //run swap function here
    if (user.type === 'Veterinarian') {
        user.otherUID = settingvetUID(vetInfoTable, user);
    }
    else
    {
        user.otherUID = settingpetUID(petOwnerInfoTable, user);
    }
    let should;
    if (user.type == "Veterinarian") {
        should = "v";
    } else {
        should = "p";
    }
    return (
        <div>
            {should != "v" && (
                <div>
                    <button onClick={toggleVisibility}>Show Cal</button>
                    <br />
                    {isVisible && <Cal user={user} />}
                </div>
            )}
        </div>
    );
}
//            {AppointmentsTable(vetAppInfoTarget, vetInfoTableTarget)}

export default AfterSignIn;
