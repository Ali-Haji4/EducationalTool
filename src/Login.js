import React from "react";
import {Link} from 'react-router-dom';

export default function Login() {

    const [formData, setFormData] = React.useState(
        {username: "", password: ""}
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
      
    }

    return (
   
        <div className="LoginPage">
            <div className="navigationBar">
                <Link className="websiteNameLogin" to="/">
                <h1 className="websiteNameLogin">Poly Sphere</h1>
                </Link>
            </div>
            <div className="loginBody">
                <div className="loginImageSection">
                    <h1 className="loginWelcomeText">Good to see you again</h1>
                    <img className="registrationImageLogin" src="background6.jpg"/>
                </div>
                <div className="loginForm">
                    <h2>Login to Your Account</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <label className="studentLabel">Username</label>
                        <input 
                            className="formInput"
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            />
                        <label className="studentLabel">Password</label>
                        <input
                            className="formInput"
                            type="text"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    
                        <button className="button-19">LOG IN</button>
                        <p>Don't have an account?</p>
                        <Link to="/SignUp" className="">Sign Up</Link>
                    </form>
                </div>
            </div>
            
        </div>
    )
}