import axios from 'axios';
import toast from 'react-hot-toast';

const baseUrl= process.env.REACT_APP_API_URL;
const url=baseUrl+"/api/admin";

const getAdmin = async () => {
  try {
    const response = await axios.get(`${url}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};



const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${url}`, adminData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("Admin Created");
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);}};

const updateAdmin = async (updatedAdminData) => {
  try {
    const response = await axios.put(`${url}/${updatedAdminData._id}`, updatedAdminData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Admin Updated sucessfully...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);}
};

const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    toast.success("Admin Deleted sucessfully...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const getAdminDashboard = async () => {
  try {
    const response = await axios.get(`${url}/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

  
export { getAdmin, createAdmin, updateAdmin, deleteAdmin, getAdminDashboard};
