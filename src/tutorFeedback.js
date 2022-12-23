import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarTutor} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";
import ForwardedAnswer from "./ForwardedAnswer";

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
    const getStudentID = localStorage.getItem("problemStudentID");
    const getProblemTitle = localStorage.getItem("problemTitle");
    const getProblemSubject = localStorage.getItem("problemSubject");
    const getProblemYear = localStorage.getItem("problemYear");
    const getUserID = localStorage.getItem("userID");
    const getAnswerID = localStorage.getItem("answerID");

    const [contacts, setContacts] = React.useState([{}]);
    const [answers, setAnswers] = React.useState([{}]);
    const [feedback, setFeedback] = React.useState({
        title: getProblemTitle, tutor_name: getFullName, created: currentDate, problem_id: getProblemID, answer_id: getAnswerID, student_id: getStudentID, tutor_id: getUserID, total_grade: 0, comment1: "", comment2: "", comment3: "", comment4: "", comment5: "", title1: "", title2: "", title3: "", title4: "", title5: "", grade1: 0, grade2: 0, grade3: 0, grade4: 0, grade5: 0
    });
    const [answerData, setAnswerData] = React.useState({
        title: getProblemTitle, student: getFullName, answer_text: "", submitted_on: currentDate, problem_id: getProblemID, student_id: getStudentID, subject: getProblemSubject, year: getProblemYear, tutor_id: getUserID
    });

    //Fetchign list of problems from the database
    const url = 'http://localhost/reactProject/problemsList.php';
    const url2 = 'http://localhost/reactProject/answersList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
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

    function submitFeedback(event) {
        event.preventDefault();
        console.log("Submitting Feedback");
        console.log(feedback);
        
        //REPLACE WITH NEW PROBLEM CREATION PHP FILE
        axios.post('http://localhost/reactProject/insertFeedback.php', feedback) //fix this shiiiiit
        .then(res=> console.log(res.data))

        alert("Feedback Submitted Succesfully")
        navigate(`/tutorViewAnswers`);
    }

    const exitPage = () => {
        window.history.back();
        };

    var [count, setCount] = React.useState(0);
    function addComment() {
        setCount(prevCount => prevCount + 1)
        console.log(count);
        //Lower Screen to view new comment smoothly
        window.scrollBy(0, 1000);
        return count;
    }
    return (
        <div>
            <NavBarTutor/>

            <div className="solveHeader">
                <ForwardedAnswer contacts={contacts} problemID={getProblemID}/>
            </div>

            <div className="solveQuestionBody">
            

                <div className="feedbackSolutionView">
                    <div className="seven">
                        <h1>Solution</h1>
                    </div>
                   
                    {answers?.map((answer, index) => (
                                <div key={index}>
                                    {index == getProblemIndex  && 
                                        <div className="solveProblemBody">
                                            <div className="problemTextStyle">{answer.answer_text}</div>
                                        </div>
                                    }
                                </div>
                            ))}
                </div>

                <div className="seven">
                    <h1>Feedback</h1>
                </div>
                
                <div className="feedbackSection">
                  
                        
                    <label className="commentLabel">Comment #1</label>
                        <input 
                        className="feedbackTitleTutor"
                        type="text"
                        placeholder="Write a title..."
                        name="title1"
                        onChange={handleChange}
                        value={feedback.title1}
                        required
                        />
                        <input 
                        className="feedbackCommentTutor"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment1"
                        onChange={handleChange}
                        value={feedback.comment1}
                        required
                        />
                        <input 
                        className="feedbackGradeTutor"
                        type="number"
                        placeholder="Insert Grade"
                        name="grade1"
                        onChange={handleChange}
                        value={feedback.grade1}
                        min="0"
                        max="100"
                        required
                        />
                      
                        <br/>
                     
                    {   count >= 1 &&
                    <div>
                        <label className="commentLabel">Comment #2</label>
                        <input 
                        className="feedbackTitleTutor"
                        type="text"
                        placeholder="Write a title..."
                        name="title2"
                        onChange={handleChange}
                        value={feedback.title2}
                        required
                        />
                        <input 
                        className="feedbackCommentTutor"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment2"
                        onChange={handleChange}
                        value={feedback.comment2}
                        required
                        />
                        <input 
                        className="feedbackGradeTutor"
                        type="number"
                        placeholder="Insert Grade"
                        name="grade2"
                        onChange={handleChange}
                        value={feedback.grade2}
                        min="0"
                        max="100"
                        required
                        />
                        <br/>
                        </div>}

                    {   count >= 2 &&
                        <div>
                        <label className="commentLabel">Comment #3</label>
                        <input 
                        className="feedbackTitleTutor"
                        type="text"
                        placeholder="Write a title..."
                        name="title3"
                        onChange={handleChange}
                        value={feedback.title3}
                        required
                        />
                        <input 
                        className="feedbackCommentTutor"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment3"
                        onChange={handleChange}
                        value={feedback.comment3}
                        required
                        />
                        <input 
                        className="feedbackGradeTutor"
                        type="number"
                        placeholder="Insert Grade"
                        name="grade3"
                        onChange={handleChange}
                        value={feedback.grade3}
                        min="0"
                        max="100"
                        required
                        />
                        <br/>
                        </div>}

                    {    count >= 3 &&
                    <div>
                        <label className="commentLabel">Comment #4</label>
                        <input 
                        className="feedbackTitleTutor"
                        type="text"
                        placeholder="Write a title..."
                        name="title4"
                        onChange={handleChange}
                        value={feedback.title4}
                        required
                        />
                        <input 
                        className="feedbackCommentTutor"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment4"
                        onChange={handleChange}
                        value={feedback.comment4}
                        required
                        />
                        <input 
                        className="feedbackGradeTutor"
                        type="number"
                        placeholder="Insert Grade"
                        name="grade4"
                        onChange={handleChange}
                        value={feedback.grade4}
                        min="0"
                        max="100"
                        required
                        />
                        <br/>
                        </div>}

                    {   count >= 4 &&
                    <div>
                        <label className="commentLabel">Comment #5</label>
                        <input 
                        className="feedbackTitleTutor"
                        type="text"
                        placeholder="Write a title..."
                        name="title5"
                        onChange={handleChange}
                        value={feedback.title5}
                        required
                        />
                        <input 
                        className="feedbackCommentTutor"
                        type="text"
                        placeholder="Write a comment..."
                        name="comment5"
                        onChange={handleChange}
                        value={feedback.comment5}
                        required
                        />
                        <input 
                        className="feedbackGradeTutor"
                        type="number"
                        placeholder="Insert Grade"
                        name="grade5"
                        onChange={handleChange}
                        value={feedback.grade5}
                        min="0"
                        max="100"
                        required
                        />
                        <br/>
                        </div>}
                    <label className="feedbackTotalGradeLabel">Total Grade</label>
                        <input 
                        className="feedbackTotalGradeTutor"
                        type="number"
                        placeholder="Insert Grade"
                        name="total_grade"
                        onChange={handleChange}
                        value={feedback.total_grade}
                        min="0"
                        max="100"
                        required
                        />


            
                </div>
            </div>
            
            <div className="solveFooter">
                <button className="button-12" onClick={submitFeedback}>Submit Feedback</button>
                { count < 4 && <button className="button-11" onClick={addComment}>Add Extra Comment</button>}
                <button className="button-13" onClick={exitPage}>Exit</button>
            </div>
        </div>
    )
}