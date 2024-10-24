import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/customer";

const getCustomers = async () => {
  try {
    const response = await axios.get(`${url}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");
  }
};

const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${url}`, customerData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("New Customer Created...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};


const updateCustomer = async (updatedData) => {
  try {
    const response = await axios.put(`${url}/${updatedData._id}`, updatedData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Customer Updated successfully");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};

const deleteCustomer = async (Id) => {
  try {
    const response = await axios.delete(`${url}/${Id}`);
    const data = response.data;

    if (data.error) {
      return toast.error(data.error);
    }

    toast.success("Customer Deleted sucessfully...");
  } catch (error) {
    console.log(error.response.data);
    toast.error("Internal Server Error");  }
};

export { getCustomers, createCustomer, updateCustomer, deleteCustomer };