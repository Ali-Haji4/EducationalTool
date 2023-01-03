import React, { useEffect, useContext, useRef } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBarStudent, NavBarTutor } from "./NavBar";
import { idContext } from "./ID_Context";


export default function Profile() {

    //VARIABLE DECLARATION
    const [accountType, setAccountType] = React.useState(true);
    const [editingMode, setEditingMode] = React.useState(false);
    const {id, setID} = useContext(idContext);
    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));
    const navigate = useNavigate();    
    let form = useRef();
    //To fetch user profile data
    const [profile, setProfile] = React.useState([{}]);
    //gets the account type that was set in the login page from local storage
    const getAccountType = localStorage.getItem("accountType");
    //Storing form data
    const [formData, setFormData] = React.useState(
    {password: "", firstName: "", lastName: "", fullName: "", email: "", year: "0", degree: ""}
    )

    const [postURL, setPostURL] = React.useState("");
    //Check the account type form local storage to set the account type of the state
    useEffect(()=>{
        if(getAccountType == "Student") {
            setAccountType(true);
            setPostURL("http://localhost/reactProject/updateStudent.php")
            console.log("Account set to Student");
            console.log("url: " + postURL);
        }
        else if (getAccountType == "Tutor"){
            setAccountType(false);
            setPostURL("http://localhost/reactProject/updateTutor.php")
            console.log("Account set to Tutor");
            console.log("url: " + postURL);
        }
    },[])

    console.log("React refreshing count");
    
    function handleChange(event) {
        setFormData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
    }

    function editProfile() {
        console.log("Editing");
        setEditingMode(prevMode => !prevMode);
    }

    function deleteAccount() {
        console.log("Deleting");
          
        if(window.confirm("Press Ok To Verify Delete Account Action") == true) {
            form.current.submit();  
            localStorage.clear();
            alert("Account Deleted Succesfully")
            navigate("/");
        }
    }

    function changePassword() {
        
    }

    function submitChange() {
    
        console.log("Saving");
        console.log(formData);

        //Variables to get data from form below
        const firstName = document.editDataForm.firstName.value;
        const lastName = document.editDataForm.lastName.value;
        const email= document.editDataForm.email.value;  
        const password= document.editDataForm.password.value;  
        const confirmedPassword= document.editDataForm.confirmedPassword.value;  
        const year= document.editDataForm.year.value;  

        setFormData({password: password, confirmedPassword: "", firstName: firstName, lastName: lastName, fullName: "", email: email, year: year})

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        
        if(formData.firstName==null || formData.firstName==""){
            alert("First Name can't be blank"); 
            return false;     
        }else if(formData.lastName==null || formData.lastName==""){
            alert("Last Name can't be blank"); 
            return false;     
        }
        else if(!passwordRegex.test(formData.password)){  
            alert("Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter and one number.");  
            return false;  
        }

        //Validate Email
        let x = email;  
        let atposition= x.indexOf("@");  
        let dotposition= x.lastIndexOf("."); 

        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
            alert("Please enter a valid e-mail address");  
            return false;  
        }  
        
        //Validate Passowrd
        if(password === confirmedPassword) {
            console.log("Succesfully changed data");

            //THE EDIT FUNCTION WORKS EVEN WITHOUT THE CODE BELOW FOR SOME REASON -> Because it purely uses php

            axios.post('http://localhost/reactProject/updateStudent.php',formData) 
            .then(res=> res.data)
            .catch(error => {
              console.log(error.response)
          });
        }
        else {
            console.log("Error occured")
        }
    }

    //Replace the Student url with Student Member List later because they are basically the same
    const urlStudent = 'http://localhost/reactProject/userProfile.php';
    const urlTutor = 'http://localhost/reactProject/tutorsMemberList.php';
    
    useEffect(() => {
        if(accountType) {
            axios.get(urlStudent).then(response=> response.data)
            .then((data) => {
            setProfile(data);
                if (profile.id = userID) {
                    console.log("This is user id :");
                    console.log(id)
                    console.log("Local storage ID: " + userID);
                    console.log("Fetched All Students");
                }
            })
        }
        else {
            axios.get(urlTutor).then(response=> response.data)
            .then((data) => {
            setProfile(data);
                if (profile.id = userID) {
                    console.log("This is user id :");
                    console.log(id)
                    console.log("Local storage ID: " + userID);
                    console.log("Fetched All Tutors");
                }
            })
        }
       
    }, [accountType])

    profile.forEach(element => {
        if(element.id == userID) {
    
            formData.password = element.password;
            formData.firstName = element.first_name;
            formData.lastName = element.last_name;
            formData.fullName = element.full_name;
            formData.degree =  element.degree;
            formData.year = element.year;
            formData.email = element.email;

        }
    
    });
      

    return (
        <div className="profileContainer">
            {accountType? <NavBarStudent/>: <NavBarTutor/>}
            <div className="profileBackground">
                <div className="profileBody">
           
                        {
                            //Display Picture depending on account type
                            accountType ?
                            <img src="student.png" className="viewProfilePic"></img>
                                        :
                            <img src="tutor.png" className="viewProfilePic"></img>            
                        }

                        <div>
                           
                        <form ref={form} name="userIDForm" method="post" action="http://localhost/reactProject/deleteUser.php">
                            <input type="hidden" id="userID" name="userID" defaultValue={userID}/>
                        </form>
                        
                            {editingMode ? 
                            // <form  name="editDataForm" className="profileDataView" method="post" action="http://localhost/reactProject/updateStudent.php"></form>
                            <form  name="editDataForm" className="profileDataView" method="post" action={postURL}>

                                <input type="hidden" id="userID" name="userID" defaultValue={userID}/>

                                <label className="studentLabel">First name</label>
                                <input 
                                className="formInput"
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                defaultValue={formData.firstName}
                                required
                                />

                                <label className="studentLabel">Last name</label>
                                <input 
                                className="formInput"
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                defaultValue={formData.lastName}
                                required
                                />

                                <label className="studentLabel">Email</label>
                                <input 
                                className="formInput"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                defaultValue={formData.email}
                                required
                                />

                                <label className="studentLabel">Password</label>
                                <input
                                    className="formInput"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
                                    defaultValue={formData.password}
                                />

                                { accountType &&
                                <>
                                    <label className="studentLabel">Year</label>
                                    <input
                                        className="formInput"
                                        type="number"
                                        placeholder="Year"
                                        name="year"
                                        onChange={handleChange}
                                        defaultValue={formData.year}
                                    />
                                </>
                                }

                                <button className="saveProfileBtn" onClick={submitChange}>Save Changes</button>
                            </form>
                            :
                            <div>
                                <h1 className="profileFullName">{formData.fullName}</h1>
                                {
                                    accountType ?
                                    <h2 className="profileDegree">{formData.degree} Student</h2>
                                                :
                                    <h2 className="profileDegree">{formData.degree} Tutor</h2>            
                                }
                                <h2 className="profileFirstName">First Name: {formData.firstName}</h2>
                                <h2 className="profileLastName">Last Name: {formData.lastName}</h2>
                                <h2 className="profileLastName">Email: {formData.email}</h2>
                                {/* <h2 className="profilePassword">Password: {formData.password}</h2>    */}
                            </div>  
                            }
                            <div className="profileBtnContainer">
                                <div className="editBtnContainer">
                                    <button className="editProfileBtn" onClick={editProfile}>Edit Profile</button>
                                </div>
                                <div>
                                    <button className="reportBtn" onClick={deleteAccount}>Delete Account</button>
                                </div>
                       
                            </div>
                    
                            
                          
                        </div>
                     
                    {
                    // //Displayed for Student Profile Only
                    // accountType ? 
                    //     <div className="studentStats">
                    //         <h1>Total Problems Solved:</h1>
                    //         <h1>Average Score:</h1>
                    //         <button className="reportBtnProfile" onClick={deleteAccount}>Delete Account</button>
                    //     </div> 
                    //             :
                    //     <div className="TeacherStats">
                    //         <h1>Total Problems Created:</h1>
                    //         <h1>Total Likes:</h1>
                    //     <button className="reportBtnProfile" onClick={deleteAccount}>Delete Account</button>
                    // </div> 
                    }
                </div>
            </div>

           
        </div>
   
    )
}