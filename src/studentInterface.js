import React from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavBarStudent, TestBar} from "./NavBar";
import StudentList from "./StudentList";

export default function StudentInterface() {
    return(
        <div>
            <NavBarStudent/>
            {/* <TestBar/> */}
            <div className="studentInterfaceBody">
            </div>
        </div>
    )
}
