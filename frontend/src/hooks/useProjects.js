import axios from 'axios';

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
    return null;
  }
};

const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${url}`, projectData);
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
    return null;
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
    return null;
  }
};

export { getProjects,  createProject, updateProject, deleteProject };
