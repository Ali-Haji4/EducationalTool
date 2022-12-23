import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";

export default function StudentReview() {

    //Getting Problem information using local storage
    const getProblemIndex = localStorage.getItem("problemIndex");
    const getProblemID = localStorage.getItem("problemID");
    const getFullName = localStorage.getItem("fullName");
    const getStudentID = localStorage.getItem("userID");
    const getProblemTitle = localStorage.getItem("problemTitle");
    const getProblemSubject = localStorage.getItem("problemSubject");
    const getProblemYear = localStorage.getItem("problemYear");
    const getProblemTutorID = localStorage.getItem("problemTutorID");
    const getAnswerID = localStorage.getItem("answerID");
    const [contacts, setContacts] = React.useState([{}]);
    const [answers, setAnswers] = React.useState([{}]);
    const [feedbacks, setFeedbacks] = React.useState([{}]);


    //Fetchign list of problems and drafts from the database
    const url = 'http://localhost/reactProject/problemsList.php';
    const url2 = 'http://localhost/reactProject/answersList.php';
    const url3 = 'http://localhost/reactProject/feedbackList.php';

    useEffect(() => {
        axios.get(url).then(response=> response.data)
        .then((data) => {
            setContacts(data);
        })
        axios.get(url2).then(response=> response.data)
        .then((data) => {
            setAnswers(data);
        })
        axios.get(url3).then(response=> response.data)
        .then((data) => {
            setFeedbacks(data);
    })
    }, [])

    const exitPage = () => {
        window.history.back();
        };
   
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
           
                {answers?.map((answer, index) => (

                    answer.id == getAnswerID &&
                
                    <div className="solveProblemBody" key={index}>
                        <div className="problemTextStyle">{answer.answer_text}</div>
                    </div>
                    ))}
            </div>

            <div className="viewFeedback">
                <div className="seven">
                    <h1>Feedback</h1>
                </div>

                {feedbacks?.map((feedback, index) => (

                    feedback.answer_id == getAnswerID &&

                    <div className="feedbackContainer" key={index}>
                        <div className="feedbackCommentsContainer">
                            <div className="feedbackLineHead">
                                <h4 className="feedbackTitleHead">Title</h4>
                                <h4 className="feedbackCommentHead">Comment</h4>
                                <h4 className="feedbackGradeHead">Grade</h4>
                               
                            </div>
                            <div className="theLine"></div>
                            <div className="feedbackLine">
                                <h4 className="feedbackTitle">{feedback.title1}</h4>
                                <h4 className="feedbackComment">{feedback.comment1}</h4>
                                <h4 className="feedbackGrade">{feedback.grade1}</h4>
                            </div>
                            <div className="feedbackLine">
                                <h4 className="feedbackTitle">{feedback.title2}</h4>
                                <h4 className="feedbackComment">{feedback.comment2}</h4>
                                <h4 className="feedbackGrade">{feedback.grade2}</h4>
                            </div>
                            <div className="feedbackLine">
                                <h4 className="feedbackTitle">{feedback.title3}</h4>
                                <h4 className="feedbackComment">{feedback.comment3}</h4>
                                <h4 className="feedbackGrade">{feedback.grade3}</h4>
                            </div>
                            <div className="feedbackLine">
                                <h4 className="feedbackTitle">{feedback.title4}</h4>
                                <h4 className="feedbackComment">{feedback.comment4}</h4>
                                <h4 className="feedbackGrade">{feedback.grade4}</h4>
                            </div>
                            <div className="feedbackLine">
                                <h4 className="feedbackTitle">{feedback.title5}</h4>
                                <h4 className="feedbackComment">{feedback.comment5}</h4>
                                <h4 className="feedbackGrade">{feedback.grade5}</h4>
                            </div>
                        </div>
                        <div className="feedbackTotalGrade">
                            <h2 className="totalGradeText">Total Grade</h2>
                            <div className="theLine"></div>
                            <h2 className="totalGrade">{feedback.total_grade}</h2>
                            {feedback.total_grade >= 95 && <p className="scoreText">A+</p>}
                            {feedback.total_grade >= 90 && feedback.total_grade < 95 && <p className="scoreText">A</p>}
                            {feedback.total_grade >= 85 && feedback.total_grade < 90 && <p className="scoreText">A-</p>}
                            {feedback.total_grade >= 80 && feedback.total_grade < 85 && <p className="scoreText">B+</p>}
                            {feedback.total_grade >= 75 && feedback.total_grade < 80 && <p className="scoreText">B</p>}
                            {feedback.total_grade >= 70 && feedback.total_grade < 75 && <p className="scoreText">B-</p>}
                            {feedback.total_grade >= 65 && feedback.total_grade < 70 && <p className="scoreText">C+</p>}
                            {feedback.total_grade >= 60 && feedback.total_grade < 65 && <p className="scoreText">C</p>}
                            {feedback.total_grade < 60 && <p className="scoreText">F</p>}

                        </div>
                    </div>
                    ))}
            </div>

            <div className="solveFooter">
                <button className="button-12" >Message Tutor</button>
                <button className="button-13" onClick={exitPage}>Exit</button>
            </div>
     
        </div>
    )
}