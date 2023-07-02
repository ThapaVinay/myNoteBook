import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutSite from './components/AboutSite';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Footer from './components/Footer';
import AddNote from './components/AddNote';
import PageNotFound from './components/PageNotFound';

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
              <Route exact path="/myNoteBook" element={<Home showAlert= {showAlert}/>} />
              <Route exact path="myNoteBook/notes" element={<AddNote showAlert = {showAlert} />} />

              <Route exact path="myNoteBook/about" element={<AboutSite />} />
              <Route exact path="/notfound" element={<PageNotFound />} />
              
              <Route exact path="myNoteBook/login" element={<Login showAlert = {showAlert} />} />
              <Route exact path="myNoteBook/signup" element={<Signup showAlert = {showAlert} />} />
            </Routes>

          </div>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
