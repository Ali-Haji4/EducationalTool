import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarTutor} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";

export default function TutorFeedback() {

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

    const [problems, setProblems] = React.useState([{}]);
    const [answers, setAnswers] = React.useState([{}]);
    const [feedback, setFeedback] = React.useState({
        grade: 0, comment1: "", comment2: "", comment3: ""
    });
    const [answerData, setAnswerData] = React.useState({
        title: getProblemTitle, student: getFullName, answer_text: "", submitted_on: currentDate, problem_id: getProblemID, student_id: getStudentID, subject: getProblemSubject, year: getProblemYear, tutor_id: getProblemTutorID
    });

    //Fetchign list of problems from the database
    const url = 'http://localhost/reactProject/problemsList.php';
    const url2 = 'http://localhost/reactProject/answersList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setProblems(data);
    })

    axios.get(url2).then(response=> response.data)
    .then((data) => {
        setAnswers(data);
    })
    }, [])

    function handleChange(event) {
        setFeedback(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
        console.log(feedback);
        }

    function submitFeedback() {

    }

    return (
        <div>
            <NavBarTutor/>

            <div className="solveQuestionBody">
                <div className="feedbackProblemView">
                    {problems?.map((problem, index) => (
                            <div key={index}>

                                {problem.id === getProblemID  && 

                                <div>
                        
                                    <div className="solveHeader">
                                        <h3>{problem.subject}</h3>
                                        <h3>{problem.year}</h3>
                                        <h2>{problem.title}</h2>
                                        <h3>{problem.degree}</h3>
                                        <h3>{problem.tutor}</h3>
                                    </div>
                                
                                    <h2>Problem</h2>

                                    <div className="solveProblemBody">
                                        <div className="col col-4" data-label="b">{problem.content}</div> 
                                    </div>
                                
                                </div>
                                }
                            
                            </div>
                        ))}
                </div>

                <div className="feedbackSolutionView">
                    <h2>Solution</h2>
                    {answers?.map((answer, index) => (
                                <div key={index}>
                                    {index == getProblemIndex  && 
                                        <div className="solveHeader">
                                            <h3>{answer.answer_text}</h3>
                                        </div>
                                    }
                                </div>
                            ))}
                </div>

                <div className="feedbackSection">
                    <h2>Feedback</h2>

                    <label className="studentLabel">Comment #1</label>
                            <input 
                            className="formInput"
                            type="text"
                            placeholder="Write a comment..."
                            name="comment1"
                            onChange={handleChange}
                            value={feedback.comment1}
                            required
                            />
                        <br/>
                    <label className="studentLabel">Comment #2</label>
                        <input 
                        className="formInput"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment2"
                        onChange={handleChange}
                        value={feedback.comment2}
                        required
                        />
                        <br/>
                    <label className="studentLabel">Comment #3</label>
                        <input 
                        className="formInput"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment3"
                        onChange={handleChange}
                        value={feedback.comment3}
                        required
                        />
                        <br/>
                    <label className="studentLabel">Grade</label>
                        <input 
                        className="formInput"
                        type="number"
                        placeholder="Insert Grade"
                        name="grade"
                        onChange={handleChange}
                        value={feedback.grade}
                        required
                        />
                        
                </div>
            </div>
            
            <div className="solveFooter">
                <button className="submitAnswerBtn" onClick={submitFeedback}>Submit Feedback</button>
                <button className="reportBtn">Exit</button>
            </div>
        </div>
    )
}