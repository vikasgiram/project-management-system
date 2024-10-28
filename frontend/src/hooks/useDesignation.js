import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/designation";

const getDesignation = async (department) => {
  try {
    const response = await axios.get(`${url}?department=${department}`);
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
    const response = await axios.get(`${url}/allDesignations`);
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
    const response = await axios.post(`${url}`, designationData);
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

const deleteDesignation = async (Id) => {
  try {
    const response = await axios.delete(`${url}/${Id}`);
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

  export { getDesignation, createDesignation,deleteDesignation , getAllDesignations};