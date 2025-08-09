const getUser = () => {
    // JSON.parse => แปลง string เป็น json
    return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
};

const getLocalAccessToken = () => {
    const user = getUser();
    // ? คือถ้าไม่มีข้อมูลใน user เราจะ return เป็น null แทน undify
    return user?.token;
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const removeToken = () => {
    localStorage.removeItem("token");
}

// สร้าง object สำหรับ return function
const TokenService = {
    getUser,
    setUser,
    getLocalAccessToken,
    removeUser,
    removeToken
}

export default TokenService;