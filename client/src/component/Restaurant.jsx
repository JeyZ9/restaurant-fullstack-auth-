import Card from "./Card";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";

const Restaurant = (props) => {
  const { restaurants, setEdit, setPopup } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();
  // const { role, setRole } = useState(0);

  // useEffect(() => {
  //   switch (user) {
  //     case "ROlE_ADMIN":
  //       setRole(2);
  //       break;
  //     case "ROLE_MODERATOR" :
  //       setRole(1);
  //       break;
  //     default:
  //       setRole(0);
  //     }
  // },[])

  const deleteRestaurant = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      navigate("/");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.delete(
        `http://localhost:5000/api/v1/restaurants/${id}`
      );
      return response.data;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 items-center">
        {restaurants &&
          user &&
          restaurants.map((restaurant) => (
            <Card
              deleteRestaurant={deleteRestaurant}
              key={restaurant.id}
              id={restaurant.id}
              title={restaurant.title}
              img={restaurant.img}
              type={restaurant.type}
              setPopup={setPopup}
              setEdit={setEdit}
            />
          ))}
        {!user && <div>You don't have permission to access this content!</div>}
        {!restaurants && <div>No content!</div>}
      </div>
    </div>
  );
};

export default Restaurant;
