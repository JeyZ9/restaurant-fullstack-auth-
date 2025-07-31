import api from "./api";

const RESTO_API = import.meta.env.VITE_RESTO_API;

// get all restaurant
const getAllRestaurant = async () => {
    const response = await api.get(RESTO_API)
    return response;
}

// get restaurant by id
const getRestaurantById = async (id) => {
    const response = await api.get(`${RESTO_API}/${id}`);
    return response;
}

// create restaurant
const addRestaurant = async (data) => {
    return await api.post(`${RESTO_API}`, data);
}

// update restaurant
const updateRestaurant = async(id, data) => {
    return await api.put(`${RESTO_API}/${id}`, data);
}

// delete restaurant
const deleteRestaurant = async (id) => {
    return await api.delete(`${RESTO_API}/${id}`);
}

const RestaurantService = {
    getAllRestaurant,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
}

export default RestaurantService;