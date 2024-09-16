import axios from 'axios';

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
    return null;
  }
};

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${url}`, employeeData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
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
    return null;
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
    return null;
  }
};
  
export { getEmployees , createEmployee,  updateEmployee, deleteEmployee };
