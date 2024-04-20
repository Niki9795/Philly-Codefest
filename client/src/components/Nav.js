import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout =() => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className="nav-ul">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Our Product</Link></li>
        <li><Link to="/login">Log in</Link></li>
        <li>{auth ? <Link onClick={logout} to="/login">LogOut</Link> : <Link to="/signup">Sign Up</Link>}</li>
      </ul>

      <div>
        <div>
    
        </div>
      </div>
    </div>
  );
};

export default Nav;
