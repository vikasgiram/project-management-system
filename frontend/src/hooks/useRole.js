import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/role";

const getRole = async (department) => {
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
    toast.error(error.response.data.error);
  }
};

const getAllRole = async (department) => {
  try {
    const response = await axios.get(`${url}/allRoles`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);
  }
};

const createRole = async (roleData) => {
  try {
    const response = await axios.post(`${url}`, roleData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("Employee Created");
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);
  }
};

const deleteRole = async (Id) => {
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
    toast.error(error.response.data.error);
  }
};

  export { getRole, createRole,deleteRole , getAllRole};