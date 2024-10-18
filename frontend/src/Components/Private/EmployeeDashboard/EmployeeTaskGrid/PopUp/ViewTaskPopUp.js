
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";




const ViewTaskPopUp = ({ handleViewTask }) => {
    const [department, setDepartment] = useState(null);

    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hourlyRate, setHourlyRate] = useState();




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
                        // onSubmit={handleEmployeeAdd}
                        >
                            <div className="modal-header pt-0">
                                <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                                    Task List
                                    {/* Forward */}
                                </h5>
                                <button
                                    onClick={() => handleViewTask()}
                                    type="button"
                                    className="close px-3"
                                    style={{ marginLeft: "auto" }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row bg-white p-2 m-1 border rounded modal_body_height">
                                    <div className="col-12 py-2">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-class" id="table-id">
                                                <tr className="th_border" >
                                                    <th>Task No.</th>
                                                    <th>Task Details</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Remark</th>
                                                    <th>Action</th>
                                                </tr>
                                                <tbody className="broder my-4">
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Project Details Here</td>
                                                        <td>17-Oct-2024</td>
                                                        <td>24-Dec-2024</td>
                                                        <td>Remark here ............</td>
                                                        <td>
                                                        <span
                                                            // onClick={() => handleUpdate(employee)}
                                                            className="update_icon">
                                                            <i className="fa-solid fa-pen text-success cursor-pointer me-3"></i>
                                                        </span>

                                                        <span
                                                            // onClick={() => handelDeleteClosePopUpClick(employee._id)}
                                                            className="delete">
                                                            <i className="fa-solid fa-trash text-danger cursor-pointer"></i>
                                                        </span>
                                                            </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-12 pt-3 mt-2">
                                            <button
                                                type="submit"
                                                // onClick={handleEmployeeAdd}
                                                className="w-80 btn addbtn rounded-0 add_button   m-2 px-4"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleViewTask}
                                                className="w-80  btn addbtn rounded-0 Cancel_button m-2 px-4"
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

export default ViewTaskPopUp;
