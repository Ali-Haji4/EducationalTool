import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarTutor} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";

export default function TutorInterface() {

    const [contacts, setContacts] = React.useState([{}]);
    const url = 'http://localhost/reactProject/problemsList.php';

    const {id, setID} = useContext(idContext);

    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setContacts(data);
    })
    }, [])
    
    window.onload = function(){
        document.forms['idForm'].submit();
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
                        <li className="table-row">
                        <div className="col col-1" data-label="Degree">IT</div>
                        <div className="col col-2" data-label="Subject">Web Fundementals</div>
                        <div className="col col-3" data-label="Year">4</div>
                        <div className="col col-4" data-label="Title">Pending</div>
                        <div className="col col-4" data-label="Tutor">Pending</div>
                        <div className="col col-4" data-label="Created">Pending</div>
                        <div className="col col-4" data-label="Payment Status"><button className="messageBtn">View Problem</button></div>
                        </li>

                        {contacts?.map((contact, index) => (
                                    <li className="table-row" key={index}>
                                        <div className="col col-1" data-label="Degree">{contact.degree}</div>
                                        <div className="col col-2" data-label="Subject">{contact.subject}</div>
                                        <div className="col col-3" data-label="Year">{contact.year}</div>
                                        <div className="col col-4" data-label="a">{contact.title}</div> 
                                        <div className="col col-4" data-label="b">{contact.tutor}</div> 
                                        <div className="col col-4" data-label="c">{contact.created}</div> 
                                        <div className="col col-4" data-label="Payment Status"><button className="messageBtn">View Problem</button></div>
                                    </li>
                                ))}
                       
                    </ul>
                </div>

                <form action="userProfile.php" method="post" name="idForm">
                     <input type="hidden" id="tutorID" name="tutorID" value={id}/>
                </form>
            </div>
        </div>
    )
}
