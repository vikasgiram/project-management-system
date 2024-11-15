import axios from 'axios';
import toast from 'react-hot-toast';

const url="api/action";

const getAllActions = async (taskId) => {
  try {
    const response = await axios.get(`${url}/${taskId}`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};



const createAction = async (actionData) => {
  try {
    const response = await axios.post(`${url}`, actionData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return toast.error(data.error);
    }
    toast.success("Action submitted..");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const updateAction = async (id, updatedData) => {
  try {
    const response = await axios.put(`${url}/${id}`, updatedData);
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return alert(data.error);
    }
    toast.success("Action Updated Successfuly");
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error);  }
};

const deleteAction = async (Id) => {
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
    toast.error(error.response.data.error);}
};

export { getAllActions, createAction, updateAction, deleteAction };
