import React from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarTutor} from "./NavBar";
import axios from "axios";
import { NavBarStudent } from "./NavBar";

export default function TutorList() { 

    class Tutors extends React.Component{
        state = {
            contacts: []
        }
    componentDidMount() {
            
        const url = 'http://localhost/reactProject/tutorsMemberList.php';
        axios.get(url).then(response=> response.data)
        .then((data) => {
            this.setState({contacts: data})
            console.log(this.state.contacts)
        })
            }

        render() {
            return (
                <div>
                <NavBarStudent/>
                    <div className="problemListTutorHead">
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
                            <div className="col col-3">Action</div>
                            <div className="col col-4">Report</div>
                            </li>


                                {this.state.contacts?.map((contact, index) => (
                                    <li className="table-row" key={index}>
                                    <div className="col col-1" data-label="Degree">{contact.full_name}</div>
                                    <div className="col col-2" data-label="Subject">{contact.degree}</div>
                                    <div className="col col-3" data-label="Title"><button className="messageBtn">Message</button></div>
                                    <div className="col col-4" data-label="Tutor"><button className="reportBtn">Report</button></div>   
                                    </li>
                                ))}

                        
                            
                        </ul>
            </div>
            )
        }}
    return (<Tutors/>)}