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
    toast.error(error.response.data.error);

  }
};

  export { getDepartment };