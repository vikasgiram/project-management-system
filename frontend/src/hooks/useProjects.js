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

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");
  }
};

const getMyProjects = async () => {
  try {
    const response = await axios.get(`${url}/my`);
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
    toast.error("Internal Server Error");
  }
};

const updateProject = async (updatedProjectData) => {
  try {
    const response = await axios.put(`${url}/${updatedProjectData._id}`, updatedProjectData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Project Updated Successfully...");

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");

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
    toast.error("Internal Server Error");
  }
};

const getProject = async (Id) => {
  try {
    const response = await axios.get(`${url}/${Id}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");
  }
};

export { getProjects,  createProject, updateProject, deleteProject,getProject, getMyProjects };
