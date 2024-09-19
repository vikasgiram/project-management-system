import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/role";

const getRole = async (dep) => {
  try {
    const response = await axios.get(`${url}?department=${dep}`);
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

  export { getRole };