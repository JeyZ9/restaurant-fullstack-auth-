import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";

const AdminPage = ({ children }) => {
    const { user } = useAuthContext();
    console.log("ROLE:", user.authorities)
    if(!user){
        return <Navigate to={`/login`} />
    }

    if(user?.authorities.includes("ROLE_ADMIN")){
        return children;
    }

    return <Navigate to="/notallowed" />
}

export default AdminPage;