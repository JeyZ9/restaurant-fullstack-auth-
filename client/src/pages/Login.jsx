import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthService from '../services/auth.service';

const Login = () => {

  const navigate = useNavigate("/");

    const [isShow, setIsShow] = useState({ 
            password: false, 
        },
    );

    const [ loginUser, setLoginUser ] = useState({
        username: "",
        password: ""
    })

    // const loginUserApi = async (user) => {
    //     const response = await AuthService.login(user);
    //     return response.data
    // }

    const hanblechange = (e) => {
      const { name, value } = e.target;
      setLoginUser({ ...loginUser, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const login = await AuthService.login(loginUser);

        console.log("LOGIN:", login);

        if (login?.token) {
          Swal.fire({
            icon: "success",
            title: "Login successful!",
          });

          localStorage.setItem("token", login.token);

          navigate("/");

          setLoginUser({
            username: "",
            password: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login failed!",
            text: "Invalid username or password",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
        });
      }
    };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="max-w-sm mx-auto" method='POST'>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginUser.username}
            onChange={hanblechange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="ex.Jeyer"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type={`${isShow.password ? "text" : "password"}`}
            id="password"
            name="password"
            value={loginUser.password}
            onChange={hanblechange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
          <button
            type="button"
            onClick={() =>
              setIsShow({
                password: !isShow.password,
                confirmPass: isShow.confirmPass,
              })
            }
          >
            {`${isShow.password ? "O" : "|"}`}
          </button>
        </div>
        <button
          type="submit"
          // to={`/login`}
          onClick={(e) => handleSubmit(e)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login