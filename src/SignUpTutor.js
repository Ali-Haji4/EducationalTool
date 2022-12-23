import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import App from "./App";

export default function SignUpTutor() {

    //Storing form data
    const [formData, setFormData] = React.useState(
        {username: "", password: "", confirmedPassword: "", firstName: "", lastName: "", fullName: "", email: "", degree: "Cert Academic Tutor"}
        )
    
        
    const [errorMsg, setErrorMsg] = React.useState(false);
    const [errorMsgText, setErrorMsgText] = React.useState("");

    const navigate = useNavigate();

    //React to data change    
    function handleChange(event) {
        setFormData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        
        //Variables
        const username=document.signUpForm.username.value;  
        const password=document.signUpForm.password.value;  
        const firstName = document.signUpForm.firstName.value;
        const lastName = document.signUpForm.lastName.value;

        //Username regex (Not used)
        const usernameRegex = "^[A-Za-z0-9]+";

        //Password regex
        //Minimum eight characters
        //at least one uppercase letter, one lowercase letter and one number:
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

         //Validate username
         if (username==null || username==""){  
            setErrorMsgText("Username can't be blank");
            setErrorMsg(true);
            return false;  
        }else if (username.length<6) {
            setErrorMsgText("Username must be at least 6 characters long");
            setErrorMsg(true); 
            return false;
        }else if(!passwordRegex.test(password)){  
            setErrorMsgText("Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter and one number.");
            setErrorMsg(true);
            return false;  
        }else if(firstName==null || firstName==""){
            setErrorMsgText("First Name can't be blank");
            setErrorMsg(true);
            return false;     
        }else if(lastName==null || lastName==""){
            setErrorMsgText("Last Name can't be blank");
            setErrorMsg(true);
            return false;     
        }

        //Validate Email
        let x = document.signUpForm.email.value;  
        let atposition= x.indexOf("@");  
        let dotposition= x.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
            setErrorMsgText("Please enter a valid e-mail address");
            setErrorMsg(true);
        return false;  
        }  

        //Validate Password
        if (formData.password === formData.confirmedPassword) {
            console.log("Succesfully signed up")
            axios.post('http://localhost/reactProject/insert.php',formData) //fix this shiiiiit
            .then(res=> console.log(res.data))
            .catch(error => {
              console.log(error.response)
          });

        //Upon success show alert and move to login page    
        alert("Account Succesfully Registered. Redirecting to Login Page...");
        navigate('/Login');
        }
        else {
            setErrorMsgText("Passwords Do Not Match");
            setErrorMsg(true);
        }

    }

    return (
        <div className="signUpStudentPage">

            <div className="navigationBar">
                <Link className="websiteNameLogin" to="/">
                <h1 className="websiteNameLogin">Poly Sphere</h1>
                </Link>
            </div>  

            <div className="registrationMainContainer">

            <div className="registrationImageSection">
                <img className="registrationImageTutor" src="background5.jpg"></img>
            </div>

            <div className="registrationFormSection">
                
            <h1 className="studentRegistrationTitle">Tutor Registration</h1>

            {errorMsg && <p className="loginError">{errorMsgText}</p>}

            <div className="SignUpFormStudent">
                <form action="insert.php" name="signUpForm" method="post" className="form" onSubmit={handleSubmit}>

                    <label className="tutorLabel">Username</label>
                    <input 
                        className="formInput"
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        required
                        />

                    <label className="tutorLabel">Password</label>
                    <input 
                        className="formInput"
                        type="password" 
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                        />

                    <label className="tutorLabel">Confirm Password</label>
                    <input 
                        className="formInput"
                        type="password" 
                        placeholder="Confirm password"
                        name="confirmedPassword"
                        onChange={handleChange}
                        value={formData.confirmedPassword}
                        required
                    />

                    <label className="tutorLabel">Email</label>
                    <input 
                        className="formInput"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                        />

                    <label className="tutorLabel">First name</label>
                    <input 
                        className="formInput"
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                        required
                        />

                    <label className="tutorLabel">Last name</label>
                    <input 
                        className="formInput"
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                        required
                        />

                    <label className="tutorLabel">Occupation</label>
                    <select
                            required
                            name="degree"
                            onChange={handleChange}
                            value={formData.degree}>

                                <option>Cert Academic Tutor</option>
                                <option>Business Tutor</option>
                                <option>Engineering Tutor</option>
                                <option>IT Tutor</option>
                                <option>Film and Animation Tutor</option>
                                <option>Logistics Tutor</option>
                                <option>Visual Design Tutor</option>
                                <option>Web Media Tutor</option>
                                <option>English Communication Tutor</option>
                    </select>
                    
                    <button type="submit" className="button-19" onClick={handleSubmit}>Register</button>
                    {/* //fix onClick to make form validation work */}
                    
                </form>
                
            </div>
            </div>

        </div>
    </div>
    )
}