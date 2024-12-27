import toast from "react-hot-toast";
import { updateTask } from "../../../../../hooks/useTask";
import { useState } from "react";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";

const UpdateTaskPopUp = ({ handleUpdate, selectedTask }) => {

const[task,setTask]=useState(selectedTask);
 
// console.log(selectedTask._id);
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTask((prevTask)=>({...prevTask,[name]:value}))
  };
  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    if(!task.name){
      toast.error("Task Name is required");
      return
    }
    try {
      await updateTask(task._id,task);
      handleUpdate();
    } catch (error) {
      toast.error(error);
    }
  };
  // console.log(selectedTask);

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#00000090",
        }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <form onSubmit={handleTaskUpdate}>
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Update Employee
              </h5>
              <button
                onClick={() => handleUpdate()}
                type="button"
                className="close px-3"
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row ">
              {/* modal_body_height */}
                <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label label_text">
                        Task Name <RequiredStar />
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={task.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="name"
                      />
                    </div>
                </div>

                <div className="row">
                  <div className="col-12 pt-3 mt-2">
                    <button
                      type="submit"
                      onClick={handleTaskUpdate}
                      className="w-80 btn addbtn rounded-0 add_button m-2 px-4"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="w-80 btn addbtn rounded-0 Cancel_button m-2 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTaskPopUp;
