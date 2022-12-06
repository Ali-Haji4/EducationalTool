import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function StudentProblems() {

    const [contacts, setContacts] = React.useState([{}]);
    const url = 'http://localhost/reactProject/problemsList.php';

    const {id, setID} = useContext(idContext);

    //VARIABLE DECLARATION
    const [accountType, setAccountType] = React.useState(true);
    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  
    //gets the account type that was set in the login page from local storage
    const getAccountType = localStorage.getItem("accountType");

    //Fetch the problems from the database
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })
    }, [])
    
    function ViewProblem() {
        console.log("Problem Viewing...")
    }

    function forwardIndex(index) {
        localStorage.setItem('problemIndex', index);
    }
    return(
        <div>
            <NavBarStudent/>
            <div className="studentInterfaceBody">
                
                <div className="problemsList">

                    <h2>Problems List</h2>
                  
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Degree</div>
                            <div className="col col-2">Subject</div>
                            <div className="col col-3">Year</div>
                            <div className="col col-4">Title</div>
                            <div className="col col-4">Tutor</div>
                            <div className="col col-4">Created</div>
                            <div className="col col-4">Action</div>
                        </li>


                        {contacts?.map((contact, index) => (
                                    <li className="table-row" key={index}>
                                        <div className="col col-1" data-label="Degree">{contact.degree}</div>
                                        <div className="col col-2" data-label="Subject">{contact.subject}</div>
                                        <div className="col col-3" data-label="Year">{contact.year}</div>
                                        <div className="col col-4" data-label="a">{contact.title}</div> 
                                        <div className="col col-4" data-label="b">{contact.tutor}</div> 
                                        <div className="col col-4" data-label="c">{contact.created}</div> 
                                        <div className="col col-4" data-label="Payment Status"><button className="messageBtn" onClick={ViewProblem}>View Problem</button></div>

                                            <Link to={`/studentSolve/?${index}`}>
                                                <button className="navProfileBtn" onClick={() => forwardIndex(index)}>Solve</button>
                                            </Link>
                                      
                                   
                                    </li>
                                ))}
                       
                    </ul>
                </div>

            </div>
        </div>
    )
}
