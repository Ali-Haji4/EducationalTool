import React from "react";
import {Link} from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const navigateToSignUp = () => {
        // 👇️ navigate to /contacts
        navigate('/SignUp');
      };

    const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate('/Login');
    };

    const navigateToLearnMore = () => {
        // 👇️ navigate to /contacts
        navigate('/LearnMore');
        };

    return(
        <div className="homePage">

        <div className="navigationBar">
            <h1 className="websiteName">Poly Sphere</h1>
            <img src="polyLogo.png"/>
            <button type="button" className="loginButton2" onClick={navigateToLogin}>Login</button>
            {/* <Link to="Login" className="loginButton2">Login</Link> */}
        </div>
        <div className="homeBody">
            <div className="homeSideImage">
                <img className="homeImage" src="/background4.jpg"/>
            </div>
            <div className="homeSideText">
                <h2 className="homeHeader">Learn Today, Lead Tommorow</h2>
                <p className="homeText">Poly Sphere is a web based educational tool that provides tutors and students a sphere where one can create various challenging problems, 
                while the other has to conquer them. Poly Sphere also provides a variety of different subjects across various degrees!</p>
                <p className="homeText">To enroll for a Poly Sphere account, <strong>you must be a Bahrain Polytechnic tutor or a student.</strong></p>
                <div className="homeBtnFlex">
                 
                        <button onClick={navigateToSignUp} className="button-53" type="button">Join Now</button>
                
                        <button className="button-54" type="button" onClick={navigateToLearnMore}>Learn More</button> 
                  
                </div>

                <h1>testing</h1>
                <Link to="/studentInterface" className="loginButtonHome">Student interface</Link>
                <Link to="/tutorInterface" className="loginButtonHome">Tutor interface</Link>
                <Link to="/adminInterface" className="loginButtonHome">Admin interface</Link>
            </div>
       
        </div>
    </div>)
}