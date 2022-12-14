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
    
    const [draftsExist, setDraftsExist] =  React.useState(false);

    //Getting Problem information using local storage
    const getProblemIndex = localStorage.getItem("problemIndex");
    const getProblemID = localStorage.getItem("problemID");
    const getFullName = localStorage.getItem("fullName");
    const getStudentID = localStorage.getItem("userID");
    const getProblemTitle = localStorage.getItem("problemTitle");
    const getProblemSubject = localStorage.getItem("problemSubject");
    const getProblemYear = localStorage.getItem("problemYear");
    const getProblemTutorID = localStorage.getItem("problemTutorID");
    const [drafts, setDrafts] = React.useState([{}]);
    const [contacts, setContacts] = React.useState([{}]);
    const [answerData, setAnswerData] = React.useState({
        title: getProblemTitle, student: getFullName, answer_text: "", submitted_on: currentDate, problem_id: getProblemID, student_id: getStudentID, subject: getProblemSubject, year: getProblemYear, tutor_id: getProblemTutorID
    });
    const [draftData, setDraftData] = React.useState({
        problem_id: getProblemID, student_id: getStudentID, answer_text: ""
    });

    //Fetchign list of problems and drafts from the database
    const url = 'http://localhost/reactProject/problemsList.php';
    const url2 = 'http://localhost/reactProject/draftsList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })

    
        axios.get(url2).then(response=> response.data)
    .then((data) => {
        setDrafts(data);
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


    const exitPage = () => {
        window.history.back();
        };

    function handleChange(event) {
        setAnswerData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })

        setDraftData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
        console.log(answerData);
        }

      
        //WORK IN PROGRESS
    function saveDraft(event) {

        event.preventDefault();
        console.log("Submitting Draft");
        console.log(draftData);
        
        axios.post('http://localhost/reactProject/insertDraft.php', draftData) //fix this shiiiiit
        .then(res=> console.log(res.data))

        alert("Draft Saved Succesfully")
    }


    const textArea = document.getElementById("textArea1")
  
    var draftCount = 1;
   

    return (
        <div>
            <NavBarStudent/>
            <div className="solveHeader">
                <ForwardedProblem contacts={contacts} problemIndex={getProblemIndex}/>
            </div>
            
            <div className="solveAnswerBody">
                <div className="seven">
                    <h1 >Solution</h1>
                </div>
                {
                      drafts?.map((draft, index) => (
                        draft.problem_id == getProblemID && draft.student_id == getStudentID &&
                        
                        <div>
                          
                        <div className="passwordTip">
                            <span className="passwordTipText">If you happen to have multiple drafts, the answer that will be submitted will be the text area you last wrote on.</span>
                            <label className="studentLabel">Draft #{draftCount++}</label>
                            <span>*</span>
                        </div>  
                        <textarea
                        key={index}
                        required
                        // className="problemTxtArea"
                        id="textArea1"
                        className="textarea2"
                        onChange={handleChange}
                        defaultValue={draft.answer_text}
                        name="answer_text"/>
                        
                       
                        </div>
                    )) 
                }
                {

                        
                        <div>
                        <textarea
                      
                        required
                        // className="problemTxtArea"
                        id="textArea1"
                        className="textarea2"
                        onChange={handleChange}
                        value={answerData.answer_text}
                        name="answer_text"/>
                        </div>
                 
                // <textarea
                // required
                // // className="problemTxtArea"
                // id="textArea1"
                // className="textarea2"
                // onChange={handleChange}
                // value={answerData.answer_text}
                // name="answer_text"/>
                }
            </div>

            <div className="solveFooter">
                <button className="button-12" onClick={saveDraft}>Save Draft</button>
                <button className="button-11" onClick={SubmitAnswer}>Submit Answer</button>
                <button className="button-13" onClick={exitPage}>Exit</button>
            </div>
     
        </div>
    )
}