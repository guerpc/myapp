import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect  } from 'react';
import {
    InputGroup, Input,
    Dropdown,DropdownToggle,
    DropdownMenu, DropdownItem,
    InputGroupText, Button, FormGroup, Label, Form
} from 'reactstrap';
import Quer from './Quer';
import User from './User';
import queryTarget from '../index';
import { Link, useNavigate } from "react-router-dom";


function SignIn(props, queryTarget) {
    const [vid, setvid] = useState("Blank vid");
    const [vUsername, setvUsername] = useState("Blank Username");
    const [vLogin, setvLogin] = useState("Blank Login");
    ////
    //Vet Targets
    const vetLoginInfoTarget = '...';
    const vetInfo = useVetInfo(vetLoginInfoTarget);
    ////
    const petOwnerLoginInfoTarget = '...';
    const petOwnerInfo = usePetOwnerInfo(petOwnerLoginInfoTarget);
    ///
    ///infoTable findingUID targets
    ///
    const vetInfoTableTarget = '...';
    const vetInfoTable = useVetInfoTable(vetInfoTableTarget);
    const petOwnerInfoTableTarget = '...';
    const petOwnerInfoTable = usePetOwnerInfoTable(petOwnerInfoTableTarget);
    ///
    const [signInIndex, setSignInIndex] = useState(null);
    const user = props.user;
    const navigate = useNavigate();
    //dropdown
    const [selectedDropDown, setselectedDropDown] = useState("User Type");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleDropdownSelect = (event) => {
        const value = event.target.value;
        setselectedDropDown(value);
    }


    const [validSignIn, setValidSignIn] = useState("");



    const [vLoginQueryResult, setVLoginQueryResult] = useState(null);
    const [vAccQueryResult, setVAccQueryResult] = useState(null);
    const vetAccTarget = 'someValue';

    const [userInputUsername, setUserInputUsername] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");



    function useVetInfo(vetLoginInfoTarget) {
        const [vetInfo, setVetInfo] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/VetLoginInfo?VetLoginInfoTable=${vetLoginInfoTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setVetInfo(data);
                    }
                });
        }, []);
        return vetInfo;
    }


    function usePetOwnerInfo(petOwnerLoginInfoTarget) {
        const [petOwnerInfo, setPetOwnerInfo] = useState(null);
        useEffect(() => {
            fetch(`http://localhost:3001/UserLogininfo?PetOwnerLoginInfoTable=${petOwnerLoginInfoTarget}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setPetOwnerInfo(data);
                    }
                });
        }, []);
        return petOwnerInfo;
    }


     


    const ifNotNull = (variable) => {
        if (variable !== null) {
            return variable;
        } else {
            // handle the case where variable is null
            return null;
        }
    }




    function findMatchingVetInfoIndex(userInputUsername, userInputPassword, vetInfo) {
        for (let i = 0; i < vetInfo.length; i++) {
            if (userInputUsername === vetInfo[i].VetUserName && userInputPassword === vetInfo[i].VetPassword) {
                return i;
            }
        }
        return -1; // indicates no matching vet info found
    }


    function findMatchingPetOwnerInfoIndex(userInputUsername, userInputPassword, petOwnerInfo) {
        for (let i = 0; i < petOwnerInfo.length; i++) {
            if (userInputUsername === petOwnerInfo[i].UserUserName && userInputPassword === petOwnerInfo[i].UserPassword) {
                return i;
            }
        }
        return -1; // indicates no matching vet info found
    }





    const handleButtonClickAgain = () => {
        const matchingIndex = findMatchingVetInfoIndex(userInputUsername, userInputPassword, vetInfo);
        if (matchingIndex === -1) {
            console.log('No matching vet info found.');
            setSignInIndex(null);
            setValidSignIn("Invalid Signin: Wrong Password or User Name");

        } else {
            console.log(`Matching vet info found at index ${matchingIndex}: ${vetInfo[matchingIndex]}`);
            setSignInIndex(matchingIndex);
            console.log(`Matching vet info found at index ${signInIndex}: ${vetInfo[signInIndex]}`);
            user.vId = vetInfo[matchingIndex].VetLoginID;
            user.vUsername = vetInfo[matchingIndex].VetUserName;
            user.vPass = vetInfo[matchingIndex].VetPassword;
            user.type = "Veterinarian";
            user.otherUID = settingvetUID(vetInfoTable, user);

            navigate('/AdminLoginPage', { user, queryTarget });
            return signInIndex;

        }

        return signInIndex, validSignIn;
    };


    const handleButtonClickAgaintwo = () => {
        const matchingIndex = findMatchingPetOwnerInfoIndex(userInputUsername, userInputPassword, petOwnerInfo);
        if (matchingIndex === -1) {
            console.log('No matching vet info found.');
            setSignInIndex(null);
            setValidSignIn("Invalid Signin: Wrong Password or User Name");

        } else {
            console.log(`Matching vet info found at index ${matchingIndex}: ${petOwnerInfo[matchingIndex]}`);
            setSignInIndex(matchingIndex);
            console.log(`Matching vet info found at index ${signInIndex}: ${petOwnerInfo[signInIndex]}`);
            user.vId = petOwnerInfo[matchingIndex].UserLoginID;
            user.vUsername = petOwnerInfo[matchingIndex].UserUserName;
            user.vPass = petOwnerInfo[matchingIndex].UserPassword;
            user.type = "Pet Owner";
            user.otherUID = settingpetUID(petOwnerInfoTable, user);
            
            navigate('/AdminLoginPage', { user, queryTarget });
            return signInIndex;

        }

        return signInIndex, validSignIn;
    };

    ///finding user/vet otherUID

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
/// 





    const handleButtonClickElse = () => {
        setValidSignIn("Invalid Signin: Pick a User Type");
         };
    return (
        <div>

            <Form>

                <FormGroup>

                    <Label for="userInputUsername">Log in name:</Label>
                    <Input type="userInputUsername" id="userInputUsername" value={userInputUsername}
                        onChange={(event) => setUserInputUsername(event.target.value)} />
                </FormGroup>
               
                <FormGroup>
                    <Label for="userInputPassword">Password:</Label>
                    <Input type="userInputPassword" id="userInputPassword" value={userInputPassword}
                        onChange={(event) => setUserInputPassword(event.target.value)} />
                </FormGroup>
                <div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret style={{ color: "white" }}>
                            {selectedDropDown}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleDropdownSelect} value="Pet Owner">Pet Owner</DropdownItem>
                            <DropdownItem onClick={handleDropdownSelect} value="Veterinarian">Veterinarian</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <br />
                <Button onClick={selectedDropDown === 'Veterinarian' ? handleButtonClickAgain : (selectedDropDown === 'Pet Owner' ? handleButtonClickAgaintwo : handleButtonClickElse)}>Sign In</Button>
                <br />
                <br />

                <Link to="/" user={user} queryTarget={queryTarget}><Button>Home</Button></Link>
                <br />
                <br />
                <Link to="/SignUp" user={user} queryTarget={queryTarget}><Button>Sign Up</Button></Link>


                <div>
                    {validSignIn}
                </div>

            </Form>



        </div>
    );
}

//                <Button onClick={(userInputUsername, userInputPassword) => { handleButtonClickTwo(userInputUsername, userInputPassword); }}>Click Me Two!</Button>


//            //{vLoginQueryResult && <Quer VetLoginInfo={foundItem} />} // was between buttons             {renderQueryResults()}
//            <Button onClick={handleButtonClickTwo(userInputUsername, userInputPassword)}>Click Me Two!</Button>


export default SignIn;
