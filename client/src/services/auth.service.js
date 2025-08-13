import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUT_API;

const register = async(user) => {
    return await api.post(`${API_URL}/register`, user);
};

const login = async (user) => {
    const response = await api.post(`${API_URL}/login`, user);
    // save user data to localstorage
    // check ว่ามี token อยู่ใน response หรือไม่ ถ้าไม่มีให้ return response ออกไป
    if(!response.data.token){
        return response;
    }

    TokenService.setUser(response.data);
    return response.data;
};

const logout = () => {
    TokenService.removeUser();
    TokenService.removeToken();
}

const AuthService = {
    register,
    login,
    logout
}

export default AuthService;