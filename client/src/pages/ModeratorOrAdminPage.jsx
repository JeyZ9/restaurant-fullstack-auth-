import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";
import { useParams } from "react-router";

const ModeratorPage = ({ children }) => {
    const { id } = useParams();
    console.log(id)
    const { user } = useAuthContext();
    if(!user){
        return <Navigate to={`/login`} />
    }

    if (
      user?.authorities.includes("ROLE_MODERATOR") ||
      user?.authorities.includes("ROLE_ADMIN")
    ) {
      return children;
    }

    return <Navigate to="/notallowed" />
}

export default ModeratorPage;