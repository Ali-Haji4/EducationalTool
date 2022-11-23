import React , {useContext} from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { idContext } from "./ID_Context";



export function NavBarStudent() {

    const {id, setID} = useContext(idContext);

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
                        <li><a href="/">Home</a></li>
                        <li><a href="">Problems</a></li>
                        <li><a href="">Feedback</a></li>
                        <li className="memberDrop">
                            <a href="">Members</a>
                            <ul className="dropDown">
                                <li><a href={`/StudentList?id=${id}`}>Students</a></li>
                                <li><a href={`/TutorList?id=${id}`}>Tutors</a></li>
                            </ul>
                        </li>
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
                        <li><a href="/">Home</a></li>
                        <li><a href="">Problems</a></li>
                        <li><a href="">View Answers</a></li>
                        <li className="memberDrop">
                            <a href="">Members</a>
                            <ul className="dropDown">
                                <li><a href="/StudentList">Students</a></li>
                                <li><a href="/TutorList">Tutors</a></li>
                            </ul>
                        </li>
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