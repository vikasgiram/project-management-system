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
    toast.error("Internal Server Error");  }
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
    toast.error("Internal Server Error");  }
};

const getMyTaskSheet = async (projectId) => {
  try {
    const response = await axios.get(`${url}/my/${projectId}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
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
    toast.error("Internal Server Error");  }
};

const updateTask = async (id, updatedData) => {
  try {
    const response = await axios.put(`${url}/${id}`, updatedData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }
    toast.success("Task Updated Successfuly");
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Internal Server Error");  }
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
    toast.error("Internal Server Error");  }
};

export { getAllTask,  createTask, updateTask, deleteTask, getTaskSheet, getMyTaskSheet };
