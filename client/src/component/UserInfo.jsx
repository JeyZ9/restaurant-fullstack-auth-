import { useNavigate, Link } from "react-router-dom";

const UserInfo = (props) => {
  const { logout } = props;
    const navigate = useNavigate();

    const handleLogOut = (e) => {
      e.preventDefault();
      logout();
      navigate("/login");
    };

  return (
    <>
        <div className="navbar-end">
          <button
            onClick={(e) => handleLogOut(e)}
            className="btn btn-outline btn-primary mx-2"
          >
            Logout
          </button>
        </div>
    </>
  );
}

export default UserInfo