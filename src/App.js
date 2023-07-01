import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Footer from './components/Footer';
import Notes from './components/Notes';


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">

            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/notes" element={<Notes showAlert = {showAlert} />} />

              <Route exact path="/about" element={<About />} />
              
              <Route exact path="/login" element={<Login showAlert = {showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert = {showAlert} />} />
            </Routes>

          </div>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
