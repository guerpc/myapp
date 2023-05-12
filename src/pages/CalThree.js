import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import endOfHour from 'date-fns/esm/endOfHour';
import { BrowserRouter, Route, Link, Routes, useNavigate } from "react-router-dom";

import {
    Card, CardBody, Form, FormGroup, Label, Input, Button,
    CardTitle, CardText, ListGroup, ListGroupItem, CardLink, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const CalThree = (props) => {
    const user = props.user;
    const petInfoTableTarget = '...';
    const petInfoTable = usePetInfoTable(petInfoTableTarget);
    const [listOfIDs, setlistOfIDs] = useState([]);
    //arrayofavails
    const arrayOfAvails = Array(24).fill("false");
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemTwo, setSelectedItemTwo] = useState('');

    const [valid, setValid] = useState("");

    const vetInfoTableTarget = '...';
    const vetInfoTable = useVetInfoTable(vetInfoTableTarget);

    const vetAppointmentInfoTableTarget = '...';
    const vetAppointmentInfoTable = useVetAppointmentInfoTable(vetAppointmentInfoTableTarget);

    const vetScheduleInfoTableTarget = '...';
    const vetScheduleInfoTable = useVetScheduleInfoTable(vetScheduleInfoTableTarget);

    const userAccountInfoTableTarget = '...';
    const userAccountInfoTable = useUserAccountInfoTable(userAccountInfoTableTarget);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpentwo, setDropdownOpentwo] = useState(false);
    const [dropdownOpenthree, setDropdownOpenthree] = useState(false);

    const [selDropItem, setSelDropItem] = useState(null);

    const [selectedPetName, setselectedPetName] = useState("");
    const [selectedPetID, setselectedPetID] = useState("");

    const [selectedVetFirstName, setSelectedVetFirstName] = useState("");
    const [selectedVetLastName, setSelectedVetLastName] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");




    let inspID;
    let inspWeight;
    let insPMed;
    let insPNotes;
    let insPOut;
    let insPRecom;
    let insPetRecDate;


    const [uid, setuid] = useState('');
    const [petID, setPetID] = useState('');
    const [petMedsUsed, setPetMedsUsed] = useState('');
    const [petNotes, setPetNotes] = useState('');
    const [petOutcome, setPetOutcome] = useState('');
    const [petRecom, setPetRecom] = useState('');
    const [petRecordDate, setPetRecordDate] = useState('');


    const [dropdownOpenFour, setDropdownOpenFour] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);




    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const toggleDropdowntwo = () => {
        setDropdownOpentwo(!dropdownOpentwo);
    };
    const toggleDropdownthree = () => {
        setDropdownOpenthree(!dropdownOpenthree);
    };


    const handleDropdownSelect = (item) => {
        setSelDropItem(item);
    };

  const handleDropdownSelectTwo = (vetId) => {
      const selectedVet = vetInfoTable.find((vet) => vet.VetID === vetId);

    setSelectedItemTwo(vetId);
    setSelectedVetFirstName(selectedVet.VetFirstName);
    setSelectedVetLastName(selectedVet.VetLastName);
    setSelectedSpecialization(selectedVet.Specialization);
    };





    const handleDropdownSelectThree = (petId) => {
        const selectedPet = petInfoTable.find((id) => id.PetID === petId);
        setSelectedItem(petId);
        setselectedPetName(selectedPet.PetName);
        setselectedPetID(selectedPet.PetID);
    };
    const currtime = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [stringDate, setStringDate] = useState(currtime.toISOString().split('T')[0] + 'T00:00:00.000Z');
    const [storeDate, setStoreDate] = useState(new Date());
    const [dateObject, setDateObject] = useState(new Date());




    const handleDateChange = (fulldate) => {
        setSelectedDate(fulldate);
        setStoreDate(fulldate);
        setDateObject(fulldate);
        setStringDate(fulldate.toISOString().split('T')[0] + 'T00:00:00.000Z');
    };
    //form stuff


    function MyComponent() {
        const [isVisible, setIsVisible] = useState(false);

        const toggleVisibility = () => {
            setIsVisible(!isVisible);
        }

        return (
            <div>
                <button onClick={toggleVisibility}>Toggle Component</button>

            </div>
        );
    }

    function showSelectedVetScheduleOnDate(vetAppointmentInfoTable, selectedItemTwo, stringDate) {
        const appointments = vetAppointmentInfoTable.filter(appointment => appointment.VetID == selectedItemTwo
            && appointment.Date == stringDate);
        if (appointments.length > 0) {
            return (
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.ID}>
                            {`${appointment.Date}: ${appointment.Time}: ${appointment.PetID}`}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <p>No appointments scheduled for selected vet on selected date.</p>;
        }
    }
    function findAllPets(user, petInfoTable) {
        const listOfPets = [];
        for (let i = 0; i < petInfoTable.length; i++) {
            if (user.otherUID == petInfoTable[i].UserID) {
                listOfPets.push(petInfoTable[i].PetID);
            }

        }
        return listOfPets;
    }

    function updatePets(user, petInfoTable, setlistOfIDs, setSelectedItem) {
        const pets = findAllPets(user, petInfoTable);
        setlistOfIDs(pets);
        if (pets.length > 0) {
            setSelectedItem(pets[0]);

        }
    }
    useEffect(() => {
        if (petInfoTable) {
            updatePets(user, petInfoTable, setlistOfIDs, setSelectedItem);
        }
    }, [user, petInfoTable]);

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const handleSelectChangeTwo = (event) => {
        setSelectedItemTwo(event.target.value);
    };


    function usePetInfoTable(petInfoTableTarget) {
        const [petInfoTable, setPetInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/PetInfo?PetInfoTable=${petInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setPetInfoTable(data);
                    }
                });
        }, []);
        return petInfoTable;
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

    function useVetAppointmentInfoTable(vetInfoTableTarget) {
        const [vetAppointmentInfoTable, setVetAppointmentInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/AppointmentInfo?AppointmentInfoTable=${vetAppointmentInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setVetAppointmentInfoTable(data);
                    }
                });
        }, []);
        return vetAppointmentInfoTable;
    }

    function useVetScheduleInfoTable(scheduleInfoTableTarget) {
        const [vetScheduleInfoTable, setVetScheduleInfoTable] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/VetScheduleInfo?AppointmentInfoTable=${scheduleInfoTableTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setVetScheduleInfoTable(data);
                    }
                });
        }, []);
        return vetScheduleInfoTable;
    }



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




    ///
    function showAllFutureApp(vetAppointmentInfoTable, selectedItemTwo) {

        const appointments = vetAppointmentInfoTable.filter(appointment => appointment.VetID == selectedItemTwo && appointment.Cancelled == false);


        return (
            <div>
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.ID}>
                            {`Date ${appointment.Date}: Time ${appointment.Time}: ${appointment.PetID}: Description ${appointment.AppointDesc}: UID ${appointment.UserID}: Cancelled? ${appointment.Cancelled}: `}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    function showAllFutureAppNoRend(vetAppointmentInfoTable, selectedItemTwo) {

        const appointments = vetAppointmentInfoTable.filter(appointment => appointment.VetID == selectedItemTwo && appointment.Cancelled == false);


        return appointments
    }
    ///
    function showVetSchedNoRend(vetScheduleInfoTable, selectedItemTwo) {

        const appointments = vetScheduleInfoTable.filter(appointment => appointment.VetID == selectedItemTwo);


        return appointments
    }
    ///
    function showSelectedVetHoursbackup(selectedItemTwo, stringDate, vetScheduleInfoTable) {

        const hoursOfVet = vetScheduleInfoTable.filter(schedDay => schedDay.VetID == selectedItemTwo);



        return (
            <div>
                <ul>
                    {hoursOfVet.map(schedDay => (
                        <li key={schedDay.ScheduleID}>
                            {`Date ${schedDay.Monday || "blank"}: `}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    function showSelectedVetHoursWorkin(selectedItemTwo, stringDate, vetScheduleInfoTable) {

        const hoursOfVet = vetScheduleInfoTable.filter(schedDay => schedDay.VetID == selectedItemTwo);
        const day = new Date(stringDate);
        const dayOfWeek = day.getDay();
        const dayOfWeekString = dayOfWeek.toLocaleString('en-US', { weekday: 'long' });
        const columns = Object.keys(vetScheduleInfoTable[0]);
        const rightDay = dayOfWeek + 2;
        const ind = columns[rightDay]; // get the index of the desired column
        const d = hoursOfVet.map(schedDay => schedDay[ind]);


        return (
            <div>
                <ul>
                    {hoursOfVet.map(schedDay => (
                        <li key={schedDay.ScheduleID}>
                            {`Date ${schedDay[ind] || "blank"}: `}
                        </li>
                    ))}
                </ul>
                <br />
                {"hours: a :"}{d}
            </div>
        );
    }

    function showSelectedVetHours(selectedItemTwo, stringDate, vetScheduleInfoTable, vetAppointmentInfoTable) {

        const hoursOfVet = vetScheduleInfoTable.filter(schedDay => schedDay.VetID == selectedItemTwo);
        const day = new Date(stringDate);
        const dayOfWeek = day.getDay();
        const dayOfWeekString = dayOfWeek.toLocaleString('en-US', { weekday: 'long' });
        const columns = Object.keys(vetScheduleInfoTable[0]);
        const rightDay = dayOfWeek + 2;
        const ind = columns[rightDay]; // get the index of the desired column
        const dayOfHours = 24;
        const v = "false";
        const arrayOfTimeSlots = Array(24).fill(v);
        const arry = Array(24).fill(v);
        const showArry = Array(24).fill(v);
        let startHour = 0;
        let startPeriod = "";
        let endHour = 0;
        let endPeriod = "";
        const appointments = vetAppointmentInfoTable.filter(appointment => appointment.VetID == selectedItemTwo
            && appointment.Date == stringDate);
        let count = 0;

        hoursOfVet.forEach(schedDay => {
            const selDayString = schedDay[ind];
            const timeData = selDayString.split(":");
            startHour = timeData[0];
            startPeriod = timeData[1];
            endHour = timeData[2];
            endPeriod = timeData[3];

            if (startPeriod == "pm") {
                startHour = parseInt(startHour) + 12;
            } if (endPeriod == "pm" && endHour != "12") {
                endHour = parseInt(endHour) + 12;
            }

            for (let i = 0; i < arrayOfTimeSlots.length; i++) {
                if (i >= startHour && i < endHour) {
                    arrayOfTimeSlots[i] = "true";
                    arry[i] = "Avail";
                    arrayOfAvails[i] = `${i} ${startPeriod} - ${i + 1} ${endPeriod}`;
                    switch (true) {
                        case i == 0:
                            arrayOfAvails[i] = `${12} am - ${1} am`;
                            break;
                        case (i < 11 && i > 0):
                            arrayOfAvails[i] = `${i} am - ${i + 1} am`;
                            break;
                        case (i == 11):
                            arrayOfAvails[i] = `${i} am - ${i + 1} pm`;
                            break;
                        case i == 12:
                            arrayOfAvails[i] = `${i} pm - ${i - 11} pm`;
                            break;
                        case (i > 12 && i < 22):
                            arrayOfAvails[i] = `${i - 12} pm - ${i - 11} pm`;
                            break;
                        case (i == 22):
                            arrayOfAvails[i] = `${i - 11} pm - ${i - 10} am`;
                            break;
                        case (i == 23):
                            arrayOfAvails[i] = `${12} am - ${1} am`;
                            break;

                    }

                }
            }

        });
        appointments.forEach(appointment => {
            const timeData = appointment.Time.split(" ");
            startHour = timeData[0];
            startPeriod = timeData[1];
            endHour = timeData[3];
            endPeriod = timeData[4];
            if (startPeriod == "pm") {
                startHour = parseInt(startHour) + 12;
            } if (endPeriod == "pm" && endHour != "12") {
                endHour = parseInt(endHour) + 12;
            }

            //setting taken appointments
            for (let i = 0; i < arry.length; i++) {
                if (arrayOfTimeSlots[i] == "true") {
                    if (i == startHour) {
                        arry[i] = "Not avail";
                        arrayOfAvails[i] = "false";
                    }

                }
            }

            /// trimming duplicate
            for (let i = 0; i < arrayOfAvails.length; i++) {
                if (arrayOfAvails[i] == arrayOfAvails[i - 1]) {
                    arrayOfAvails[i] = 'false';
                }
            }

        });


        return (
            <div>
                <ul>
                    {hoursOfVet.map(schedDay => (
                        <li key={schedDay.ScheduleID}>
                            {`Date ${schedDay[ind] || "blank"}: `}
                        </li>
                    ))}
                </ul>



                <div>

                    <br />

                </div>
            </div>
        );
    }

    function showSelectedVetHoursNoRend(selectedItemTwo, stringDate, vetScheduleInfoTable) {
        const day = new Date(stringDate);
        const dayOfWeek = day.getDay();
        const dayOfWeekString = dayOfWeek.toLocaleString('en-US', { weekday: 'long' });
        const hoursOfVet = vetScheduleInfoTable.filter(schedDay => schedDay.VetID == selectedItemTwo);



        return hoursOfVet
    }

    function showHoursvsAppointmentsSeleceted(selectedItemTwo, stringDate, vetScheduleInfoTable, vetAppointmentInfoTable) {
        const hoursOfVet = showSelectedVetHoursNoRend(selectedItemTwo, stringDate, vetScheduleInfoTable);
        const day = new Date(stringDate);
        const dayOfWeek = day.getDay();
        const dayOfWeekString = dayOfWeek.toLocaleString('en-US', { weekday: 'long' });
        const appointments = showAllFutureAppNoRend(vetAppointmentInfoTable, selectedItemTwo);
        const timeAvail = 0;

        const hoursofDay = vetScheduleInfoTable.map(schedule => schedule[dayOfWeekString]);


        return (
            <div>
                <ul>
                    {hoursofDay}                </ul>
            </div>
        );

    }
    const [AppointDesc, setAppointDesc] = useState(' ');

    function handleAppointDescChange(event) {
        const { value } = event.target;
        setAppointDesc(value);
    }

    function findMatchingAppInfoIndex(stringDate, vetAppointmentInfoTable, selDropItem) {
        for (let i = 0; i < vetAppointmentInfoTable.length; i++) {
            if (selDropItem == vetAppointmentInfoTable[i].Time && stringDate == vetAppointmentInfoTable[i]) {
                return -1;
            }
        }
        return -2; // indicates no matching vet info found
    }


    const handleSubmitPetOwnerAppointment = async (event) => {
        const matchingIndex = findMatchingAppInfoIndex(stringDate, vetAppointmentInfoTable);
        if (matchingIndex == -1) {
            setValid("Record Already Exists");
            return valid;
        }
        let selT = selectedItemTwo.toString();
        let sUID = user.otherUID.toString();
        let pid = selectedItem.toString();
        
        event.preventDefault();
        {
            try {
                const response = await fetch('http://localhost:3001/addAppointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Date: stringDate, Time: selDropItem, VetID: selT, UserID: sUID, PetID: pid,
                        AppointDesc: AppointDesc, Cancelled: "false"


                    })

                });

                const result = await response.json();
                console.log(result);


            } catch (error) {
                console.error(error);
            }

        }
        navigate('/');

    };

    const toggleDropdownFour = () => setDropdownOpenFour(!dropdownOpenFour);
    
    const handleOptionSelectFour = (e) => {
        setSelectedOption(e.target.value);
        setuid(e.target.value); // set petID to selected option value

    }
    function handlesetPetWeight(event) {
        const { value } = event.target;
        setPetWeight(value);
    }



    function handlesetPetMedsUsed(event) {
        const { value } = event.target;
        setPetMedsUsed(value);
    }
    function handlesetPetNotes(event) {
        const { value } = event.target;
        setPetNotes(value);
    }
    function handlesetPetOutcome(event) {
        const { value } = event.target;
        setPetOutcome(value);
    }
    function handlesetPetRecom(event) {
        const { value } = event.target;
        setPetRecom(value);
    }
    function handlesetPetRecordDate(event) {
        const { value } = event.target;
        setPetRecordDate(value);
    }





    function handlesetPetName(event) {
        const { value } = event.target;
        setPetName(value);
    }
    function handlesetPetType(event) {
        const { value } = event.target;
        setPetType(value);
    }
    function handlesetPetBreed(event) {
        const { value } = event.target;
        setPetBreed(value);
    }
    function handlesetPetColor(event) {
        const { value } = event.target;
        setPetColor(value);
    }
    function handlesetPetDOB(event) {
        const { value } = event.target;
        setPetDOB(value);
    }
    function handlesetPetWeight(event) {
        const { value } = event.target;
        setPetWeight(value);
    }











    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petColor, setPetColor] = useState('');
    const [petDOB, setPetDOB] = useState('');
    const [petWeight, setPetWeight] = useState('');

    const handleUpdatePetInfo = async (event) => {
        let uoid = user.otherUID.toString();
        inspWeight = petName.toString();
        insPMed = petType.toString();
        insPNotes = petBreed.toString();
        insPOut = petColor.toString();
        inspID = uoid;
        insPRecom = petDOB.toString();
        insPetRecDate = petWeight.toString();

        event.preventDefault();
        {
            try {
                const response = await fetch('http://localhost:3001/AddNewPet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        PetName: inspWeight, PetType: insPMed, PetBreed: insPNotes, PetColor: insPOut,
                        UserID: inspID, PetDOB: insPRecom, PetWeight: insPetRecDate


                    })

                });

                const result = await response.json();
                console.log(result);


            } catch (error) {
                console.error(error);
            }

        }
        navigate('/');

    };




    return (
        <div>

            <Form onSubmit={handleSubmit}>

             

                <FormGroup>
                    <Label for="petName">Pet Name</Label>
                    <Input type="text" name="petName" id="petName" value={petName} onChange={handlesetPetName} />
                </FormGroup>

                <FormGroup>
                    <Label for="PetType">PetType</Label>
                    <Input type="text" name="PetType" id="PetType" value={petType} onChange={handlesetPetType} />
                </FormGroup>
                <FormGroup>
                    <Label for="PetBreed">PetBreed</Label>
                    <Input type="textarea" name="PetBreed" id="PetBreed" value={petBreed} onChange={handlesetPetBreed} />
                </FormGroup>
                <FormGroup>
                    <Label for="petColor">PetColor</Label>
                    <Input type="text" name="petColor" id="petColor" value={petColor} onChange={handlesetPetColor} />
                </FormGroup>
                <FormGroup>
                    <Label for="petDOB">PetDOB</Label>
                    <Input type="date" name="petDOB" id="petDOB" value={petDOB} onChange={handlesetPetDOB} />
                </FormGroup>
                <FormGroup>
                    <Label for="petWeight">PetWeight</Label>
                    <Input type="textarea" name="petWeight" id="petWeight" value={petWeight} onChange={handlesetPetWeight} />
                </FormGroup>

                <Button onClick={handleUpdatePetInfo}>Submit</Button>

            </Form>

            <br/>


        </div>

    ); //            vetAppointmentInfoTable-return-index: {vetAppointmentInfoTable && findMatchingAppInfoIndex(stringDate, vetAppointmentInfoTable)}

};            //{vetScheduleInfoTable && showSelectedVetHours(selectedItemTwo, stringDate, vetScheduleInfoTable)}


export default CalThree;
