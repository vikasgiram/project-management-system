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

  export { getEmployees };