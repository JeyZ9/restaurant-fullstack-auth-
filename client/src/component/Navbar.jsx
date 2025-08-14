import { Link } from "react-router"
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';
import UserInfo from "./UserInfo"

const Navbar = (props) => {
  const { setPopup } = props;


  // const token = localStorage.getItem("token");

  const menuItems = [
    {
      id: 1,
      name: "Add restaurant",
      url: "/add",
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
                  <Link to={item.url} onClick={() => handleOnClick(item.id)}>
                    {item.name}
                  </Link>
                </li>
              </ul>
            ))}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          Grab restaurant
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <ul key={item.id} className="flex gap-2">
              <li>
                <Link to={item.url} onClick={() => handleOnClick(item.id)}>
                  {item.name}
                </Link>
              </li>
            </ul>
          ))}
        </ul>
      </div>
      <UserInfo />
    </div>
  );
};

export default Navbar;
