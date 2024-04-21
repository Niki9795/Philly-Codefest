import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./AppPages/HomePage"
import SignUp from "./AppPages/SignUpPage";
import PrivateComponent from "./components/privateComponent";
import Settings from './AppPages/Settings'; // Import your Settings component
import Login from "./AppPages/LoginPage";
import Dashboard from "./AppPages/Dashboard";
import Recorder from "./AppPages/Recorder";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/theme.css'; // Import the CSS file

function App() {

  return (
    <div className="App">
      <BrowserRouter >
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<HomePage />}/>
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/recorder" element={<Recorder />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;