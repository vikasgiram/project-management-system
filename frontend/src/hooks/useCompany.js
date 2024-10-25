import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/company";

const getDashboardData = async () => {
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
    toast.error("Internal Server Error");
  }
};

const getCompany = async () => {
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

const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${url}`, companyData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("New Company Created...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};


const updateCompany = async (updatedData) => {
  try {
    const response = await axios.put(`${url}/${updatedData._id}`, updatedData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Company Updated successfully");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
};

const deleteCompany = async (Id) => {
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

export { getDashboardData, createCompany, updateCompany, deleteCompany,getCompany };

