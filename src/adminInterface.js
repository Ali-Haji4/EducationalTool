import React , {Component} from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavbarAdmin, NavBarStudent, TestBar} from "./NavBar";
import StudentList from "./StudentList";
import axios from "axios";

export default function AdmintInterface() {
    
    //find a method to put it inside the class
    function viewReport() {
        console.log("Viewing Report")
    }
    
    class Reports extends React.Component {
        state = {
            reports: []
        }

        componentDidMount() {
                
            const url = 'http://localhost/reactProject/reportsList.php';
            axios.get(url).then(response=> response.data)
            .then((data) => {
                this.setState({reports: data})
                console.log(this.state.reports)
            })
            }
        
        

        render () {
            
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

                            </li>

                            {this.state.reports?.map((reports, index) => (
                            <li className="table-row" key={index}>
                            <div className="col col-1" data-label="">{reports.title}</div>
                            <div className="col col-2" data-label="">{reports.submitted_by}</div>
                            <div className="col col-3" data-label="">{reports.account}</div>
                            <div className="col col-4" data-label="">{reports.submitted_on}</div>
                            <div className="col col-4" data-label=""><button className="messageBtn" onClick={viewReport}>View Report</button></div>
                            </li>))}
                        
                        </ul>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <Reports />
    )


}
