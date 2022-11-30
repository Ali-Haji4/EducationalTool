import React, { useEffect, useContext } from "react";
import {json, Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { idContext } from "./ID_Context";

export default function Login() {

    const [formData, setFormData] = React.useState(
        {username: "", password: ""}
        )
    
    const {id, setID} = useContext(idContext);
    
    //Account type is changed whenever the radio button is changed by the use of State
    const [accountType, setAccountType] = React.useState("Student");    

    const [errorMsg, setErrorMsg] = React.useState(false);

    function changeAccountType(event) {
        // setAccountType(prevAccType => !prevAccType);
        if(event.target.value == "Student") {
            setAccountType("Student")
            console.log("Account: Student");
        }
        else if(event.target.value == "Tutor") {
            setAccountType("Tutor")
            console.log("Account: Tutor");
        }
        else {
            setAccountType("Admin")
            console.log("Account: Admin");
        }
       
    }

    const [loginCredentials, setLoginCredentials] = React.useState([{}]);

    console.log("log 1")
    console.log(formData)

    const url = 'http://localhost/reactProject/login.php';
    const urlTutor = 'http://localhost/reactProject/loginTutor.php';
    const urlAdmin = 'http://localhost/reactProject/loginAdmin.php';
     
    //Checks for account type and fetches the suitable data (Either Student or Tutor Lists)
    useEffect(()=> {
        if (accountType == "Student") {
            axios.get(url).then(response=> response.data)
            .then((data) => {
                setLoginCredentials(data)
            })
        }
        else if (accountType == "Tutor"){
            axios.get(urlTutor).then(response=> response.data)
            .then((data) => {
                setLoginCredentials(data)
            })
        }
        else {
            axios.get(urlAdmin).then(response=> response.data)
            .then((data) => {
                setLoginCredentials(data)
            })
        }
    }, [accountType]);
   

    const navigate = useNavigate();

    function handleChange(event) {
        setFormData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
    }

    function loginValid(event) {

        event.preventDefault();
        console.log(formData);
    
        let id=document.loginForm.username.value;  
        let ps=document.loginForm.password.value;  

        if(id.length=="" && ps.length=="") {  
            alert("User Name and Password fields are empty");  
            return false;  
        } else if  (id.length=="")
        {  
            alert("User Name is empty");  
            return false;  
        } else if (ps.length=="") {  
            alert("Password field is empty");  
            return false;  
        } else { 
            const data = loginCredentials?.map((info, key) => {
                let id1 = info.username;
                let ps2 = info.password;
                let userID = info.id;
                handleSubmit(id1, ps2, userID);
            })
        }
}

    function handleSubmit(username, password, id) {
       
        if(password === formData.password && username === formData.username) {
            //When login is succesfull
            if (accountType == "Student") {
                console.log("login id: ")
                console.log(id);

                setID(id);
                localStorage.setItem('userID', id);
                localStorage.setItem('accountType', "Student");
                navigate(`/studentInterface?id=${id}`);
                
            }
            else if (accountType == "Tutor"){
                console.log("login id: ")
                console.log(id);

                setID(id);
                localStorage.setItem('userID', id);
                localStorage.setItem('accountType', "Tutor");
                navigate(`/tutorInterface?id=${id}`);
                
            }
            else {
                console.log("login id: ")
                console.log(id);

                setID(id);
                localStorage.setItem('userID', id);
                localStorage.setItem('accountType', "Admin");
                navigate(`/adminInterface?id=${id}`);
            }
        }
        else {
            //When Login is unsuccesfull
            // console.log("Error occured")
            // console.log(username);
            // console.log(password);
            // console.log(formData.username);
            // console.log(formData.password);
            setErrorMsg(true);
        }
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

                {accountType == "Student" &&
                //TRUE CONDITION
                <div className="loginForm">
                    <h2>Login to Your Account (Student)</h2>
                        <div className="toggle">
                            <input type="radio" value="Student" id="one" onChange={changeAccountType} checked={accountType == "Student"} required/>
                            <label htmlFor="one">Student</label>
                            <input type="radio" value="Tutor" id="two" onChange={changeAccountType} checked={accountType == "Tutor"}/>
                            <label htmlFor="two">Tutor</label>
                            <input type="radio" value="Admin" id="three" onChange={changeAccountType} checked={accountType == "Admin"}/>
                            <label htmlFor="three">Admin</label>
                            
                        </div>
                    <form name="loginForm" action="login.php" method="post" className="form" onSubmit={loginValid}>
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
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />

                        {/* //DELETE THIS IF NO USE */}
                        <input type="hidden" id="studentId" name="studentId" value={id}/>

                        {errorMsg && <p className="loginError">Couldn't find your account, please enter correct credentials.</p>}
                        <button type="submit" className="button-19" onClick={loginValid}>LOG IN</button>
                       
                    </form>
                    <p>Don't have an account?</p>
                    <Link to="/SignUp" className="">Sign Up</Link>

                </div> }

                
                { accountType == "Tutor" &&
                  <div className="loginForm">
                  <h2>Login to Your Account (Tutor)</h2>
                        <div className="toggle">
                            <input type="radio" value="Student" id="one" onChange={changeAccountType} checked={accountType == "Student"} required/>
                            <label htmlFor="one">Student</label>
                            <input type="radio" value="Tutor" id="two" onChange={changeAccountType} checked={accountType == "Tutor"}/>
                            <label htmlFor="two">Tutor</label>
                            <input type="radio" value="Admin" id="three" onChange={changeAccountType} checked={accountType == "Admin"}/>
                            <label htmlFor="three">Admin</label>
                        </div>
                  <form name="loginForm" action="login.php" method="post" className="form" onSubmit={loginValid}>
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
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                      />
                      {errorMsg && <p className="loginError">Couldn't find your account, please enter correct credentials.</p>}
                      <button type="submit" className="button-19" onClick={loginValid}>LOG IN</button>
                     
                  </form>
                  <p>Don't have an account?</p>
                  <Link to="/SignUp" className="">Sign Up</Link>

              </div>
                }

            { accountType == "Admin" &&
                  <div className="loginForm">
                  <h2>Login to Your Account (Admin)</h2>
                        <div className="toggle">
                            <input type="radio" value="Student" id="one" onChange={changeAccountType} checked={accountType == "Student"} required/>
                            <label htmlFor="one">Student</label>
                            <input type="radio" value="Tutor" id="two" onChange={changeAccountType} checked={accountType == "Tutor"}/>
                            <label htmlFor="two">Tutor</label>
                            <input type="radio" value="Admin" id="three" onChange={changeAccountType} checked={accountType == "Admin"}/>
                            <label htmlFor="three">Admin</label>
                        </div>
                  <form name="loginForm" action="login.php" method="post" className="form" onSubmit={loginValid}>
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
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                      />
                      {errorMsg && <p className="loginError">Couldn't find your account, please enter correct credentials.</p>}
                      <button type="submit" className="button-19" onClick={loginValid}>LOG IN</button>
                     
                  </form>
                  <p>Don't have an account?</p>
                  <Link to="/SignUp" className="">Sign Up</Link>

              </div>
                }
            </div>
            
        </div>
    )
}