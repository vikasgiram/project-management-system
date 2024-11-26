import axios from 'axios';
import toast from 'react-hot-toast';

const baseUrl= process.env.REACT_APP_API_URL;
const url=baseUrl+"/api/designation";

const getDesignation = async (department) => {
  try {
    const response = await axios.get(`${url}?department=${department}`,{
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

const getAllDesignations = async (department) => {
  try {
    const response = await axios.get(`${url}/allDesignations`,{
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

const createDesignation = async (designationData) => {
  try {
    const response = await axios.post(`${url}`, designationData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("Designations Created");
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const updateDesignation = async (updatedDesignationData) => {
  try {
    const response = await axios.put(`${url}/${updatedDesignationData._id}`, updatedDesignationData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Designation Updated sucessfully...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const deleteDesignation = async (Id) => {
  try {
    const response = await axios.delete(`${url}/${Id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;
    
    return data;
  } catch (error) {
    console.error(error);
    console.log("error is :",error.response.data.error);
    toast.error(error.response.data.error); 
   }
};

  export { getDesignation, createDesignation,deleteDesignation, updateDesignation , getAllDesignations};