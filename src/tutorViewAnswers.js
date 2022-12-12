import React, { useEffect, useContext, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { NavBarTutor } from "./NavBar";

export default function TutorViewAnswers() {

    //Storing the answers into react state
    const [answers, setAnswers] = React.useState([{}]);

    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  

    //Fetch the answers from the database
    const url = 'http://localhost/reactProject/answersList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setAnswers(data);
    })
    }, [])
    
    function ForwardIndex(title, student, answer, submitted, id, problemID,studentID, subject, year, index) {
        localStorage.setItem('problemTitle', title);
        localStorage.setItem('problemStudent', student);
        localStorage.setItem('answer', answer);
        localStorage.setItem('submitted', submitted);
        localStorage.setItem('answerID', id);
        localStorage.setItem('problemID', problemID);
        localStorage.setItem('problemStudentID',studentID);
        localStorage.setItem('problemSubject', subject);
        localStorage.setItem('problemYear', year);
        localStorage.setItem('problemIndex', index);
    }

    return(
        <div>
            <NavBarTutor/>
            <div className="tutorInterfaceBody">
                <h2>Answers List</h2>
                <div className="answersList">

                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Problem Title</div>
                            <div className="col col-2">Subject</div>
                            <div className="col col-3">Year</div>
                            <div className="col col-4">Student</div>
                            <div className="col col-4">Submitted</div>
                            <div className="col col-4">Action</div>
                        </li>

                        {answers?.map((answer, index) => (
                                answer.tutor_id == userID &&
                                    <li className="table-row" key={index}>
                                        <div className="col col-1" data-label="Title">{answer.title}</div>
                                        <div className="col col-2" data-label="Subject">{answer.subject}</div>
                                        <div className="col col-3" data-label="Year">{answer.year}</div>
                                        <div className="col col-4" data-label="Student">{answer.student}</div> 
                                        <div className="col col-4" data-label="Submitted_on">{answer.submitted_on}</div> 
                                        <div className="col col-4" data-label="Action">
                                            <Link to={`/tutorFeedback/?${index}`}>
                                                <button className="messageBtn" onClick={ForwardIndex(answer.title, answer.student, answer.answer_text, answer.submitted_on, answer.id, answer.problem_id, answer.student_id, answer.subject, answer.year, index)}>
                                                    View Answer
                                                </button>
                                            </Link>
                                        </div> 
                                    </li>
                                ))}
                       
                    </ul>
                </div>
            </div>
        </div>
    )
    
}
