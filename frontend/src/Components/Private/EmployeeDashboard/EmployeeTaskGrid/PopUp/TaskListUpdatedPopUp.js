import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateTask } from "../../../../../hooks/useTaskSheet";

const TaskListUpdatedPopUp = ({ handleUpdateTask, selectedTask }) => {

    // const [action, setAction] = useState("");
    // const [startTime, setStartTime] = useState("");
    // const [ endTime, setEndTime] = useState("");
    const [taskLevel, setTaskLevel] = useState("");
    const [taskStatus, setTaskStatus] = useState("inprocess");
    const [remark, setRemark] = useState("");
    const [Actions, setActions] = useState({
        action: "",
        startTime: "",
        endTime: "",
    });

    
    
    
    
    const handelTaskUpdate = async (event) => {
        event.preventDefault();
        const data= {
            Actions,
            taskLevel,
            taskStatus,
            remark,
            };
           if (!Actions.action|| !Actions.startTime || !Actions.endTime || !taskLevel || !taskStatus || !remark) {
            return toast.error("Please fill all fields");
        }   
        try {
            await updateTask(selectedTask._id, data);
            console.log(data);
            
            handleUpdateTask();
        } catch (error) {
            toast.error(error);
        }
    };


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
                <div className="modal-dialog modal-xl">
                    <div className="modal-content p-3">
                        <form
                        // onSubmit={handleEmpUpdate}
                        >
                            <div className="modal-header pt-0">
                                <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                                    {selectedTask.taskName.name}
                                </h5>
                                <button
                                    onClick={() => handleUpdateTask()}
                                    type="button"
                                    className="close px-3"
                                    style={{ marginLeft: "auto" }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row modal_body_height">

                                    <div className="col-12 col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="Action" className="form-label label_text">
                                                Action
                                            </label>
                                            <textarea
                                                className="textarea_edit col-12"
                                                id="Action"
                                                name="Action"
                                                placeholder="Details ..."
                                                rows="2"
                                                onChange={(e) => setActions({ ...Actions, action: e.target.value })}
                                                value={Actions.action}
                                            ></textarea>
                                        </div>
                                    </div>



                                    <div className="col-12 col-lg-3 mt-2">
                                        <div className="mb-3">
                                            <label htmlFor="processStartDate" className="form-label label_text">
                                                Process Start Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                name="processStartDate"
                                                onChange={(e) => setActions({ ...Actions, startTime: e.target.value })}
                                                value={Actions.startTime}
                                                className="form-control rounded-0"
                                                id="processStartDate"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-3 mt-2">
                                        <div className="mb-3">
                                            <label htmlFor="processEndDate" className="form-label label_text">
                                                Proccess End Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                name="processEndDate"
                                                onChange={(e) => setActions({ ...Actions, endTime: e.target.value })}
                                                value={Actions.endTime}
                                                className="form-control rounded-0"
                                                id="processEndDate"
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-12 col-lg-6 mt-2 pt-lg-4">
                                        <span className="px-4 ">
                                            <input type="radio" className="me-2 cursor-pointer" id="Inproccess" name="fav_language" value="Inproccess" />
                                            <label for="Inproccess">Inproccess</label>
                                        </span>

                                        <br className="d-lg-none" />

                                        <span className="px-4 ">
                                            <input type="radio" className="me-2 cursor-pointer" id="Finish" name="fav_language" value="Finish" />
                                            <label for="Finish">Finish</label>
                                        </span>

                                        <br className="d-lg-none" />

                                        <span className="px-4 ">
                                            <input type="radio" className="me-2 cursor-pointer" id="Stuck" name="fav_language" value="Stuck" />
                                            <label for="Stuck">Stuck</label>
                                        </span>

                                    </div> */}

                                    <div className="col-12 col-lg-3 mt-2">
                                        <label htmlFor="projectStatus" className="form-label label_text">Status</label>
                                        <select id="projectStatus" name="projectStatus" className="form-select"
                                            onChange={(e) => setTaskStatus(e.target.value)}
                                            value={taskStatus}
                                        >
                                            <option value="inprocess">Inproccess</option>
                                            <option value="finished">Finish</option>
                                            <option value="stuck">Stuck</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-lg-3 mt-2">
                                        <div className="">
                                            <label htmlFor="processEndDate" className="form-label label_text">
                                                Complete Level
                                            </label>
                                            <div className="input-group border mb-3">
                                                <input
                                                    type="text"
                                                    name="hourlyRate"
                                                    onChange={(e) => setTaskLevel(e.target.value)}
                                                    value={taskLevel}
                                                    className="form-control rounded-0 border-0"
                                                    id="HourlyRate"
                                                    placeholder="eg. 65 %"
                                                    aria-label="Hourly Rate"
                                                />

                                                <span
                                                    className="input-group-text rounded-0 bg-white border-0"
                                                    id="basic-addon1" >
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-12 col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label label_text">
                                                Remark
                                            </label>
                                            <textarea
                                                className="textarea_edit col-12"
                                                id=""
                                                name=""
                                                placeholder="Remark ..."
                                                rows="2"
                                                onChange={(e) => setRemark(e.target.value)}
                                                value={remark}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 pt-3 mt-2">
                                            <button
                                                type="submit"
                                                onClick={handelTaskUpdate}
                                                className="w-80 btn addbtn rounded-0 add_button m-2 px-4"
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleUpdateTask}
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

export default TaskListUpdatedPopUp;
