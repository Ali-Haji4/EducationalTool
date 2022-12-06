import React, {useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import { NavBarTutor } from "./NavBar";
import axios from "axios";

export default function CreateProblem() {

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

     //gets the full name and degree from local storage
     const getFullName = localStorage.getItem("fullName");
     const getDegree = localStorage.getItem("degree");

     //List of subjects
     const [subjectsList, setSubjectsList] = React.useState([{}]);

    //Tutor and Degree should automatically be fetched by using local or session storage
    const [problemData, setProblemData] = React.useState(
        {degree: getDegree, subject: "", year: "", title: "", tutor: getFullName, created: currentDate, content: "", file: ""}
        )
    
    //URL of subjects database
    const url = 'http://localhost/reactProject/subjectsList.php';

    //Fetch the problems from the database
    useEffect(() => {
        axios.get(url).then(response=> response.data)
        .then((data) => {
            setSubjectsList(data)
        })

        console.log(subjectsList);
    }, [])    
    
    function handleChange(event) {
        setProblemData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
        console.log(problemData);
        }
        
    function handleSubmit(event) {
        
        event.preventDefault();
        console.log(problemData);
        
        alert("Problem Created Succesfully")
        
        //REPLACE WITH NEW PROBLEM CREATION PHP FILE
        axios.post('http://localhost/reactProject/insertProblem.php', problemData) //fix this shiiiiit
        .then(res=> console.log(res.data))

        //PERHAPS REDIRECT TO PROBLEM PAGES
        window.location.reload();
        }

    return (
        <div>
            <NavBarTutor/>
            <h1>Create a Problem</h1>
            <form>

                <h2>Subject</h2>
                    <select className="problemSubjectSelect" value={problemData.subject} name="subject" onChange={handleChange} required>
                        <option value="None">Choose Subject</option>
                        {subjectsList?.map((subject, index)=> (
                            subject.degree === getDegree && 
                                <option  value={subject.subject} key={index}>{subject.subject}</option>
                            
                        ))}
                    </select>

                <h2>Year</h2>
                <div className="toggle">
                    <input type="radio" name="year" value="1" id="one" onChange={handleChange} checked={problemData.year === "1"} required/>
                    <label htmlFor="one">1</label>
                    <input type="radio" name="year" value="2" id="two" onChange={handleChange} checked={problemData.year=== "2"}/>
                    <label htmlFor="two">2</label>
                    <input type="radio" name="year" value="3" id="three" onChange={handleChange} checked={problemData.year === "3"}/>
                    <label htmlFor="three">3</label>
                    <input type="radio" name="year" value="4" id="four" onChange={handleChange} checked={problemData.year === "4"}/>
                    <label htmlFor="four">4</label>
                </div>
                <h2>Title</h2>
                <input
                    className="problemTitleInput"
                    placeholder="Problem Title"
                    name="title"
                    onChange={handleChange}
                    type="text"
                    value={problemData.title}
                    required
                />
                <h2>Problem Content</h2>
                <textarea
                required
                className="problemTxtArea"
                onChange={handleChange}
                value={problemData.content}
                name="content"/>

                <label  className="fileAttach" htmlFor="myfile">(Optional) Attach a lecture:</label>
                <input className="fileAttach" type="file" id="myfile" name="myfile"/>

                <button type="submit" className="button-19" onClick={handleSubmit}>Create Problem</button>
            </form>
        </div>
    )
}