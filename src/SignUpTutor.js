import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUpTutor() {

    const [formData, setFormData] = React.useState(
        {username: "", password: "", confirmedPassword: "", firstName: "", lastName: "", email: "", occupation: ""}
        )

        console.log(formData)

    function handleChange(event) {
        setFormData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
    }

    function handleSubmit(event) {
        console.log(formData)
        if (formData.password === formData.confirmedPassword) {
            console.log("Succesfully signed up")
        }
        else {console.log("Passwords do not match")}

        event.preventDefault()
    }

    const navigate = useNavigate();

    function registerAlert() {
        alert("Succesfully Registered. Redirecting to Login Page")
        navigate("/Login")
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

            <div className="SignUpFormStudent">
                <form className="form" onSubmit={handleSubmit}>

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
                            name="occupation"
                            onChange={handleChange}
                            value={formData.occupation}>

                                <option>Cert Academic Tutor</option>
                                <option>Business Tutor</option>
                                <option>Engineering Tutor</option>
                                <option>IT Tutor</option>
                                <option>Film and Animation Tutor</option>
                                <option>Logistics Tutor</option>
                                <optin>Visual Design Tutor</optin>
                                <option>Web Media Tutor</option>
                    </select>

                    <button type="submit" className="button-19" onClick={registerAlert}>Register</button>
                    {/* //fix onClick to make form validation work */}
                </form>
            </div>
            </div>

        </div>
    </div>
    )
}