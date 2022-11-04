import React from "react";
import { Link , useNavigate} from "react-router-dom";


export default function SignUpStudent() {

    const [formData, setFormData] = React.useState(
        {username: "", password: "", confirmedPassword: "", firstName: "", lastName: "", email: "", year: "", degree: ""}
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
        event.preventDefault()
        console.log(formData)
        if (formData.password === formData.confirmedPassword) {
            console.log("Succesfully signed up")
        }
        else {console.log("Passwords do not match")}

     
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
                <img className="registrationImage" src="background5.jpg"></img>
            </div>
            <div className="registrationFormSection">

                <h1 className="studentRegistrationTitle">Student Registration</h1>

                <div className="SignUpFormStudent">
                    <form className="form" onSubmit={handleSubmit}>
                        <label className="studentLabel">Username</label>
                        <input 
                            className="formInput" 
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            required
                            />
                        <label className="studentLabel">Password</label>
                        <input 
                            className="formInput"
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            />
                        <label className="studentLabel">Confirm Password</label>
                        <input 
                        className="formInput"
                            type="password" 
                            placeholder="Confirm password"
                            name="confirmedPassword"
                            onChange={handleChange}
                            value={formData.confirmedPassword}
                            required
                        />
                        <label className="studentLabel">Email</label>
                        <input 
                            className="formInput"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={formData.lastName}
                            required
                            />
                         
                        <label className="studentLabel">First name</label>
                            <input 
                            className="formInput"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={formData.firstName}
                            required
                            />
                        <label className="studentLabel">Last name</label>
                            <input 
                            className="formInput"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={formData.lastName}
                            required
                            />
            
                         <label className="studentLabel">Degree</label>
                            <select
                            name="degree"
                            onChange={handleChange}
                            value={formData.degree}
                            required  >
                                    
                                <option>Cert Academic</option>
                                <option>Business</option>
                                <option>Engineering</option>
                                <option>IT</option>
                                <option>Film and Animation</option>
                                <option>Logistics</option>
                                <optin>Visual Design</optin>
                                <option>Web Media</option>
                            </select>

                        <label className="studentLabel">Year</label>
                        <select
                            name="year"
                            onChange={handleChange}
                            value={formData.year}
                            required  >
                                <option>Year 1</option>
                                <option>Year 2</option>
                                <option>Year 3</option>
                                <option>Year 4</option>
                            </select>
                        <button className="button-19" onClick={registerAlert}>Register</button>
                    </form>
                </div>
            </div>
           

            </div>
    </div>
    )
}