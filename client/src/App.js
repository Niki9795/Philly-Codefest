import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./AppPages/HomePage"
import SignUp from "./AppPages/SignUpPage";
import PrivateComponent from "./components/privateComponent";

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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;