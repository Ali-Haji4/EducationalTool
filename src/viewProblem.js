import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavbarAdmin, NavBarStudent, NavBarTutor} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";

export default function ViewProblem() {

    const navigate = useNavigate();

    //Getting Problem information using local storage
    const getAccountType = localStorage.getItem("accountType")
    const getProblemIndex = localStorage.getItem("problemIndex");
    const getProblemID = localStorage.getItem("problemID");
    const getFullName = localStorage.getItem("fullName");
    const getStudentID = localStorage.getItem("userID");
    const getProblemTitle = localStorage.getItem("problemTitle");
    const getProblemSubject = localStorage.getItem("problemSubject");
    const getProblemYear = localStorage.getItem("problemYear");
    const getProblemTutorID = localStorage.getItem("problemTutorID");
    const [contacts, setContacts] = React.useState([{}]);
 

    //Fetchign list of problems from the database
    const url = 'http://localhost/reactProject/problemsList.php';

    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })

    }, [])

    const exitPage = () => {
        window.history.back();
        };

    return (
        <div>
            {getAccountType == "Tutor" ? <NavBarTutor/>: <NavbarAdmin/>}
            
            <div className="solveHeader">
                <ForwardedProblem contacts={contacts} problemIndex={getProblemIndex}/>
            </div>
    

            <div className="solveFooter">

                <button className="button-13" onClick={exitPage}>Exit</button>
            </div>
     
        </div>
    )
}