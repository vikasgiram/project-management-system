import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/project";

const getProjects = async () => {
  try {
    const response = await axios.get(`${url}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    console.log("data in the useHook "+data)

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);
  }
};

const createProject = async (projectData) => {
  try {
    console.log("project Data in api",projectData);
    const response = await axios.post(`${url}`, projectData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    toast.success("New Project Created successfully");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);
  }
};

const updateProject = async (Id, updatedData) => {
  try {
    const response = await axios.put(`${url}/${Id}`, updatedData);
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

const deleteProject = async (Id) => {
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

export { getProjects,  createProject, updateProject, deleteProject };
