import './App.css';
import React from 'react';
import Home from './Home';
import './index.css'
import Login from './Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SignUp from './SignUp';
import SignUpStudent from './SignUpStudent';
import SignUpTutor from './SignUpTutor';
import StudentInterface from './studentInterface';
import TutorInterface from './tutorInterface';
import CreateProblem from './CreateProblem';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="SignUpStudent" element={<SignUpStudent />} />
            <Route path="SignUpTutor" element={<SignUpTutor />} />
            <Route path="studentInterface" element={<StudentInterface />} />
            <Route path="tutorInterface" element={<TutorInterface />} />
            <Route path="CreateProblem" element={<CreateProblem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
