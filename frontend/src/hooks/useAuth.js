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
      
      return res.data; 

    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.error);
    }
  };