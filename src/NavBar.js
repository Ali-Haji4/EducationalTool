import React from "react";
import { Link } from "react-router-dom";

export function NavBarStudent() {
    return(
        <div>
            <div className="navBarInterface">
             
                <Link to="/" >
                    <button className="navHomeBtn">Poly Sphere</button>
                </Link>

                <nav className="navContainer">
                    <ul className="navLinks">
                        <li><a href="/">Home</a></li>
                        <li><a href="">Problems</a></li>
                        <li><a href="">Feedback</a></li>
                        <li><a href="">Members</a></li>
                        <li><a href="">Logout</a></li>
                    </ul>
                </nav>
                <button className="navProfileBtn">Profile</button>
            </div>
        </div>
    )
}

export function NavBarTutor() {
    return(
        <div>
            <div className="navBarInterface">
             
                <Link to="/" >
                    <button className="navHomeBtn">Poly Sphere</button>
                </Link>

                <nav className="navLinkContainer">
                    <ul className="navLinks">
                        <li><a href="/">Home</a></li>
                        <li><a href="">Problems</a></li>
                        <li><a href="">View Answers</a></li>
                        <li><a href="">Members</a></li>
                        <li><a href="">Logout</a></li>
                    </ul>
                </nav>
                <button className="navProfileBtn">Profile</button>
            </div>
        </div>
    )
}