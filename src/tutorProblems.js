import React, { useEffect, useContext, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { NavBarTutor } from "./NavBar";

export default function TutorProblems() {

    
    const [contacts, setContacts] = React.useState([{}]);
    const url = 'http://localhost/reactProject/problemsList.php';

    const {id, setID} = useContext(idContext);

    //VARIABLE DECLARATION
    const [accountType, setAccountType] = React.useState(true);
    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  
    //gets the account type that was set in the login page from local storage
    const getAccountType = localStorage.getItem("accountType");

     //Check the account type form local storage to set the account type of the state
     useEffect(()=>{
        if(getAccountType == "Tutor") {
            setAccountType(true);
            console.log("Account set to Tutor");
        }
        else if (getAccountType == "Admin"){
            setAccountType(false);
            console.log("Account set to Admin");
        }
        else {
            console.log("Account set to Student");
        }
    },[])


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

    function DeleteProblem() {
        //HERE HE CAN DELETE HIS OWN CREATED PROBLEMS
        console.log("Deleting Problem....")
    }

    
    function forwardIndex(index, id, title, subject, year, tutor_id) {
        localStorage.setItem('problemIndex', index);
        localStorage.setItem('problemID', id);
        localStorage.setItem('problemTitle', title);
        localStorage.setItem('problemSubject', subject);
        localStorage.setItem('problemYear', year);
        localStorage.setItem('problemTutorID', tutor_id);
    }


    return(
        <div>
            <NavBarTutor/>
            <div className="tutorInterfaceBody">
                
                <div className="problemsList">

                    <div className="problemListTutorHead">
                        <h2>Problems List</h2>
                        <Link to="/CreateProblem">
                            <button className="button-19">Create Problem</button>
                        </Link>
                    </div>

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
                                        <div className="col col-4" data-label="Payment Status"> 
                                        <Link to={`/viewProblem/?${index}`}>
                                                <button className="messageBtn" onClick={() => forwardIndex(index, contact.id, contact.title, contact.subject, contact.year, contact.tutor_id)}>View Problem</button>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                       
                    </ul>
                </div>

                {/* <form action="userProfile.php" method="post" name="idForm">
                     <input type="hidden" id="tutorID" name="tutorID" value={id}/>
                </form> */}
            </div>
        </div>
    )
    
}
