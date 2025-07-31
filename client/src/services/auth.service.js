import api from "./api";
import axios from "axios";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUT_API;

const register = async(username, fullName, email, password) => {
    return await api.post(`${API_URL}/register`, { username, fullName, email, password });
};

const login = async (username, password) => {
    const response = await api.post(`${API_URL}/login`, { username, password });
    // save user data to localstorage
    // check ว่ามี token อยู่ใน response หรือไม่ ถ้าไม่มีให้ return response ออกไป
    if(!response.data.token){
        return response;
    }

    TokenService.setUser(response.data);
};

const logout = () => {
    TokenService.removeUser();
}

const AuthService = {
    register,
    login,
    logout
}

export default AuthService;