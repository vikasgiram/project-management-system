import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/tasksheet";

const getAllTask = async () => {
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

const getTaskSheet = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
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

const getMyTaskSheet = async (projectId) => {
  try {
    const response = await axios.get(`${url}/my/${projectId}`);
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

const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${url}`, taskData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);
  }
};

const updateTask = async (id, updatedData) => {
  try {
    const response = await axios.put(`${url}/${id}`, updatedData);
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

const deleteTask = async (Id) => {
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

export { getAllTask,  createTask, updateTask, deleteTask, getTaskSheet, getMyTaskSheet };
