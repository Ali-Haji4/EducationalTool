import React , {useContext ,useEffect,useLayoutEffect , useState} from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { idContext } from "./ID_Context";
import axios from "axios";


export function NavBarStudent() {

    const {id, setID} = useContext(idContext);

    const navigate = useNavigate();

    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  
    let getName = JSON.parse(JSON.stringify(localStorage.getItem("fullName")));  
    function Logout(){
        localStorage.clear();
        navigate("/");
    }
    const [contacts, setContacts] = React.useState([{}]);
    var [feedbackAvailable, setFeedbackAvailable] = React.useState(false);
    const getNotifications = localStorage.getItem("notificationAvailable");

    const url = 'http://localhost/reactProject/feedbackList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
        console.log(data)
    })
    }, [])

    const [notificationStyle, setNotificationStyle] = React.useState("")

    function changeAvailability() {
        if (feedbackAvailable == false) {

            setFeedbackAvailable(true)
            console.log("changed chief");
            setNotificationStyle("reportBtn");

         }
         
    }

    return(
        <div>
            <div className="navBarInterface">
         
            {contacts?.map((answer) => (
                                <>
                                    {answer.deleted !== "deleted" && answer.student_id == userID &&
                                        <>
                                            {changeAvailability.call()}
                                        </>
                                    }
                                </>
                            ))}

                <Link to="/" >
                    <button className="navHomeBtn">Poly Sphere</button>
                </Link>

                <nav className="navLinkContainer">
                    <ul className="navLinks">
                        {/* <li><a href="/">Home</a></li> */}
                        <li><a href={`/StudentProblems?id=${id}`}>Problems</a></li>
                        <li><a href={`/studentFeedback?id=${id}`} className={notificationStyle}>Feedback</a></li>
                        <li className="memberDrop">
                            <a href="">Members</a>
                            <ul className="dropDown">
                                <li><a href={`/StudentList?id=${id}`}>Students</a></li>
                                <li><a href={`/TutorList?id=${id}`}>Tutors</a></li>
                            </ul>
                        </li>
                        <li><a href={`/viewMessages`}>View Messages</a></li>
                        <li><a href="/" onClick={Logout}>Logout</a></li>
                    </ul>
                
                </nav>
                <Link to="/Profile">
                    <button className="navProfileBtn">Profile</button>
                </Link>
            </div>
        </div>
    )
}

export function NavBarTutor() {

    const navigate = useNavigate();

    function Logout(){
        localStorage.clear();
        navigate("/");
    }
    
    return(
        <div>
            <div className="navBarInterface">
             
                <Link to="/" >
                    <button className="navHomeBtn">Poly Sphere</button>
                </Link>

                <nav className="navLinkContainer">
                    <ul className="navLinks">
                        {/* <li><a href="/">Home</a></li> */}
                        <li><a href="/tutorProblems">Problems</a></li>
                        <li><a href="/tutorViewAnswers">View Answers</a></li>
                        <li className="memberDrop">
                            <a href="">Members</a>
                            <ul className="dropDown">
                                <li><a href="/StudentList">Students</a></li>
                                <li><a href="/TutorList">Tutors</a></li>
                            </ul>
                        </li>
                        <li><a href={`/viewMessages`}>View Messages</a></li>
                        <li><a href="/" onClick={Logout}>Logout</a></li>
                    </ul>
                </nav>
                <Link to="/Profile">
                    <button className="navProfileBtn">Profile</button>
                </Link>
            </div>
        </div>
    )
}

export function NavbarAdmin() {

    const navigate = useNavigate();

    function Logout(){
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="navBarInterface">
             <Link to="/" >
                    <button className="navHomeBtn">Poly Sphere</button>
            </Link>
            <nav className="navLinkContainer">
                    <ul className="navLinks">
                        <li><a href="/adminInterface">Reports</a></li>
                        <li><a href="/manageUsers">Manage Users</a></li>
                        <li><a href="/manageProblems">Manage Problems</a></li>
                    </ul>
            </nav>
            <div>
                <a href="/" onClick={Logout} className="loginButton2">Logout</a>
            </div>
        </div>
    )
}

export function TestBar() {



    function Logout(){
        localStorage.clear();
        navigate("/");
    }

    const {id, setID} = useContext(idContext);

    const navigate = useNavigate();

    function Logout(){
        localStorage.clear();
        navigate("/");
    }
    const [contacts, setContacts] = React.useState([{}]);
    var [feedbackCount, setFeedbackCount] = React.useState(0);

    const url = 'http://localhost/reactProject/feedbackList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
        console.log(data)
    })
    }, [])

    useEffect(() => {
      console.log(feedbackCount)
    }, [feedbackCount])

    function incrementer() {
        setFeedbackCount(prevCount => prevCount + 1)
        console.log("cppp0" + feedbackCount)
    }
      
    return (
        <div className="nav">
        <input type="checkbox" id="nav-check"/>
        <div className="nav-header">
          <div className="nav-title">
            PolySphere
          </div>
        </div>

        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div className="nav-links">
                    
            <a href="/" >Home</a>
            <a href={`/StudentProblems?id=${id}`} >Problems</a>
            <a href={`/studentFeedback?id=${id}`} >Feedback</a>      
            <a href={`/StudentList?id=${id}`}>Students</a>
            <a href={`/TutorList?id=${id}`}>Tutors</a>
                           
            <a href="/" onClick={Logout} >Logout</a>
            <Link to="/Profile">
                    <button className="navProfileBtn">Profile</button>
            </Link>
        </div>
              
      </div>

    )
}