import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Restaurant from '../component/Restaurant';
import RestaurantForm from '../component/RestaurantForm';
import axios from 'axios';
// import axios from 'axios';
// import Card from '../component/Card'

const Home = () => {

  const [restaurants, setRestaurant] = useState([]);
  const [ filRestaurants, setFilRestaurants ] = useState([]);
  const [ popup, setPopup ] = useState(false);

  const addRestaurant = async (data) => {
    const response = await axios.post("http://localhost:8080/restaurants", data);
    return response.data
  }

  useEffect(() => {
    // get all restaurants
    fetch("http://localhost:8080/restaurants").then((res) => {
      return res.json();
    }).then((response) => {
      setRestaurant(response);
      setFilRestaurants(response);
    }).catch((err) => {
      console.log(err.message);
    })

  }, [])

  const handleSearch = (keyword) => {

    if(keyword === ""){
      setFilRestaurants(restaurants);
      return;
    }
    const response = restaurants.filter((restaurant) =>
      restaurant.title.toLowerCase().includes(keyword.toLowerCase())
    );

    setFilRestaurants(response);
  };


  console.log(restaurants);


  return (
    <div className="container mx-auto relative overflow-x-hidden">
      <Navbar setPopup={setPopup} />
      <div>
        {/* Hearder */}
        <div>
          <h1 className="title justify-center text-3xl text-center m-5 p-5 font-semibold">
            Grab Restaurant
          </h1>
        </div>

        {/* Search */}
        <div className="mb-5 flex justify-center items-center">
          <label className="input gap-2 flex items-center w-2xl">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* <button
        className="btn btn-info text-white"
        onClick={() => setPopup(!popup)}
      >
        Add
      </button> */}

      {popup && (
        <div className="fixed w-screen h-screen bg-[#909090]/50 z-1 left-0 top-0 flex justify-center items-center">
          <RestaurantForm setPopup={setPopup} addRestaurant={addRestaurant} />
        </div>
      )}

      {/* Result */}
      <Restaurant restaurants={filRestaurants} setPopup={setPopup} />
    </div>
  );
}

export default Home