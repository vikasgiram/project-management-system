import axios from 'axios';
import toast from 'react-hot-toast';

export const loginUser = async (username, password) => {
    try {

    if(username===undefined|| password === undefined){
      return toast.error("Username and password Required");
    }
    const res = await axios.post("api/login", {
      email: username,
      password: password
    });

    if(res.data.error){
      return toast.error(res.data.error);
    }
    toast.success(`Welcome Back, ${res.data.name}`);
    return res.data; 

  } catch (error) {
    console.error(error.response.data);
    toast.error(error.response.data.error);
  }
};

export const resetPassword= async (password, newPassword)=>{
  try {
    const res= await axios.post('api/reset',{
      password,
      newPassword
    });
    if(res.data.error){
      return toast.error(res.data.error);
    }
    toast.success("Password Reseted Sucessfully...");
  } catch (error) {
    console.error(error.response.data);
    toast.error(error.response.data.error);
  }
}

export const logout = async ()=>{
  try {
    const res= await axios.get("api/logout");
    if(res.data.error){
      return toast.error("res.data.error");
    }
    toast.success("Logged out .....");
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    toast.error(error.response.data.error);
  }

};