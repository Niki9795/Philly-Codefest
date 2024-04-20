import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./AppPages/HomePage"
import SignUp from "./AppPages/SignUpPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter >
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
