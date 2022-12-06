import React , {Component, useRef, useState, useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavbarAdmin, NavBarStudent, TestBar} from "./NavBar";
import StudentList from "./StudentList";
import axios from "axios";

export default function AdmintInterface() {
    
    const [viewMode, setViewMode] = React.useState(false);
    const [viewID, setViewID] = React.useState(0);
    const [reports, setReports] = React.useState([{}]);

    //Attack a reference to a form
    const form = useRef();

     //Fetch the problems from the database
     const url = 'http://localhost/reactProject/reportsList.php';
     useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setReports(data);
    })
    }, [])

    //find a method to put it inside the class
    function viewReport(id) {
        
        setViewID(id);
        setViewMode(prevMode => !prevMode)
        console.log("Viewing Report" + id + " -- "+viewID)
        console.log(viewMode);
    }

    function deleteReport(id) {
        console.log("Deleting Report...." + id);
        if(window.confirm("Press Ok To Verify Delete Report Action") == true) {
                form.current.submit();  
                alert("Report Deleted Succesfully")
        }
    }
            
            return(
                <div>
                    <NavbarAdmin/>
                    <div className="adminInterfaceBody">
                    <div className="problemsList">

                        <div className="problemListTutorHead">
                            <h2>Reports List</h2>
                        </div>

                        <ul className="responsive-table">
                            <li className="table-header">
                            <div className="col col-1">Title</div>
                            <div className="col col-2">Submitted By</div>
                            <div className="col col-3">Account</div>
                            <div className="col col-4">Submitted On</div>
                            <div className="col col-4">Action</div>
                            <div className="col col-4">Manage</div>

                            </li>

                            {reports?.map((reports, index) => (
                                <form ref={form} name="report" method="post" action="http://localhost/reactProject/manageReports.php" key={index}>
                                    <li className="table-row" >
                                    <div className="col col-1" data-label="">{reports.title}</div>
                                    <div className="col col-2" data-label="">{reports.submitted_by}</div>
                                    <div className="col col-3" data-label="">{reports.account}</div>
                                    <div className="col col-4" data-label="">{reports.submitted_on}</div>
                                    <div className="col col-4" data-label=""><button type="button" className="messageBtn" onClick={() => viewReport(reports.id)}>View</button></div>
                                    <div className="col col-4" data-label=""><button className="reportBtn" onClick={() => deleteReport(reports.id)}>Delete</button></div>
                                    <input type="hidden" id="reportID" name="reportID" defaultValue={reports.id}/>
                                    </li>

                                    {viewMode && reports.id == viewID && 
                                    <div className="viewReportBody">
                                        <h2>Report Body:</h2>
                                        <h3>{reports.body}</h3>
                                        <button className="saveProfileBtn">Message Sender</button>
                                    </div>        
                                    }
                                </form>
                                ))}
                        
                        </ul>
                        </div>
                    </div>
                </div>
            )
        }
