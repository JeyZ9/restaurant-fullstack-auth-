import React from "react";
import Card from "./Card";
import axios from "axios";
import Swal from "sweetalert2";

const Restaurant = (props) => {
  const { restaurants, setEdit, setPopup } = props;

  console.log(restaurants);

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
      </div>
    </div>
  );
};

export default Restaurant;
