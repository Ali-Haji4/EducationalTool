import React , {useEffect} from "react";
import axios from "axios";
import { NavbarAdmin } from "./NavBar";
import { Link , useNavigate} from "react-router-dom";

export default function ManageProblems () {


    const [problems, setProblems] = React.useState([{}]);

    //Fetch userID from Local Storage
    let userID = JSON.parse(localStorage.getItem("userID"));  
    //gets the account type that was set in the login page from local storage
    const getAccountType = localStorage.getItem("accountType");


    //Fetch the problems from the database
    const url = 'http://localhost/reactProject/problemsList.php';
    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setProblems(data);
    })
    }, [])

    function DeleteProblem(id) {
        console.log("deleting problem.." + id)
    }

    return (
        <div>
            <NavbarAdmin/>
                <div className="problemsList">

                    <div className="problemListTutorHead">
                        <h2>Problems List</h2>
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

                        {problems?.map((problem, index) => (
                                    <li className="table-row" key={index}>
                                        <div className="col col-1" data-label="Degree">{problem.degree}</div>
                                        <div className="col col-2" data-label="Subject">{problem.subject}</div>
                                        <div className="col col-3" data-label="Year">{problem.year}</div>
                                        <div className="col col-4" data-label="Title">{problem.title}</div> 
                                        <div className="col col-4" data-label="Tutor">{problem.tutor}</div> 
                                        <div className="col col-4" data-label="Created">{problem.created}</div> 
                                        <div className="col col-4" data-label="Action"><button className="reportBtn" onClick={() => DeleteProblem(problem.id)}>Delete Problem</button></div>
                                    </li>
                                ))}
                    
                    </ul>
            </div>
        </div>
    )
}