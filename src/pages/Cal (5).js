import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Cal = (props) => {
    const user = props.user;
    const petInfoTableTarget = '...';
    const petInfoTable = usePetInfoTable(petInfoTableTarget);
    const [listOfIDs, setlistOfIDs] = useState([]);

    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemTwo, setSelectedItemTwo] = useState('');


    const vetInfoTableTarget = '...';
    const vetInfoTable = useVetInfoTable(vetInfoTableTarget);

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


    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <div>Selected date: {stringDate}</div>
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

            <div>Selected Vet: {selectedItemTwo}</div>
        </div>

    );
};

export default Cal;
