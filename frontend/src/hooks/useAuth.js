import axios from 'axios';


export const loginUser = async (username, password) => {
    try {
      const res = await axios.post("api/login", {
        email: username,
        password: password
      });
  
      return res.data; 
    } catch (error) {
      throw error;  }
  };