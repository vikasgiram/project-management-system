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

export { getDashboardData };