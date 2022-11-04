import React from "react";
import {Link} from 'react-router-dom';

export default function Home() {
    return(
        <div className="homePage">

        <div className="navigationBar">
            <h1 className="websiteName">Poly Sphere</h1>
            {/* <button type="button" className="loginButton">Login</button> */}
            <Link to="Login" className="loginButton">Login</Link>
        </div>
        <div className="homeBody">
            <div className="homeSideImage">
                <img className="homeImage" src="/background4.jpg"/>
            </div>
            <div className="homeSideText">
                <h2 className="homeHeader">Learn Today, Lead Tommorow</h2>
                <p className="homeText">Poly Sphere is a web based educational tool that provides tutors and students a sphere where one can create various challenging problems, while the other has to conquer them.</p>
                <p className="homeText">To enroll for a Poly Sphere account, you must be a Bahrain Polytechnic tutor or a student.</p>
                <Link to="/SignUp" className="loginButtonHome">Join Now</Link>
                <p className="homeText">Poly Sphere provides a variety of different subjects</p>
                <Link to="/SignUp" className="loginButtonHome">Learn More</Link>
                <h1>testing</h1>
                <Link to="/studentInterface" className="loginButtonHome">Student interface</Link>
                <Link to="/tutorInterface" className="loginButtonHome">Tutor interface</Link>
            </div>
       
        </div>
    </div>)
}