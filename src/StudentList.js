import React, { Component, useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent, NavBarTutor} from "./NavBar";
import axios from "axios";

    export default function StudentList() {
        
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;

        const getAccountType = localStorage.getItem("accountType");
        const getAccountName = localStorage.getItem("fullName");
        const [contacts, setContact] = React.useState([{}]);
        const [reportWindow, setReportWindow] = React.useState(false);
        const [reportID, setReportID] = React.useState(0);
        const [reported_userName, setReportedUserName] = React.useState("");
        const [reported_userID, setReported_userID] = React.useState(0);
        const [reported_userAccount, setReportedUserAccount] = React.useState("Student");
        const [reportForm, setReportForm] = React.useState(
            {title: "", submitted_by: getAccountName , account: getAccountType, body: "", submitted_on: currentDate, reported_userName: reported_userName, reported_userID: reported_userID, reported_userAccount: reported_userAccount}
            )

        function handleTextChange(event) {
            setReportForm(prevFormData=> {
                return {
                    ...prevFormData,
                    [event.target.name] : event.target.value,
                    "reported_userName" : reported_userName,
                    "reported_userID" : reported_userID}
            })
        }

        function handleSubmit(event) {
           
            event.preventDefault();
            console.log(reportForm);
          
            alert("Report Succesfully Submitted Succesfully")
            
            axios.post('http://localhost/reactProject/insertReport.php',reportForm) //fix this shiiiiit
            .then(res=> console.log(res.data))

            window.location.reload();
            }
        
        //Yet to be functional-----------------------------------------------
        function createReport(id, name){
            //The above arguments take the id, name, degree, and year of the reported student
            console.log("Creating report on user: " + id)
            setReportWindow(prevState => !prevState)
            setReportID(id);
            setReported_userID(id);
            setReportedUserName(name)
        }

        function closeReport() {
            setReportWindow(prevState => !prevState)
        }

        const url = 'http://localhost/reactProject/studentsMemberList.php';

        //Fetch the problems from the database
        useEffect(() => {
            axios.get(url).then(response=> response.data)
            .then((data) => {
                setContact(data)
            })
        }, [])

        function forwardIndex(index, student_id, student_name, student_degree, student_email) {
            localStorage.setItem('chatIndex', index);
            localStorage.setItem('student_id', student_id);
            localStorage.setItem('student_name', student_name);
            localStorage.setItem('student_degree', student_degree);
            localStorage.setItem('student_email', student_email);
            localStorage.setItem('sender_accountType', "Student");
        }
                
                return (
                    <div>
                    {getAccountType == "Student" ?<NavBarStudent/> : <NavBarTutor/>}
                        <div className="problemListTutorHead">
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
                                <div className="col col-4">Action</div>
                                <div className="col col-4">Report</div>
                                </li>

                                {contacts?.map((contact, index) => (
                                    <form key={index}>
                                        <li className="table-row" >
                                            <div className="col col-1" data-label="Degree">{contact.full_name}</div>
                                            <div className="col col-2" data-label="Subject">{contact.degree}</div>
                                            <div className="col col-3" data-label="Year">{contact.year}</div>
                                            <div className="col col-4" data-label="Title">
                                                <Link to={`/messagingInterface/?${index}`}>
                                                    <button className="messageBtn" onClick={() => forwardIndex(index, contact.id, contact.full_name, contact.degree, contact.email)}>Message</button>
                                                </Link>
                                            </div>
                                            <div className="col col-4" data-label="Tutor"><button type="button" className="reportBtn" onClick={() => createReport(contact.id, contact.full_name)}>Report</button></div>   
                                        </li>
                                    
                                        {reportWindow && contact.id == reportID &&
                                            <div className="createReportBody">
                                                <h2 className="createReportHeader">Create Report</h2>

                                                    <div>
                                                        {/* <label htmlFor="one">Title</label> */}
                                                        <input type="text" value={reportForm.title} id="one" name="title" onChange={handleTextChange} className="createReportTitle" placeholder="Title" required/>
                                                        <label htmlFor="three">Attach Image (Optional)</label>
                                                        <input type="file" id="three" name="reportImg" accept="image/png, image/jpeg"></input>
                                                    </div>

                                                    {/* <label htmlFor="two">Body</label> */}
                                                    {/* <input type="text" value={reportForm.body} id="two" name="body" onChange={handleTextChange} className="createReportContent" placeholder="Report Body" required/> */}
                                                    <textarea value={reportForm.body} id="two" name="body" onChange={handleTextChange} className="createReportContent" placeholder="Report Body" required></textarea>
                                                    <div>
                                                        <button className="messageSenderBtn" onClick={handleSubmit}>Submit Report</button>
                                                        <button className="messageSenderBtn" onClick={closeReport}>Close</button>
                                                    </div>
                                                
                                            </div>
                                        }
                                        
                                  
                                    </form>
                                ))}

                            
                        </ul>
                </div>
                )
                
            }
  
