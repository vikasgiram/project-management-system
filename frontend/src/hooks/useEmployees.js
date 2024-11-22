import axios from 'axios';
import toast from 'react-hot-toast';

const baseUrl= process.env.REACT_APP_API_URL;
const url=baseUrl+"/api/employee";

const getEmployees = async () => {
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

const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`,{
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



const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${url}`, employeeData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("Employee Created");
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const updateEmployee = async (updatedEmployeeData) => {
  try {
    const response = await axios.put(`${url}/${updatedEmployeeData._id}`, updatedEmployeeData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Employee Updated sucessfully...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${url}/${employeeId}`,{
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

const getEmployeeDashboard = async () => {
  try {
    const response = await axios.get(`${url}/dashboard`,{
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

  
export { getEmployees , getEmployee, createEmployee,  updateEmployee, deleteEmployee,getEmployeeDashboard };
