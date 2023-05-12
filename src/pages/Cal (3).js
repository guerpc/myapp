import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const MyCalendar = (props) => {
    const user = props.user;
    const petInfoTableTarget = '...';
    const petInfoTable = usePetInfoTable(petInfoTableTarget);
    const [listOfIDs, setlistOfIDs] = useState([]);

    const [selectedID, setSelectedID] = useState('');


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [stringDate, setStringDate] = useState("");
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStringDate(date.toLocaleDateString("en-GB").replace(/\//g, '-').toString())
    };

    useEffect(() => {
        if (petInfoTable) {
            const listOfPets = [];
            for (let i = 0; i < petInfoTable.length; i++) {
                if (user.type === "Pet Owner" && user.otherUID === petInfoTable[i].UserID) {
                    listOfPets.push(petInfoTable[i].PetID);
                }
            }
            setlistOfIDs(listOfPets);
        }
    }, [user, petInfoTable]);


    function findAllPets(user, petInfoTable) {
        let count = 0;
        let listOfPets =[];
        if (user.type == "Pet Owner")
        {
            for (let i = 0; i < petInfoTable.length; i++) {
                if (user.otherUID == petInfoTable.UserID) {
                    listOfPets.push(petInfoTable.PetID);
                }
            }
            setlistOfIDs(listOfPets);

    }
        return listOfIDs; // indicates no matching vet info found
    }

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
    const handleIDChange = (event) => {
        setSelectedID(event.target.value);
    };
    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <div>Selected date: {stringDate}</div>
            <select onChange={handleIDChange}>
                <option value="">Select an ID</option>
                {listOfIDs.map(id => (
                    <option key={id} value={id}>{id}</option>
                ))}
            </select>
            <div>Selected ID: {selectedID}</div>
        </div>

    );
};

export default MyCalendar;
