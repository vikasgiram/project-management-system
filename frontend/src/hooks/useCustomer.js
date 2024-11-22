import axios from 'axios';
import toast from 'react-hot-toast';

const baseUrl= process.env.REACT_APP_API_URL;
const url=baseUrl+"/api/customer";

const getCustomers = async () => {
  try {
    const response = await axios.get(`${url}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${url}`, customerData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("New Customer Created...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error); }
};


const updateCustomer = async (updatedData) => {
  try {
    const response = await axios.put(`${url}/${updatedData._id}`, updatedData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Customer Updated successfully");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const deleteCustomer = async (Id) => {
  try {
    const response = await axios.delete(`${url}/${Id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      return toast.error(data.error);
    }

    toast.success("Customer Deleted sucessfully...");
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response.data.error);  }
};

export { getCustomers, createCustomer, updateCustomer, deleteCustomer };