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
    //Filter Components
    //Storing Filter data
    const [filterData, setFilterData] = React.useState(
        {year: "Year", degree: "Degree", difficulity: ""}
        )
    const [filterMode, setFilterMode] = React.useState(false);
    const [shutOff, setShutOff] = React.useState(false);
    const [yearFilter, setYearFilter] = React.useState("");
    const [soloFilterYear, setSoloFilterYear] = React.useState(true);
    const [soloFilterDegree, setSoloFilterDegree] = React.useState(true);
    const [degreeFilter, setDegreeFilter] = React.useState("");

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

    //UseEffect that deals with the filter method
    useEffect(() => {
        if(filterData.year !== "Year" &&  filterData.degree !== "Degree" ) {
            // setSoloFilter(prevState => !prevState);
            setSoloFilterYear(false);
            setSoloFilterDegree(false);
            setShutOff(true);
            console.log("shut off:" + shutOff);
        }
        else if (filterData.year !== "Year" &&  filterData.degree == "Degree" ){
                setSoloFilterYear(true);
        }
        else if (filterData.year == "Year" &&  filterData.degree !== "Degree" ){
            setSoloFilterDegree(true);
    }
        console.log("Shut off:" + shutOff)
        console.log("Solo degree:" + soloFilterDegree)
        console.log("Solo year:" + soloFilterYear)

    }, [filterData])

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

    
    function clearFilters() {
        console.log("cleaning...")
        
        setFilterData({year: "Year", degree: "Degree", difficulity: ""})
        setFilterMode(false);
        setShutOff(false);
    }

    //React to data change    
    function handleChange(event) {
        setFilterMode(true);
        setFilterData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
            })

        console.log(filterData)
        

        filterData.degree !== "Degree"? 
        setDegreeFilter(true)
    :  setDegreeFilter(false)

    filterData.year !== "Year"? 
    setYearFilter(true)
    :  setYearFilter(false)

    console.log("degree filter: " + degreeFilter)
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

                    <div className="filterSection">

                        <select name="degree" className="button-11" onChange={handleChange} value={filterData.degree}>
                            <option value="">Degree</option>
                            <option>Cert Academic</option>
                            <option>Business</option>
                            <option>Engineering</option>
                            <option>IT</option>
                            <option>Film and Animation</option>
                            <option>Logistics</option>
                            <option>Visual Design</option>
                            <option>Web Media</option>
                        </select>

                        <select name="year" className="button-11" onChange={handleChange} value={filterData.year}>
                            <option>Year</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>

                        <input type="hidden" name="year" value="2"></input>

                        <button className="button-11" onClick={clearFilters}>Clear Filters</button>
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
                  

                        {//SHOWS EVERYTHING (DEFAULT MODE)
                        filterMode == false &&
                        contacts?.map((contact, index) => (
                         
                            
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

                        {//SHOWS WHEN ONLY THE YEAR FILTER IS ON
                        contacts?.map((contact, index) => (
                            <div key={index}>
                                {filterMode == true && filterData.year == contact.year && degreeFilter == false && soloFilterYear &&
                                    <li className="table-row" >
                                  
                                    <div className="col col-1" data-label="Degree">{contact.degree}</div>
                                    <div className="col col-2" data-label="Subject">{contact.subject}</div>
                                    <div className="col col-3" data-label="Year">{contact.year}</div>
                                    <div className="col col-4" data-label="a">{contact.title}</div> 
                                    <div className="col col-4" data-label="b">{contact.tutor}</div> 
                                    <div className="col col-4" data-label="c">{contact.created}</div> 
                                    <div className="col col-4" data-label="Payment Status"> 
                                        <Link to={`/studentSolve/?${index}`}>
                                            <button className="messageBtn" onClick={() => forwardIndex(index, contact.id, contact.title, contact.subject, contact.year, contact.tutor_id)}>View Problem</button>
                                        </Link>
                                    </div>
                                </li>}
                                </div>
                            ))}
                       
                       {//SHOWS WHEN BOTH DEGREE AND YEAR ARE ON
                        contacts?.map((contact, index) => (
                            <div key={index}>
                                {
                                // filterMode == true && filterData.year == contact.year && degreeFilter == true && filterData.degree == contact.degree &&
                                    filterMode == true  && contact.year === filterData.year && filterData.degree == contact.degree &&
                                    <li className="table-row" >
                                   
                                    <div className="col col-1" data-label="Degree">{contact.degree}</div>
                                    <div className="col col-2" data-label="Subject">{contact.subject}</div>
                                    <div className="col col-3" data-label="Year">{contact.year}</div>
                                    <div className="col col-4" data-label="a">{contact.title}</div> 
                                    <div className="col col-4" data-label="b">{contact.tutor}</div> 
                                    <div className="col col-4" data-label="c">{contact.created}</div> 
                                    <div className="col col-4" data-label="Payment Status"> 
                                        <Link to={`/studentSolve/?${index}`}>
                                            <button className="messageBtn" onClick={() => forwardIndex(index, contact.id, contact.title, contact.subject, contact.year, contact.tutor_id)}>View Problem</button>
                                        </Link>
                                    </div>
                                </li>}
                                </div>
                            ))}

                        {//SHOWS ONLY WHEN THE DEGREE FILTER IS ON 
                        contacts?.map((contact, index) => (
                            <div key={index}>
                                  
                                {filterMode == true && filterData.degree == contact.degree && soloFilterDegree == true && shutOff === false &&
                                    <li className="table-row" >
                              
                                    <div className="col col-1" data-label="Degree">{contact.degree}</div>
                                    <div className="col col-2" data-label="Subject">{contact.subject}</div>
                                    <div className="col col-3" data-label="Year">{contact.year}</div>
                                    <div className="col col-4" data-label="a">{contact.title}</div> 
                                    <div className="col col-4" data-label="b">{contact.tutor}</div> 
                                    <div className="col col-4" data-label="c">{contact.created}</div> 
                                    <div className="col col-4" data-label="Payment Status"> 
                                        <Link to={`/studentSolve/?${index}`}>
                                            <button className="messageBtn" onClick={() => forwardIndex(index, contact.id, contact.title, contact.subject, contact.year, contact.tutor_id)}>View Problem</button>
                                        </Link>
                                    </div>
                                </li>}
                                </div>
                            ))}
                    </ul>
                </div>

            </div>
        </div>
    )
    
}
