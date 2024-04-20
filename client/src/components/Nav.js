import React from "react";
import {Link} from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-ul">
      
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Our Product</Link></li>
        <li><Link to="/login">Log in</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>

      <div>
        <div>
    
        </div>
      </div>
    </div>
  );
};

export default Nav;
