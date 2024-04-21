import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./AppPages/HomePage"
import SignUp from "./AppPages/SignUpPage";
import PrivateComponent from "./components/privateComponent";
import Settings from './AppPages/Settings'; // Import your Settings component
import Login from "./AppPages/LoginPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter >
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path="/" element={<HomePage />}/>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<HomePage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;