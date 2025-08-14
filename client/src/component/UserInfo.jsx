import React from 'react'
import { useAuthContext } from "../context/auth.context";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const UserInfo = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    console.log("USER: ", user);

    const handleLogOut = (e) => {
      e.preventDefault();
      logout();
      navigate("/login");
    };

  return (
    <>
      {!user ? (
        <div className="navbar-end">
          <Link to={"/register"} className="btn btn-outline btn-primary mx-2">
            Register
          </Link>
          <Link to={"/login"} className="btn btn-outline btn-accent mx-2">
            Login
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <button
            onClick={(e) => handleLogOut(e)}
            className="btn btn-outline btn-primary mx-2"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default UserInfo