import React from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent} from "./NavBar";
import StudentList from "./StudentList";

export default function StudentInterface() {
    return(
        <div>
            <NavBarStudent/>
            
            <div className="studentInterfaceBody">
            </div>
        </div>
    )
}
