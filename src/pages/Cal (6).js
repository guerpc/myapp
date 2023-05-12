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

    const [selDropItem, setSelDropItem] = useState(null);



    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const handleDropdownSelect = (item) => {
        setSelDropItem(item);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [stringDate, setStringDate] = useState("");
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





        ///



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
                    arrayOfAvails[i] = `${i}${startPeriod} - ${i + 1}${endPeriod}`;

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
                {arrayOfTimeSlots.map((value, index) => (
                    <div key={index}>
                        {index}:00: {arrayOfTimeSlots[index]}{ }
                    </div>
                ))}               {arry.map((value, index) => (
                    <div key={index}>
                        {"Time Available "}{index}:00: {arry[index]}{ }
                    </div>
                ))}

                {arrayOfAvails.map((value, index) => (
                    <div key={index}>
                        {index}:00: {arrayOfAvails[index]}{ }
                    </div>
                ))}               {arrayOfAvails.map((value, index) => (
                    <div key={index}>
                        {"Time arrayOfAvails "}{index}:00: {arrayOfAvails[index]}{ }
                    </div>
                ))}
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
                    {"testing "}{hoursofDay}                </ul>
            </div>
        );

    }
    const [Date, setDate] = useState("");

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <div>Selected date:   {stringDate ? `Selected date: ${stringDate}` : ''}
</div>
            <select value={selectedItem} onChange={handleSelectChange}>
                {listOfIDs.map(id => (
                    <option key={id} style={{ color: "black" }} value={id}>{`${id} - ${petInfoTable.find(pet => pet.PetID === id)?.PetName}`}</option>
                ))}
            </select>
            <div>Selected item: {selectedItem}</div>
            <select value={selectedItemTwo} onChange={handleSelectChangeTwo}>
                {vetInfoTable && vetInfoTable.map(vet => (
                    <option key={vet.VetID} style={{ color: "black" }} value={vet.VetID}>{`${vet.VetID} - ${vet.VetFirstName} - ${vet.VetLastName} - ${vet.Specialization}`}</option>
                ))}
            </select>

            <div>Selected Vet: {selectedItemTwo} - {stringDate}</div>
            {vetAppointmentInfoTable && showSelectedVetScheduleOnDate(vetAppointmentInfoTable, selectedItemTwo, stringDate)}
            <br />
            {vetAppointmentInfoTable && vetScheduleInfoTable && showHoursvsAppointmentsSeleceted(selectedItemTwo, stringDate, vetScheduleInfoTable, vetAppointmentInfoTable)}
            <br />
            {"here"}
            <br />

            {vetAppointmentInfoTable && vetScheduleInfoTable && showSelectedVetHours(selectedItemTwo, stringDate, vetScheduleInfoTable, vetAppointmentInfoTable)}

            <MyComponent />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="date">Date: {stringDate}</Label>

                </FormGroup>
                <FormGroup>
                    <Label for="time">Time: {selDropItem}</Label>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selDropItem || "Select an item"}
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
                    <Label for="vetID">Vet ID: {selectedItemTwo}</Label>
                    <select value={selectedItemTwo} onChange={handleSelectChangeTwo}>
                        {vetInfoTable && vetInfoTable.map(vet => (
                            <option key={vet.VetID} style={{ color: "black" }} value={vet.VetID}>{`${vet.VetID} - ${vet.VetFirstName} - ${vet.VetLastName} - ${vet.Specialization}`}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label for="userID">User ID: {user.otherUID}</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="petID">Pet ID: {selectedItem} </Label>
                    <select value={selectedItem} onChange={handleSelectChange}>
                        {listOfIDs.map(id => (
                            <option key={id} style={{ color: "black" }} value={id}>{`${id} - ${petInfoTable.find(pet => pet.PetID === id)?.PetName}`}</option>
                        ))}
                    </select>

                </FormGroup>
                <FormGroup>
                    <Label for="appointDesc">Appointment Description</Label>
                    <Input
                        type="textarea"
                        name="AppointDesc"
                        id="appointDesc"
                        value={AppointmentDesc}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>

    );
};            //{vetScheduleInfoTable && showSelectedVetHours(selectedItemTwo, stringDate, vetScheduleInfoTable)}


export default Cal;
