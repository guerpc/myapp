import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {
    InputGroup, Input, InputGroupText, Button, FormGroup, Label, Form, Container, Row, Col,
    DropdownItem,DropdownMenu,Table, Dropdown, DropdownToggle
} from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Cal from './Cal';
import CalTwo from './CalTwo';
import CalThree from './CalThree';
import CalFour from './CalFour';
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

    const petInfoTableTarget = '...';
    const petInfoTable = UsePetInfoTable(petInfoTableTarget);


    function UsePetInfoTable(petInfoTableTarget) {
        const [petInfoTable, setPetInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/PetInfo?petInfoTable=${petInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setPetInfoTable(data);
                    }
                });
        }, []);
        return petInfoTable;
    }




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
    const [isVisibleTwo, setIsVisibleTwo] = useState(false);
    const toggleVisibilityTwo = () => {
        setIsVisibleTwo(!isVisibleTwo);
    }
    function showCal() {



        return (
            <div>


            </div>
        );
    }

    const [isVisibleThre, setIsVisibleThre] = useState(false);

    const toggleVisibilityThree = () => {
        setIsVisibleThre(!isVisibleThre);
    }
    function showCal() {



        return (
            <div>


            </div>
        );
    }

    const [isVisibleFour, setIsVisibleFour] = useState(false);

    const toggleVisibilityFour = () => {
        setIsVisibleFour(!isVisibleFour);
    }
    function showCal() {



        return (
            <div>


            </div>
        );
    }



    const [isVisibleFive, setIsVisibleFive] = useState(false);
    const toggleVisibilityFive = () => {
        setIsVisibleFive(!isVisibleFive);
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




    function ShowPetsofUID(petInfoTableTarget) {
        const petinfo = UsePetInfoTable(petInfoTableTarget);

        if (!petinfo) {
            return <div>Loading...</div>;
        }
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>PetID</th>
                                    <th>PetName</th>
                                    <th>PetType</th>
                                    <th>PetBreed</th>
                                    <th>PetColor</th>
                                    <th>PetDOB</th>
                                    <th>PetWeight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {petinfo
                                        .filter((pet) => pet.UserID === user.otherUID)
                                    .map((pet) => (
                                        <tr key={pet.PetID}>
                                                <td>{pet.PetID}</td>
                                                <td>{pet.PetName}</td>
                                                <td>{pet.PetType}</td>
                                                <td>{pet.PetBreed}</td>
                                                <td>{pet.PetColor}</td>
                                                <td>{pet.PetDOB}</td>
                                                <td>{pet.PetWeight}</td>
                                            </tr>
                                   
                                        ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemTwo, setSelectedItemTwo] = useState('');

    const [selectedVetFirstName, setSelectedVetFirstName] = useState("");
    const [selectedVetLastName, setSelectedVetLastName] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");


    const userAccountInfoTableTarget = '...';
    const userAccountInfoTable = useUserAccountInfoTable(userAccountInfoTableTarget);

    const handleDropdownSelectTwo = (vetId) => {
        const selectedVet = vetInfoTable.find((vet) => vet.VetID === vetId);

        setSelectedItemTwo(vetId);
        setSelectedVetFirstName(selectedVet.VetFirstName);
        setSelectedVetLastName(selectedVet.VetLastName);
        setSelectedSpecialization(selectedVet.Specialization);
    };

    function useUserAccountInfoTable(userAccountInfoTableTarget) {
        const [userAccountInfoTable, setUserAccountInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/UserAccountInfo?UserAccountInfoTable=${userAccountInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setUserAccountInfoTable(data);
                    }
                });
        }, []);
        return userAccountInfoTable;
    }
    const [selectedPetName, setselectedPetName] = useState("");
    const [selectedPetID, setselectedPetID] = useState("");
    const toggleDropdownthree = () => {
        setDropdownOpenthree(!dropdownOpenthree);
    };
    const [dropdownOpenthree, setDropdownOpenthree] = useState(false);
    const [showPetInfo, setShowPetInfo] = useState(false);

    const toggleShowPetInfo = () => {
        setShowPetInfo(!showPetInfo);
    }
    const handleDropdownSelectThree = (petId) => {
        const selectedPet = petInfoTable.find((id) => id.PetID === petId);
        setSelectedItem(petId);
        setselectedPetName(selectedPet.PetName);
        setselectedPetID(selectedPet.PetID);
    };
    const [uid, setuid] = useState('');

    const petRecordsInfoTableTarget = '...';
    const petRecordsInfoTable = UsePetRecordsInfoTableTarget(petRecordsInfoTableTarget);

    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionSelectFour = (e) => {
        setSelectedOption(e.target.value);
        setuid(e.target.value); // set petID to selected option value

    }
    function ShowPetsofUID(petInfoTableTarget) {
        const petinfo = UsePetInfoTable(petInfoTableTarget);

        if (!petinfo) {
            return <div>Loading...</div>;
        }
        return (

            <Container fluid>
              
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>PetID</th>
                                    <th>PetName</th>
                                    <th>PetType</th>
                                    <th>PetBreed</th>
                                    <th>PetColor</th>
                                    <th>PetDOB</th>
                                    <th>PetWeight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {petinfo
                                    .filter((pet) => pet.UserID === user.otherUID)
                                    .map((pet) => (
                                        <tr key={pet.PetID}>
                                            <td>{pet.PetID}</td>
                                            <td>{pet.PetName}</td>
                                            <td>{pet.PetType}</td>
                                            <td>{pet.PetBreed}</td>
                                            <td>{pet.PetColor}</td>
                                            <td>{pet.PetDOB}</td>
                                            <td>{pet.PetWeight}</td>
                                        </tr>

                                    ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }

    function ShowPetRecords(petRecordsInfoTableTarget) {

        const petrecords = UsePetRecordsInfoTableTarget(petRecordsInfoTableTarget);
        if (!petrecords) {
        return <div>Loading...</div>;
    }
    return (

        <Container fluid>

            <Row>
                <Col>
                    <Label for="userID">User</Label>
                    <Input type="select" name="userID" id="userID" value={selectedOption} onChange={handleOptionSelectFour} style={{ backgroundColor: '#e5e5e5', color: 'black' }}>
                        <option value=""
                        >Select an option</option>
                        {userAccountInfoTable && userAccountInfoTable.map(option => (
                            <option key={option.UserID} value={option.UserID} style={{ backgroundColor: '#e5e5e5', color: 'black' }}>
                                ID: {option.UserID} {option.UserFirstName} {option.UserLastName} </option>
                        ))}
                    </Input>
                    <Label for="time">Pet ID: {selectedItem}</Label>
                    <Dropdown isOpen={dropdownOpenthree} toggle={toggleDropdownthree}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selectedItem
                                ? `Pet ID: ${selectedItem} - ${selectedPetName}`
                                : "Select a Pet"}
                        </DropdownToggle>
                        <DropdownMenu>
                            {petInfoTable &&
                                petInfoTable
                                    .filter((a) => a.UserID == uid)
                                    .map((id) => (
                                        <DropdownItem
                                            key={id.PetID}
                                            onClick={() => handleDropdownSelectThree(id.PetID)}
                                        >
                                            {`Pet ID: ${id.PetID} - ${id.PetName}`}
                                        </DropdownItem>
                                    ))}
                        </DropdownMenu>
                    </Dropdown>


                    <Table>
                        <thead>
                            <tr>
                                <th>PetRecordID }</th>
                                <th>PetID</th>
                                <th>PetMedsUsed</th>
                                <th>PetNotes</th>
                                <th>PetOutcome</th>
                                <th>PetRecom</th>
                                <th>PetRecordDate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {petrecords
                                .filter((pet) => pet.UserID === user.otherUID)
                                .map((pet) => (
                                    <tr key={pet.PetID}>
                                        <td>{pet.PetID}</td>
                                        <td>{pet.PetName}</td>
                                        <td>{pet.PetType}</td>
                                        <td>{pet.PetBreed}</td>
                                        <td>{pet.PetColor}</td>
                                        <td>{pet.PetDOB}</td>
                                        <td>{pet.PetWeight}</td>
                                    </tr>

                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}



    function UsePetRecordsInfoTableTarget(petRecordsInfoTableTarget) {
        const [petRecordsInfoTable, setPetRecordsInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/PetRecords?petRecordsInfoTable=${petRecordsInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setPetRecordsInfoTable(data);
                    }
                });
        }, []);
        return petRecordsInfoTable;
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
                    
                    <button onClick={toggleVisibilityFour}>Show Pets</button>
                    <br />
                    {isVisibleFour && <ShowPetsofUID petInfoTableTarget />}
                    <br />
                    <button onClick={toggleVisibility}>Show Cal</button>
                    <br />
                    {isVisible && <Cal user={user} />}
                    <br />
                    <button onClick={toggleVisibilityThree} > Add Pet</button>
                    {isVisibleThre && <CalThree user={user} />}

                </div>
            )}
            <div>
                {should != "p" && (
                    <div>
                        <button onClick={toggleVisibilityFive}>Show Pet Records(Not working)</button>
                        <br />
                        {isVisibleFive && <ShowPetRecords petRecordsInfoTableTarget/>}
                        <br />


                        <button onClick={toggleVisibility}>Show All Appointments</button>
                        <br />

                        {isVisible && <AppointmentsTable vetAppInfoTarget vetInfoTableTarget />}
                        <br />
                        <button onClick={toggleVisibilityTwo}>Insert Pet Record</button>
                        {isVisibleTwo && <CalTwo user={user} />}

                    </div>
                )}
            </div>

        </div>
    );
}
//            {AppointmentsTable(vetAppInfoTarget, vetInfoTableTarget)}

export default AfterSignIn;
