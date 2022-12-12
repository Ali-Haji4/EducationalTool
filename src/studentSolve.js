import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";

export default function StudentSolve() {

    //Fetching the current date
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

    const navigate = useNavigate();
   
    //Getting Problem information using local storage
    const getProblemIndex = localStorage.getItem("problemIndex");
    const getProblemID = localStorage.getItem("problemID");
    const getFullName = localStorage.getItem("fullName");
    const getStudentID = localStorage.getItem("userID");
    const getProblemTitle = localStorage.getItem("problemTitle");
    const getProblemSubject = localStorage.getItem("problemSubject");
    const getProblemYear = localStorage.getItem("problemYear");
    const getProblemTutorID = localStorage.getItem("problemTutorID");

    const [contacts, setContacts] = React.useState([{}]);
    const [answerData, setAnswerData] = React.useState({
        title: getProblemTitle, student: getFullName, answer_text: "", submitted_on: currentDate, problem_id: getProblemID, student_id: getStudentID, subject: getProblemSubject, year: getProblemYear, tutor_id: getProblemTutorID
    });

    //Fetchign list of problems from the database
    const url = 'http://localhost/reactProject/problemsList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })
    }, [])

    function SubmitAnswer(event) {
        event.preventDefault();
        console.log("Submitting Answer");
        console.log(answerData);
        
        //REPLACE WITH NEW PROBLEM CREATION PHP FILE
        axios.post('http://localhost/reactProject/insertAnswer.php', answerData) //fix this shiiiiit
        .then(res=> console.log(res.data))

        alert("Answer Submitted Succesfully")
        navigate(`/studentProblems`);
        }

    function handleChange(event) {
        setAnswerData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
        console.log(answerData);
        }
      
        //WORK IN PROGRESS
    function saveDraft(draft) {
        let answerDraft = localStorage.setItem(`answerDraft${getProblemID}`, draft);
        return answerDraft;
    }

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
            
            <div className="solveAnswerBody">
                <h2>Solution</h2>
                <textarea
                required
                className="problemTxtArea"
                onChange={handleChange}
                value={answerData.answer_text}
                name="answer_text"/>
            </div>
            <div className="solveFooter">
                <button className="messageBtn" onClick={() => saveDraft(answerData.answer_text)}>Save Draft</button>
                <button className="submitAnswerBtn" onClick={SubmitAnswer}>Submit Answer</button>
                <button className="reportBtn">Exit</button>
            </div>
     
        </div>
    )
}