import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import endOfHour from 'date-fns/esm/endOfHour';

import {
    Card, CardBody, Form, FormGroup, Label, Input, Button,
    CardTitle, CardText, ListGroup, ListGroupItem, CardLink, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem
} from 'reactstrap';

const Cal = (props) => {
    const user = props.user;
    const petInfoTableTarget = '...';
    const petInfoTable = usePetInfoTable(petInfoTableTarget);
    const [listOfIDs, setlistOfIDs] = useState([]);
    //arrayofavails
    const arrayOfAvails = Array(24).fill("false");

    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemTwo, setSelectedItemTwo] = useState('');


    const vetInfoTableTarget = '...';
    const vetInfoTable = useVetInfoTable(vetInfoTableTarget);

    const vetAppointmentInfoTableTarget = '...';
    const vetAppointmentInfoTable = useVetAppointmentInfoTable(vetAppointmentInfoTableTarget);

    const vetScheduleInfoTableTarget = '...';
    const vetScheduleInfoTable = useVetScheduleInfoTable(vetScheduleInfoTableTarget);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpentwo, setDropdownOpentwo] = useState(false);
    const [dropdownOpenthree, setDropdownOpenthree] = useState(false);

    const [selDropItem, setSelDropItem] = useState(null);

    const [selectedPetName, setselectedPetName] = useState("");
    const [selectedPetID, setselectedPetID] = useState("");
    const [selectedPetOwnerID, setselectedPetOwnerID] = useState("");

    const [selectedVetFirstName, setSelectedVetFirstName] = useState("");
    const [selectedVetLastName, setSelectedVetLastName] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");


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
        const selectedPet = petInfoTable.find((pet) => pet.PetID === petId);
        setSelectedItem(petId);
        setselectedPetName(selectedPetName.PetName);
        setselectedPetID(selectedPetID.petId);
        setselectedPetOwnerID(selectedPetOwnerID.UserID)
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
        const v = "false";
        const arrayOfTimeSlots = Array(24).fill(v);
        const arry = Array(24).fill(v);
        let startHour = 0;
        let startPeriod = "";
        let endHour = 0;
        let endPeriod = "";
        const appointments = vetAppointmentInfoTable.filter(appointment => appointment.VetID == selectedItemTwo
            && appointment.Date == stringDate);

        hoursOfVet.forEach(schedDay => {
            const selDayString = schedDay[ind];
            const timeData = selDayString.split(":");
            startHour = timeData[0];
            startPeriod = timeData[1];
            endHour = timeData[2];
            endPeriod = timeData[3];

            if (startPeriod == "pm") {
                startHour = parseInt(startHour) + 12;
            }
            if (endPeriod == "pm" && endHour != "12") {
                endHour = parseInt(endHour) + 12;
            }

            for (let i = 0; i < arrayOfTimeSlots.length; i++) {
                if (i >= startHour && i < endHour) {
                    arrayOfTimeSlots[i] = "true";
                    arry[i] = "Avail";
                    arrayOfAvails[i] = `${i} ${startPeriod} - ${i + 1} ${endPeriod}`;

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

    const handleSubmitPetOwnerAppointment = async (event) => {

        event.preventDefault();
        {
            try {
                const response = await fetch('http://localhost:3001/addAppointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Date: stringDate, Time: selDropItem, VetID: selectedItemTwo, UserID: props.otherUID, PetID: selectedItem,
                        AppointDesc: AppointDesc, Cancelled: "false"


                    })

                });

                const result = await response.json();
                console.log(result);


            } catch (error) {
                console.error(error);
            }

        }
    };
    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <div>Selected date:   {stringDate ? `Selected date: ${stringDate}` : ''}
            </div>

            {vetAppointmentInfoTable && showSelectedVetScheduleOnDate(vetAppointmentInfoTable, selectedItemTwo, stringDate)}
            {vetAppointmentInfoTable && vetScheduleInfoTable && showHoursvsAppointmentsSeleceted(selectedItemTwo, stringDate, vetScheduleInfoTable, vetAppointmentInfoTable)}


            {vetAppointmentInfoTable && vetScheduleInfoTable && showSelectedVetHours(selectedItemTwo, stringDate, vetScheduleInfoTable, vetAppointmentInfoTable)}

            <MyComponent />

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="date">Date: {stringDate}</Label>

                </FormGroup>

                <FormGroup>
                    <Label for="time">Vet ID: {selectedItemTwo}</Label>
                    <Dropdown isOpen={dropdownOpentwo} toggle={toggleDropdowntwo}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selectedItemTwo
                                ? `${selectedItemTwo} - ${selectedVetFirstName} - ${selectedVetLastName} - ${selectedSpecialization}`
                                : "Select a vet"}
                        </DropdownToggle>
                        <DropdownMenu>
                            {vetInfoTable &&
                                vetInfoTable.map((vet) => (
                                    <DropdownItem
                                        key={vet.VetID}
                                        onClick={() => handleDropdownSelectTwo(vet.VetID)}
                                    >
                                        {`${vet.VetID} - ${vet.VetFirstName} - ${vet.VetLastName} - ${vet.Specialization}`}
                                    </DropdownItem>
                                ))}
                        </DropdownMenu>
                    </Dropdown>


                </FormGroup>

                <FormGroup>
                    <Label for="time">Time: {selDropItem}</Label>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selDropItem || "Select a time slot"}
                        </DropdownToggle>
                        <DropdownMenu>
                            {arrayOfAvails.map((item, index) => (
                                arrayOfAvails[index] != "false" && (
                                    <DropdownItem key={index} onClick={() => handleDropdownSelect(item)}>
                                        {item}
                                    </DropdownItem>
                                )
                            ))}
                        </DropdownMenu>
                    </Dropdown>


                </FormGroup>

                                <FormGroup>

                    <Label for="time">Pet ID: {selectedItem}</Label>
                    <Dropdown isOpen={dropdownOpenthree} toggle={toggleDropdownthree}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selectedItem ? `${selectedItem} - ${selectedPetID} - ${selectedPetName}` : "Select a Pet"}
                        </DropdownToggle>
                        <DropdownMenu>
                            {petInfoTable && listOfIDs.map((id) => (
                                <DropdownItem key={id} onClick={() => handleDropdownSelectThree(id)}>
                                    {`${id} - ${petInfoTable.find((pet) => pet.PetID === id)?.PetName}`}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                </FormGroup>

                <FormGroup>
                    <Label for="userID">User ID: {user.otherUID}</Label>
                </FormGroup>

                <FormGroup>
                    <Label for="appointDesc">Appointment Description</Label>
                    <Input
                        type="textarea"
                        name="AppointDesc"
                        id="appointDesc"
                        value={AppointDesc}
                        onChange={handleAppointDescChange}
                    />
                </FormGroup>

                <Button onClick={handleSubmitPetOwnerAppointment}>Submit</Button>
            </Form>
        </div>

    );
};            //{vetScheduleInfoTable && showSelectedVetHours(selectedItemTwo, stringDate, vetScheduleInfoTable)}


export default Cal;
