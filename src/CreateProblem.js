import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { NavBarTutor } from "./NavBar";

export default function CreateProblem(props) {

    const [problemData, setProblemData] = React.useState(
        {degree: "", subject: "", year: "", title: "", tutor: "", content: ""}
        )
    


    function handleChange(event) {
        setProblemData(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value}
        })
        console.log(problemData);
        }

    return (
        <div>
            <NavBarTutor/>
            <h1>Create a Problem</h1>
            <form>
            <h2>Subject</h2>
            <select className="problemSubjectSelect" required>
                <option>
                    Test
                </option>
            </select>
            <h2>Year</h2>
            <div class="toggle">
                <input type="radio" name="year" value="1" id="one" onChange={handleChange} checked={problemData.year === "1"} required/>
                <label for="one">1</label>
                <input type="radio" name="year" value="2" id="two" onChange={handleChange} checked={problemData.year=== "2"}/>
                <label for="two">2</label>
                <input type="radio" name="year" value="3" id="three" onChange={handleChange} checked={problemData.year === "3"}/>
                <label for="three">3</label>
                <input type="radio" name="year" value="4" id="four" onChange={handleChange} checked={problemData.year === "4"}/>
                <label for="four">4</label>
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

            <label  className="fileAttach" for="myfile">(Optional) Attach a lecture:</label>
            <input className="fileAttach" type="file" id="myfile" name="myfile"/>

            <button type="submit" className="button-19">Create Problem</button>
            </form>
        </div>
    )
}