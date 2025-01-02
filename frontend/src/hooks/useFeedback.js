import axios from 'axios';
import toast from 'react-hot-toast';

const baseUrl= process.env.REACT_APP_API_URL;
const url=baseUrl+"/api/feedback";

const getFeedback = async () => {
  try {
    const response = await axios.get(`${url}/`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;
    // console.log("api actions",data);
    

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const getRemaningFeedback = async () => {
  try {
    const response = await axios.get(`${url}/remaningFeedbacks`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;
    // console.log("api actions",data);
    

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const createFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${url}`, feedbackData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Thank you for your valueable feedback");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  
  }
};


export { getFeedback, createFeedback, getRemaningFeedback};
