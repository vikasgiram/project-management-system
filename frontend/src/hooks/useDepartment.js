import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/department";

const getDepartment = async () => {
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
    toast.error(error.response.data.error);  }
};

const createDepartment = async (departmentData) => {
  try {
    const response = await axios.post(`${url}`, departmentData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("Department Created");
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const deleteDepartment = async (departmentId) => {
  try {
    const response = await axios.delete(`${url}/${departmentId}`);
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

  export { getDepartment, deleteDepartment,createDepartment };