import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const[alert,setAlert]=useState(null);
  const setCustomAlert=(message, type)=>
  {
      setAlert({
        msg:message,
        type:type
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar setCustomAlert={setCustomAlert}/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route path="/"  element={<Home setCustomAlert={setCustomAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setCustomAlert={setCustomAlert}/>} />
            <Route path="/signup" element={<Signup setCustomAlert={setCustomAlert}/>} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
