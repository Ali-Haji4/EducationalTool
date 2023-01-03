import React, { useEffect, useContext, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function StudentFeedback() {

    const [feedbacks, setFeedbacks] = React.useState([{}]);
    const url = 'http://localhost/reactProject/feedbackList.php';

    const {id, setID} = useContext(idContext);

    //VARIABLE DECLARATION
    const [accountType, setAccountType] = React.useState(true);
    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  
    //gets the account type that was set in the login page from local storage
    const getAccountType = localStorage.getItem("accountType");
    //Attach a reference to a form
    const form = useRef();
    //Fetch the feedbacks from the database
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setFeedbacks(data);
    })
    }, [])
    
    function ViewProblem() {
        console.log("Problem Viewing...")
    }

    function DeleteFeedback(id) {
        console.log("Deleting Feedback...." + id);

        alert("Feedback Deleted Succesfully")
}

    function forwardIndex(index, id, title, subject, year, tutor_id, answer_id) {
        localStorage.setItem('problemIndex', index);
        localStorage.setItem('problemID', id);
        localStorage.setItem('problemTitle', title);
        localStorage.setItem('problemSubject', subject);
        localStorage.setItem('problemYear', year);
        localStorage.setItem('problemTutorID', tutor_id);
        localStorage.setItem('answerID', answer_id);
    }
    
    return(
        <div>
            <NavBarStudent/>
            <div className="studentInterfaceBody">
                
                <div className="problemsList">

                    <h2>Feedbacks List</h2>
                  
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Problem Title</div>
                            <div className="col col-1">Answer ID</div>
                            <div className="col col-2">Tutor</div>
                            <div className="col col-3">Created</div>
                            <div className="col col-4">Grade</div>
                            <div className="col col-4">Action</div>
                            <div className="col col-4">Manage</div>
                        </li>


                        {feedbacks?.map((feedback, index) => (
                                feedback.deleted != "deleted" && feedback.student_id == userID &&
                              <form ref={form} name="feedbackIDForm" method="post" action="http://localhost/reactProject/deleteFeedback.php" key={index}>
                                    <li className="table-row">
                                        <div className="col col-1" data-label="Degree">{feedback.answer_id}</div>
                                        <div className="col col-1" data-label="Degree">{feedback.problem_title}</div>
                                        <div className="col col-2" data-label="Subject">{feedback.tutor_name}</div>
                                        <div className="col col-3" data-label="Year">{feedback.created}</div>
                                        <div className="col col-4" data-label="a">{feedback.total_grade}</div> 
                                        <input type="hidden" id="feedbackID" name="feedbackID" defaultValue={feedback.id}/> 
                                        <div className="col col-4" data-label="Payment Status"> 
                                            <Link to={`/studentReview/?${index}`}>
                                                <button className="messageBtn" onClick={() => forwardIndex(index, feedback.id, feedback.title, feedback.subject, feedback.year, feedback.tutor_id, feedback.answer_id)}>Review</button>
                                            </Link>
                                        </div>
                                        <div className="col col-4" data-label="Payment Status"> 
                                                <button className="reportBtn" onClick={() => DeleteFeedback(feedback.id)}>Delete</button>
                                        </div> 
                       
                                    </li>
                                    </form>
                                ))}
                       
                    </ul>
                </div>

            </div>
        </div>
    )
}
