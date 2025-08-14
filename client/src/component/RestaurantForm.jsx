import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import RestaurantService from '../services/restaurant.service';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RestaurantForm = (props) => {
  const { setPopup, addRestaurant, getRestaurants } = props;

  const [ restaurant, setRestaurant ] = useState({
    title: "",
    type: "",
    img: ""
  });

  const navigate = useNavigate();

  const { id } = useParams();
    const updateRestaurant = async (id, data) => {
      // const response = await axios.put(
      //   `http://localhost:5000/api/v1/restaurants/${id}`,
      //   data
      // );
      // return response.data;
      const response = await RestaurantService.updateRestaurant(id, data);
      return response.data;
    };

  useEffect(() => {
    if(id != undefined){
      const getById = async (id) => {
        try {
          const response = await RestaurantService.getRestaurantById(id);
          setRestaurant(response.data);
        } catch (error) {
          console.error("Error ", error);
        }
      };
      getById(id);
    }
  }, [id])

  const handleOnClick = (action) => {
    try{
      if(action == 1) {
        updateRestaurant(id, restaurant);
        Swal.fire({
          icon: "success",
          title: "Update restaurant successful!",
        });
      }else if(action == 2){
        addRestaurant(restaurant);
        Swal.fire({
          icon: "success",
          title: "Add restaurant successful!",
        });
      }
      getRestaurants();
      setPopup(false);
      setRestaurant({
        title: "",
        type: "",
        img: "",
      });
      navigate("/");
    }catch(err) {
      Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: err.response?.data?.message || "An error occurred.",
        });
    }
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  }

  const handleCancle = (e) => {
    e.preventDefault();
    setPopup(false);
    setRestaurant({
      title: "",
      type: "",
      img: "",
    });
    navigate("/");
  }

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Add Restaurant</legend>

        <label className="label">Title</label>
        <input
          type="text"
          value={restaurant.title}
          name="title"
          className="input"
          placeholder="restaurant title"
          onChange={handlechange}
          required
        />

        <label className="label">Type</label>
        <input
          type="text"
          value={restaurant.type}
          name="type"
          className="input"
          placeholder="restaurant type"
          onChange={handlechange}
          required
        />

        <label className="label">Image url</label>
        {restaurant.img && <img className="" src={restaurant.img} />}
        <input
          type="input"
          value={restaurant.img}
          name="img"
          className="input"
          placeholder="image"
          onChange={handlechange}
          required
        />

        <div className="grid grid-cols-2 gap-2 justify-between mt-4">
          <button
            className="btn btn-error btn-outline w-full"
            onClick={(e) => handleCancle(e)}
          >
            cancel
          </button>
          <button
            // to={`/`}
            type="submit"
            onClick={() => handleOnClick(id ? 1 : 2)}
            className="btn btn-accent w-full text-white"
          >
            {id ? "Update" : "Add"}
          </button>
        </div>
      </fieldset>
    </>
  );
}

export default RestaurantForm