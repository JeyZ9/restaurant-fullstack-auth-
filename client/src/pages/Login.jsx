import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router';

const Login = () => {

    const [isShow, setIsShow] = useState({ 
            password: false, 
        },
    );

    const [ loginUser, setLoginUser ] = useState({
        username: "",
        password: ""
    })

    const loginUserApi = async (user) => {
        const response = await axios.post(`http://localhost:5000/api/v1/login`, user);
        return response.data
    }

    const hanblechange = (e) => {
      const { name, value } = e.target;
      setRegisUser({ ...regisUser, [name]: value });
    };

    const handleSubmit = () => {
        // setRegisUser(regisUser);
        const login = loginUserApi(regisUser);
        if(login){
            console.log("login success!");
            setLoginUser({
                username: "",
                password: "",
            });
        }
    }

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
          onClick={() => handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login