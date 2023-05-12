import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const MyCalendar = (props) => {
    const user = props.user;
    const petInfoTableTarget = '...';
    const petInfoTable = usePetInfoTable(petInfoTableTarget);
    const [listOfIDs, setlistOfIDs] = useState([]);

    const [selectedItem, setSelectedItem] = useState('');


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [stringDate, setStringDate] = useState("");
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStringDate(date.toLocaleDateString("en-GB").replace(/\//g, '-').toString())
    };



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
        if (pets.length > 0) {
            setlistOfIDs(pets);
            setSelectedItem(pets[0]);
        }
    }

    useEffect(() => {
        if (petInfoTable) {
            updatePets(user, petInfoTable, setlistOfIDs, setSelectedItem);
        }
    }, [user, petInfoTable, setlistOfIDs, setSelectedItem]);
    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
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

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <div>Selected date: {stringDate}</div>
            <select value={selectedItem} onChange={handleSelectChange}>
                {listOfIDs.map(id => (
                    <option key={id} value={id}>{id}</option>
                ))}
            </select>
            <div>Selected item: {selectedItem}</div>
        </div>

    );
};

export default MyCalendar;
