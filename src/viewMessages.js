import React, { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import {NavbarAdmin, NavBarStudent, NavBarTutor} from "./NavBar";
import axios from "axios";
import { idContext } from "./ID_Context";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForwardedProblem from "./ForwardedProblem";

export default function ViewMessages() {

    const navigate = useNavigate();

    const getAccountType = localStorage.getItem("accountType")
    const getUserID = localStorage.getItem("userID");
    const [messages, setMessages] = React.useState([{}]);
 

    //Fetchign list of messages from the database
    const url = 'http://localhost/reactProject/messagesList.php';

    useEffect(() => {
        axios.get(url).then(response=> response.data)
    .then((data) => {
        setMessages(data);
    })

    }, [])

    const exitPage = () => {
        window.history.back();
        };

    return (
        <div>
            {getAccountType == "Tutor" ? <NavBarTutor/>: <NavBarStudent/>}
            
            {       
                      messages?.map((message, index) => (
                        message.sender_id == getUserID &&
                      <div key={index} className="viewChatOutline">
                        <h1>-{message.message_title}-</h1>
                        <h2>{message.message_content}</h2>
                        <h3>Message by: {message.receiver_name}</h3>
                      </div> 
                    )) 
                }
       
            <div className="solveFooter">

                <button className="button-13" onClick={exitPage}>Exit</button>
            </div>
     
        </div>
    )
}