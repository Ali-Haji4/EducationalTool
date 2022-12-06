import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";

export default function StudentSolve() {
    const [contacts, setContacts] = React.useState([{}]);
    const url = 'http://localhost/reactProject/problemsList.php';
    const getProblemIndex = localStorage.getItem("problemIndex");

    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })
    }, [])

    return (
        <div>
            <NavBarStudent/>
            {/* <div className="solveHeader">
                <h3>Subject</h3>
                <h3>Year</h3>
                <h2>Title</h2>
                <h3>Degree</h3>
                <h3>By Tutor</h3>
            </div>
            <h2>Problem</h2> */}
            <div className="solveQuestionBody">
                <ForwardedProblem contacts={contacts} problemIndex={getProblemIndex}/>
            </div>
            <h2>Solution</h2>
            <div className="solveAnswerBody">
                <textarea className="problemTxtArea"></textarea>
            </div>
            <div className="solveFooter">
                <button className="messageBtn">Save Draft</button>
                <button className="saveProfileBtn">Submit Solution</button>
                <button className="reportBtn">Exit</button>
            </div>
     
        </div>
    )
}