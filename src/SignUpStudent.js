import React from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignUpStudent() {

    //Storing form data
    const [formData, setFormData] = React.useState(
        {username: "", password: "", confirmedPassword: "", firstName: "", lastName: "", email: "", year: "1", degree: "Cert Academic"}
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
        
        //Validate Passowrd
        if (formData.password === formData.confirmedPassword) {
            console.log("Succesfully signed up");
            axios.post('http://localhost/reactProject/insertStudent.php',formData) //fix this shiiiiit
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
                <img className="registrationImage" src="background5.jpg"></img>
            </div>
            <div className="registrationFormSection">

                <h1 className="studentRegistrationTitle">Student Registration</h1>

                {errorMsg && <p className="loginError">{errorMsgText}</p>}

                <div className="SignUpFormStudent">
                    <form name="signUpForm" action="insertStudent.php" method="post" className="form" onSubmit={handleSubmit}>
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

                        <div className="passwordTip">
                            <span className="passwordTipText">Minimum eight characters. At least one uppercase letter, one lowercase letter and one number</span>
                            <label className="studentLabel">Password</label>
                            <span>*</span>
                        </div>  
                     
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
                            value={formData.email}
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
                                <option>Visual Design</option>
                                <option>Web Media</option>
                            </select>

                        <label className="studentLabel">Year</label>
                        <select
                            name="year"
                            onChange={handleChange}
                            value={formData.year}
                            required  >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        <button className="button-19" onClick={handleSubmit}>Register</button>
                    </form>
                </div>
            </div>
           

            </div>
    </div>
    )
}