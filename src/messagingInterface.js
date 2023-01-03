import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarStudent } from "./NavBar";
import { NavBarTutor } from "./NavBar";
import axios from "axios";

export default function MessagingInterface() {

    const getUserID = localStorage.getItem("userID");
    const getAccountType = localStorage.getItem("accountType");
    const getSenderID = localStorage.getItem("student_id");
    const getSenderName = localStorage.getItem("student_name");
    const getSenderDegree = localStorage.getItem("student_degree");
    const getSenderEmail = localStorage.getItem("student_email");
    const getSenderAccountType = localStorage.getItem("sender_accountType");
    const getUserName = localStorage.getItem("fullName");
    const navigate = useNavigate();

    const [chatData, setChatData] = React.useState({ message_title: "", message_content: "", sender_id: getSenderID, receiver_id: getUserID, sender_account: getSenderAccountType, sender_degree: getSenderDegree, creator_name: getUserName, receiver_name: getSenderName});

    const exitPage = () => {
        window.history.back();
        };

    function SubmitAnswer(event) {
        event.preventDefault();

        //REPLACE WITH NEW PROBLEM CREATION PHP FILE
        axios.post('http://localhost/reactProject/insertMessage.php', chatData) 
        .then(res=> console.log(res.data))

        alert("Message Submitted Succesfully")
        navigate(`/studentProblems`);
        }

    function handleChange(event) {
        setChatData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
        console.log(chatData)
        }

    return (
    <div>
            {getAccountType == "Student" ?<NavBarStudent/> : <NavBarTutor/>}
                        <div className="chatInterface">
                            
                            <div className="chatHeader">
                                <h2>Message {getSenderName} ({getSenderAccountType})</h2>
                                <h4>{getSenderDegree} || {getSenderEmail}</h4>
                            </div>
                            <div className="chatContainer">
                                <div className="chatTitle">
                                    <textarea 
                                    className="chatBoxTitle" 
                                    placeholder="Type your message title"
                                    name="message_title"
                                    onChange={handleChange}
                                    value={chatData.message_title}
                                    />
                                </div>
                                <div>
                                    <textarea 
                                    className="chatBox" 
                                    placeholder="Type your message"
                                    name="message_content"
                                    onChange={handleChange}
                                    value={chatData.message_content}
                                    />
                                </div>
                                <div>
                                    <button className="button-11" onClick={SubmitAnswer}>Send</button>
                                </div>
                          
                            </div>
                            <div className="solveFooter">
                                <button className="button-13" onClick={exitPage}>Exit</button>
                            </div>
                        </div>   
    </div>
    )
}