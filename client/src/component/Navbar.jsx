import React from "react";
import { Link } from "react-router"

const Navbar = (props) => {
  const { setPopup } = props;
  const menuItems = [
    {
      id: 1,
      name: "Add restaurant",
      url: "/",
    },
    {
      id: 2,
      name: "Search",
      url: "/search",
    },
    {
      id: 3,
      name: "About Us",
      url: "/",
    },
  ];

  const handleOnClick = (id) => {
    if(String(id) === "1") {
      setPopup(true);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item) => (
              <ul key={item.id}>
                <li>
                  <button onClick={() => handleOnClick(item.id)}>
                    {item.name}
                  </button>
                </li>
              </ul>
            ))}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">Grab restaurant</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <ul key={item.id} className="flex gap-2">
              <li>
                <button onClick={() => handleOnClick(item.id)}>
                  {item.name}
                </button>
              </li>
            </ul>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to={'/register'} className="btn btn-outline btn-primary mx-2">Register</Link>
        <Link to={'/login'} className="btn btn-outline btn-accent mx-2">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
