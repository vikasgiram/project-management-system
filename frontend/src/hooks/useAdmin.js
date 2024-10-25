import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/admin";

const getAdmin = async () => {
  try {
    const response = await axios.get(`${url}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};



const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${url}`, adminData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("Admin Created");
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};

const updateAdmin = async (updatedAdminData) => {
  try {
    const response = await axios.put(`${url}/${updatedAdminData._id}`, updatedAdminData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Admin Updated sucessfully...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};

const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    toast.success("Admin Deleted sucessfully...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};

const getAdminDashboard = async () => {
  try {
    const response = await axios.get(`${url}/dashboard`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};

  
export { getAdmin, createAdmin, updateAdmin, deleteAdmin, getAdminDashboard};
