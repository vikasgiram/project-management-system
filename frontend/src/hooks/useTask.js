import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/task";

const getTask = async () => {
  try {
    const response = await axios.get(`${url}/`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${url}`, taskData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("New Task Created");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const updateTask = async (Id, updatedData) => {
  try {
    const response = await axios.put(`${url}/${Id}`, updatedData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Task Updated Successfuly...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error); }
};

const deleteTask = async (Id) => {
  try {
    const response = await axios.delete(`${url}/${Id}`);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Task Deleted Successfuly...");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error); }
};

export { getTask,  createTask, updateTask, deleteTask };
