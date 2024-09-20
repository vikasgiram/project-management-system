import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/employee";

const getEmployees = async () => {
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
    toast.error(error.response.data.error);
  }
};

const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);
  }
};



const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${url}`, employeeData);
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

const updateEmployee = async (employeeId, updatedEmployeeData) => {
  try {
    const response = await axios.put(`${url}/${employeeId}`, updatedEmployeeData);
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

const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${url}/${employeeId}`);
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
  
export { getEmployees , getEmployee, createEmployee,  updateEmployee, deleteEmployee };
