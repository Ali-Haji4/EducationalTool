import React from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarTutor} from "./NavBar";

export default function TutorInterface() {
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

                    <ul class="responsive-table">
                        <li class="table-header">
                        <div class="col col-1">Degree</div>
                        <div class="col col-2">Subject</div>
                        <div class="col col-3">Year</div>
                        <div class="col col-4">Title</div>
                        <div class="col col-4">Tutor</div>
                        <div class="col col-4">Created</div>
                        <div class="col col-4">Action</div>
                    
                        </li>
                        <li class="table-row">
                        <div class="col col-1" data-label="Degree">IT</div>
                        <div class="col col-2" data-label="Subject">Web Fundementals</div>
                        <div class="col col-3" data-label="Year">4</div>
                        <div class="col col-4" data-label="Title">Pending</div>
                        <div class="col col-4" data-label="Tutor">Pending</div>
                        <div class="col col-4" data-label="Created">Pending</div>
                        <div class="col col-4" data-label="Payment Status"><button className="">View Problem</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col col-1" data-label="Degree">Business</div>
                        <div class="col col-2" data-label="Subject">Introduction to Accounting</div>
                        <div class="col col-3" data-label="Year">3</div>
                        <div class="col col-4" data-label="Title">Pending</div>
                        <div class="col col-4" data-label="Tutor">Pending</div>
                        <div class="col col-4" data-label="Created">Pending</div>
                        <div class="col col-4" data-label="Action"><button className="">View Problem</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col col-1" data-label="Degree">Visual Design</div>
                        <div class="col col-2" data-label="Subject">Storyboarding</div>
                        <div class="col col-3" data-label="Year">4</div>
                        <div class="col col-4" data-label="Title">Pending</div>
                        <div class="col col-4" data-label="Tutor">Pending</div>
                        <div class="col col-4" data-label="Created">Pending</div>
                        <div class="col col-4" data-label="Action"><button className="">View Problem</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col col-1" data-label="Degree">IT</div>
                        <div class="col col-2" data-label="Subject">Unix Systems</div>
                        <div class="col col-3" data-label="Year">1</div>
                        <div class="col col-4" data-label="Title">Pending</div>
                        <div class="col col-4" data-label="Tutor">Pending</div>
                        <div class="col col-4" data-label="Created">Pending</div>
                        <div class="col col-4" data-label="Action"><button className="">View Problem</button></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
