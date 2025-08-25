import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";

const AdminPage = ({ children }) => {
    const { user } = useAuthContext();
    if(!user){
        return <Navigate to={`/login`} />
    }

    return children;

}

export default AdminPage;