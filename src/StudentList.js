import React, { Component, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import axios from "axios";




    export default function StudentList() {
        
        class Students extends React.Component{
            state = {
                contacts: []
            }
            
            componentDidMount() {
              
                const url = 'http://localhost/reactProject/studentsMemberList.php';
                axios.get(url).then(response=> response.data)
                .then((data) => {
                    this.setState({contacts: data})
                    console.log(this.state.contacts)
                })
                }
            
            // List(props) {

            //     return (
            //         <ul>
            //             {this.state.contacts?.map((contact, index) => (
            //                 <li key={index}>{contact.username}</li>
            //             ))}
            //         </ul>
            //     )
            // }

            render() {
                
                return (
                    <div>
                    <NavBarStudent/>
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

                                {this.state.contacts?.map((contact, index) => (
                                    <li className="table-row" key={index}>
                                        <div className="col col-1" data-label="Degree">{contact.full_name}</div>
                                        <div className="col col-2" data-label="Subject">{contact.degree}</div>
                                        <div className="col col-3" data-label="Year">{contact.year}</div>
                                        <div className="col col-4" data-label="Title"><button className="messageBtn">Message</button></div>
                                        <div className="col col-4" data-label="Tutor"><button className="reportBtn">Report</button></div>   
                                    </li>
                                ))}
                        </ul>
                </div>
                )
                
            }
        }
        
     
      return (
     
            <Students />
      )
        }

