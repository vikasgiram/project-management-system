import axios from 'axios';

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
    return null;
  }
};

  export { getRole };