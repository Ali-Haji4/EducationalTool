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
import AdminInterface from './adminInterface';
import CreateProblem from './CreateProblem';
import StudentList from './StudentList';
import TutorList from './TutorList';
import Profile from './Profile';
import {idContext} from './ID_Context';
import ManageUsers from './manageUsers';
import ManageProblems from './manageProblems';
import StudentProblems from './studentProblems';
import TutorProblems from './tutorProblems';
import StudentSolve from './studentSolve';

function App() {
  const [id, setID] = React.useState();

  return (
    <idContext.Provider value={{id, setID}}>
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
            <Route path="adminInterface" element={<AdminInterface />} />
            <Route path="CreateProblem" element={<CreateProblem />} />
            <Route path="StudentList" element={<StudentList />} />
            <Route path="TutorList" element={<TutorList />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="manageUsers" element={<ManageUsers />} />
            <Route path="manageProblems" element={<ManageProblems />} />
            <Route path="studentProblems" element={<StudentProblems />} />
            <Route path="studentSolve" element={<StudentSolve />} />
            <Route path="tutorProblems" element={<TutorProblems />} />
          </Routes>
        </div>
      </div>
    </Router>
    </idContext.Provider>
  );
}

export default App;
