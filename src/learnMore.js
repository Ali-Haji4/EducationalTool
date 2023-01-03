import React , {useEffect}from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent, TestBar} from "./NavBar";
import StudentList from "./StudentList";
import axios from "axios";



export default function LearnMore() {

    const navigate = useNavigate();
    const [students, setStudents] = React.useState([{}]);
    const [tutors, setTutors] = React.useState([{}]);
    const [subjects, setSubjects] = React.useState([{}]);
    const [problems, setProblems] = React.useState([{}]);
    const url = 'http://localhost/reactProject/studentsMemberList.php';
    const url2 = 'http://localhost/reactProject/tutorsMemberList.php';
    const url3 = 'http://localhost/reactProject/subjectsList.php';
    const url4 = 'http://localhost/reactProject/problemsList.php';

    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setStudents(data);
        console.log(data)
    })

    axios.get(url2).then(response=> response.data)
    .then((data) => {
        setTutors(data);
        console.log(data)
    })

    axios.get(url3).then(response=> response.data)
    .then((data) => {
        setSubjects(data);
        console.log(data)
    })

    axios.get(url4).then(response=> response.data)
    .then((data) => {
        setProblems(data);
        console.log(data)
    })
    }, [])

    const exitPage = () => {
        window.history.back();
        };

        
    const toSignUp = () => {
        navigate("/signUp");
        };

    return(
        <div>
            <TestBar/>
            <div className="learnMoreBody">
                <div className="aboutUs-1">
                    <div className="aboutUs-text">
                        <h2 className="learnMoreTitle">About Us</h2>
                        <p className="learnMoreText">Poly Sphere is a web based educational tool that provides tutors and students a sphere where one can create various challenging problems, 
                        while the other has to conquer them. Poly Sphere also provides a variety of different subjects across various degrees!</p>
                        <p className="learnMoreText">You can test your skills and prove yourselve amongs your peers as a student, or forge challenging and thought-provoking problems that tests the mettle of the students as a tutor</p>
                        <p className="learnMoreText">PolySphere was designed to be easy to use and navigate, and hasslefree when it comes to solving problems and receiving feedback when it comes to the students. Additionally, tutors will find it
                        simple when it comes to creating problems and providing feedback</p>
                    </div>
                
                        <img src="aboutUsImg2.jpg" className="aboutUs-img"/>
                 
                </div>
                <div className="ourGoals-2">

                    <img src="aboutUsImg.jpg" className="aboutUs-img"/>

                    <div className="ourGoals-text">
                        <h2 className="learnMoreTitle">Our Mission</h2>
                        <p className="learnMoreText">PolySphere aims to provide a platform where both students and tutors can interact with each other in a friendly environment that houses features that allows them to accomplish their goals when it comes to either testing students,
                         or proving oneself as an outstanding individual academically</p>
                         <p className="learnMoreText">We believe that when provided when the appropriate platform, the only limit will be the sky when it comes to the potential of those who seek to distinguish themselves academically!</p>
                    </div>

      
                </div>

                <div className="statsSection">
                    <h3 className="statsNo">{students.length}+ <span className="statsText">STUDENTS</span></h3>
                    <h3 className="statsNo">{tutors.length}+ <span className="statsText">TUTORS</span></h3>
                    <h3 className="statsNo">{subjects.length}+ <span className="statsText">SUBJECTS TO CHOOSE FROM</span></h3>
                    <h3 className="statsNo">{problems.length}+ <span className="statsText">PROBLEMS TO SOLVE</span></h3>
                </div>

                <div className="subjects-3">
                    <div className="seven">
                        <h1>Degrees</h1>
                    </div>
          
                    <div className="container2">
                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>Cert Preparation</h3>
                                <p>English - Mathematics</p>

                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>Engineering</h3>
                                <p>Majors</p>
                                <p>Mechanical Engineering - Electronics Engineering - Electrical Engineering</p>
                          
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>Business</h3>
                                <p>Majors</p>
                                <p>Accounting - Banking & Finance - Human Resource Management - Marketing</p>
                            </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>IT</h3>
                                <p>Majors</p>
                                <p>Programming - Networking - Database System - Management Information Systems</p>
                       
                            </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>Web Media</h3>
                                <p></p>
                                <p></p>
                            </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>Visual Design</h3>
                                <></>
                            </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>International Logistics Management</h3>
                                <></>
                  
                            </div>
                            </div>
                            
                        </div>
                        <div class="card">
                            <div class="box">
                            <div class="content">
                                <h2></h2>
                                <h3>Film and Animation</h3>
                                <></>
                     
                            </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div className="box">
                            <div className="content">
                                <h2></h2>
                                <h3>English Communication</h3>
                                <></>
            
                            </div>
                            </div>
                            
                        </div>
                    </div>

                
                </div>
                <div className="features-4">

                </div>

                <div className="learnMoreBtns">
                    <button className="button-11" onClick={toSignUp}>Join Now</button>
                    <button className="button-13" onClick={exitPage}>Exit</button>
                </div>
           
            </div>
        </div>
    )
}
