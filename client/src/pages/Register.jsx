import { useState } from 'react'
import AuthService from './../services/auth.service';
import Swal from 'sweetalert2';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const Register = () => {

    const navigate = useNavigate();


    const [isShow, setIsShow] = useState({ 
            password: false, 
            confirmPass: false
        },
    );

    const [ regisUser, setRegisUser ] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPass: ""
    })

    const registerUserApi = async (user) => {
        const response = await AuthService.register(user);
        return response.data
    }

    const hanbleChange = (e) => {
      const { name, value } = e.target;
      setRegisUser({ ...regisUser, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (regisUser.confirmPass !== regisUser.password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match.",
        });
        return;
      }

      try {
        await registerUserApi(regisUser);
        Swal.fire({
          icon: "success",
          title: "Registration successful!",
        });
        setRegisUser({
          username: "",
          fullName: "",
          email: "",
          password: "",
          confirmPass: "",
        });
        navigate("/login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: error.response?.data?.message || "An error occurred.",
        });
      }
    };


  return (
    <div className="flex items-center justify-center h-screen relative">
      <Link to={`/`} className="top-4 absolute left-4 flex items-center">
        <IoIosArrowRoundBack className="text-[24px]" />
        back
      </Link>
      <form className="w-sm mx-auto" method="POST">
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
            value={regisUser.username}
            onChange={hanbleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="ex.Jeyer"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={regisUser.fullName}
            onChange={hanbleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="ex.wisarut saelao"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={regisUser.email}
            onChange={hanbleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="ex.example@gmail.com"
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
          <div className="relative">
            <input
              type={`${isShow.password ? "text" : "password"}`}
              id="password"
              name="password"
              value={regisUser.password}
              onChange={hanbleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
            />
            <button
              className="absolute top-1/3 right-2"
              type="button"
              onClick={() =>
                setIsShow({
                  password: !isShow.password,
                  confirmPass: isShow.confirmPass,
                })
              }
            >
              {isShow.password ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirmPass"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              type={`${isShow.confirmPass ? "text" : "password"}`}
              id="confirmPass"
              name="confirmPass"
              value={regisUser.confirmPass}
              onChange={hanbleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
            />
            <button
              className="absolute top-1/3 right-2"
              type="button"
              onClick={() =>
                setIsShow({
                  password: isShow.password,
                  confirmPass: !isShow.confirmPass,
                })
              }
            >
              {isShow.confirmPass ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          // to={`/login`}
          onClick={(e) => handleSubmit(e)}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}

export default Register