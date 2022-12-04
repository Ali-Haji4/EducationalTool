import React, { useEffect, useContext, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavbarAdmin, NavBarTutor} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";

export default function ManageUsers() {

    const [contacts, setContacts] = React.useState([{}]);
    
    //Account type is changed whenever the radio button is changed by the use of State
    const [accountType, setAccountType] = React.useState("Student");    
    const {id, setID} = useContext(idContext);

    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  
    //gets the account type that was set in the login page from local storage
    const getAccountType = localStorage.getItem("accountType");
    //Links the form to a variable by using a react hook
    const form= useRef();
    //URL of each account type list
    const urlStudents = 'http://localhost/reactProject/studentsMemberList.php';
    const urlTutors = 'http://localhost/reactProject/tutorsMemberList.php';

    //Fetch the problems from the database
    useEffect(() => {
        if(accountType == "Student") {
        axios.get(urlStudents).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })}
        else {
            axios.get(urlTutors).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })
        }
    }, [accountType])
    
    

    function DeleteUser(id) {
        console.log("Deleting User...." + id);
        if(window.confirm("Press Ok To Verify Delete Account Action") == true) {
                form.current.submit();  
                alert("Account Deleted Succesfully2")
        }
    }

    function DeleteTutor(id) {
        console.log("Deleting Tutor...." + id);
        if(window.confirm("Press Ok To Verify Delete Account Action") == true) {
            document.getElementById("formTutor").submit();
            alert("Account Deleted Succesfully2")
    }
    }
    
    function changeAccountType(event) {
          
            if(event.target.value == "Student") {
                setAccountType("Student")
                console.log("Account: Student");
            }
            else {
                setAccountType("Tutor")
                console.log("Account: Tutor");
            }
          
    }

    return(
        <div>
            <NavbarAdmin/>
            <div className="tutorInterfaceBody">
                <h2>Choose List of Users</h2>
                    <div className="toggle">
                        <input type="radio" value="Student" id="one" onChange={changeAccountType} checked={accountType == "Student"} required/>
                        <label htmlFor="one">Students</label>
                        <input type="radio" value="Tutor" id="two" onChange={changeAccountType} checked={accountType == "Tutor"}/>
                        <label htmlFor="two">Tutors</label>
                    </div>

                {   accountType == "Student" &&
                    <div>
                            <div className="">
                                <h2>Students List</h2>
                                <div className="main">
                                
                                    <h1>React Search</h1>
                                        <div className="search">
                                        </div>
                                
                                </div>
                            </div>   
                        <ul className="responsive-table">

                                    <li className="table-header">
                                    <div className="col col-1">Name</div>
                                    <div className="col col-2">Degree</div>
                                    <div className="col col-3">Year</div>
                                    <div className="col col-4">Email</div>
                                    <div className="col col-4">Action</div>
                                    </li>
                                        {/* <form action="manageUsers.php" method="POST"> */}
                                    {contacts?.map((contact, index) => (
                                        <form ref={form} name="userIDForm" method="post" action="http://localhost/reactProject/manageUsers.php">
                                        <li className="table-row" key={index}>
                                            <div className="col col-1" data-label="Degree">{contact.full_name}</div>
                                            <div className="col col-2" data-label="Subject">{contact.degree}</div>
                                            <div className="col col-3" data-label="Year">{contact.year}</div>
                                            <div className="col col-4" data-label="Email">{contact.email}</div>
                                            <div className="col col-4" data-label="Action"><button className="reportBtn" onClick={() => DeleteUser(contact.id)}>Delete</button></div> 

                                            <input type="hidden" id="userID" name="userID" defaultValue={contact.id}/>
                                            
                                        </li>
                                        </form>
                                        
                                    ))}
                                        {/* </form> */}
                            </ul>
                    </div>}
                                                
                    {   accountType == "Tutor" &&
                        <div>
                            <div className="">
                                <h2>Tutors List</h2>
                                <div className="main">
                                
                                    <h1>React Search</h1>
                                        <div className="search">
                                        </div>
                                
                                </div>
                            </div>   
                        <ul className="responsive-table">

                                    <li className="table-header">
                                    <div className="col col-1">Name</div>
                                    <div className="col col-2">Degree</div>
                                    <div className="col col-3">Email</div>
                                    <div className="col col-4">Action</div>
                                    </li>

                                    {
                                    contacts?.map((contact, index) => (
                                        <form id="formTutor" name="tutorIDForm" method="post" action="http://localhost/reactProject/manageTutors.php" key={index}>
                                            <li className="table-row" >
                                                <div className="col col-1" data-label="Degree">{contact.full_name}</div>
                                                <div className="col col-2" data-label="Subject">{contact.degree}</div>
                                                <div className="col col-3" data-label="Year">{contact.email}</div>
                                                <div className="col col-4" data-label="Action"><button className="messageBtn" onClick={() => DeleteTutor(contact.id)}>Delete</button></div> 
                                                <input type="hidden" id="userIDD" name="userIDD" defaultValue={contact.id}/>
                                            </li>
                                        </form>
                                    ))}
                            </ul>
                    </div>}

            </div>
        </div>
    )
}
