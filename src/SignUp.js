import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {

    const [conditionalLink, setConditional] = React.useState("/SignUpStudent")
    const [selected, setSelected] = React.useState("yes")

    React.useEffect(() => {
        
        }, [conditionalLink]) //since the second argument is empty, it will only run once

    function radioChange(event){

        setSelected(prevSelected => !prevSelected)

        if(event.target.value === "student") {
            console.log("student")
            setConditional("/SignUpStudent")
        }
        else {
            console.log("Tutor")
            setConditional("/SignUpTutor")
        }
    }



    return (
        <div className="signUpPage">

             <div className="navigationBar">
                {/* <h1 className="websiteNameLogin">Poly Sphere</h1> */}
                <Link to="/" className="ButtonTest">Poly Sphere</Link>
            </div>

            <h2 className="signUpTitle">Choose an account type</h2>
            <div className="borderExperminet">
            <div className="accountType">

                <div className="studentType">
                    <img className="accountImageIcon" src="student.png"/>
                    <h3>Student Account</h3>
                    <input  type="radio" name="rGroup" value="student" id="r1" onChange={radioChange} checked={selected}></input>
                </div>
            
                <div className="teacherType">
                    <img className="accountImageIcon" src="tutor.png"/>
                    <h3>Tutor Account</h3>
                    <input  type="radio" name="rGroup" value="tutor" id="r2" onChange={radioChange}></input>
                </div>

            </div>
            
            <Link to={conditionalLink} className="button-19">NEXT</Link>
            </div>
            <h3>Already have an account?</h3><Link to="/Login" className="loginButton">Login</Link>

        </div>
    )
}