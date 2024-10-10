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

export const changePassword = async(oldPass, newPass, confirmPass)=>{
  try {
    if(newPass !== confirmPass){
      return toast.error("New Password and confirm password desen't Match...");
    }
    const res=await axios.post("api/change-password",{oldPass,newPass});
    if(res.data.error){
      console.log(res.data.error);
      return toast.error(res.data.error);
    }
    toast.success(res.data.message);
  } catch (error) {
    console.log(error.response.data.error);
    toast.error(error.response.data.error);
  }
};