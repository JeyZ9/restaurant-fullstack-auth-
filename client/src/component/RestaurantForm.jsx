import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';

const RestaurantForm = (props) => {
  const { setPopup, addRestaurant } = props;

  const [ restaurant, setRestaurant ] = useState({
    title: "",
    type: "",
    img: ""
  });

  const { id } = useParams();

  console.log(typeof(id));

    const updateRestaurant = async (id, data) => {
      const response = await axios.put(
        `http://localhost:8080/restaurants/${id}`,
        data
      );
      return response.data;
    };

  useEffect(() => {
      const getById = async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:8080/restaurants/${id}`
          );
          setRestaurant(response.data);
        } catch (error) {
          console.error("Error ", error);
        }
      };
      getById(id);
  }, [id])

  const hanbleOnClick = () => {
    if(id !== undefined) {
      updateRestaurant(id, restaurant);
    }else{
      addRestaurant(restaurant);
    }
  }

  const hanblechange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
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
          onChange={hanblechange}
          required
        />

        <label className="label">Type</label>
        <input
          type="text"
          value={restaurant.type}
          name="type"
          className="input"
          placeholder="restaurant type"
          onChange={hanblechange}
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
          onChange={hanblechange}
          required
        />

        <div className="grid grid-cols-2 gap-2 justify-between mt-4">
          <button
            className="btn btn-error btn-outline w-full"
            onClick={() => setPopup(false)}
          >
            cancel
          </button>
          <Link
            to={`/`}
            onClick={hanbleOnClick}
            type="submit"
            className="btn btn-accent w-full text-white"
          >
            {id ? "Update" : "Add"}
          </Link>
        </div>
      </fieldset>
    </>
  );
}

export default RestaurantForm