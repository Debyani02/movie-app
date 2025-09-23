import API from "./index";


export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const login = async (email , password) => {
    try {
        const { data } = await API.post("/auth/login",{ email , password });
        if( data.token ){
            localStorage.setItem("token",data.token);

            localStorage.setItem("userData",JSON.stringify(data.data));
        }
        return data;
    }catch ( error ) {
        throw error.response?.data || { message: "Login failed " };
    }
};

export const register = async (userData) => {
    try {
        const { data } =await API.post("/auth/register", userData);

        if( data.token ) {
            localStorage.setItem("token",data.token);

            localStorage.setItem("userData",JSON.stringify(data.data));
        }
        return data;
    }catch (error) {
        throw error.response?.data || { message: "Could not register" };
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
    try {
        const { data } =await API.get("/auth/me")
    }catch (error) {
        throw error.response?.data || {message:"Not authenticated"};
    }
};

export const updateProfile = async (formData) => {
    try{
        const { data } = await API.put("/auth/profile",formData);
        console.log("data......",data.data.avatar);
        if(data && data.data){
            localStorage.setItem("userData", JSON.stringify(data.data));
        }
        return data.data;
    }catch (error) {
        throw error.response?.data || {message: "Profile update failed!"}
    }
}

export const changePassword = async (currentPassword , newPassword) => {
    try{
        const { data } = await API.put("/auth/changepassword",
            {
                currentPassword,
                newPassword,
            }
        );
        return data;
    }catch(error) {
        throw error.response?.data || {message:"Could not update password!"}
    }
};