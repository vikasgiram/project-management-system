import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCustomer } from "../../../../../hooks/useCustomer";
import { getAddress } from "../../../../../hooks/usePincode";
import { submitWork } from "../../../../../hooks/useService";

const EmployeeEditMyservicePopUp = ({ selectedService, handleUpdate }) => {
  const [status, setStatus] = useState("");
  const [completionDate, setCompletionDate] = useState();
  const [remarks, setRemarks] = useState("");

  const hasRemarks =
    selectedService &&
    selectedService.remarks &&
    selectedService.remarks.length > 0;

  const handleMyService = async (event) => {
    event.preventDefault();

    if (status === "") {
      return toast.error("Please select status");
    }
    if (status === "Completed" && !completionDate) {
      return toast.error("Please select completion date");
    }
    if (!remarks) {
      return toast.error("Please enter remarks");
    }
    const data = {
      status: status,
      completionDate: completionDate,
      remarks: remarks,
    };

    await submitWork(selectedService._id, data);
    // console.log(selectedService._id,data);
    handleUpdate();
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
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <form onSubmit={handleMyService}>
              <div className="modal-header pt-0">
                <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                  Work Submit
                  {/* Forward */}
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
                <div className="row modal_body_height">
                  
                  <div className="col-12 col-lg-6 mt-2">
                    <div className="">
                      <label for="GSTNumber" className="form-label label_text">
                        Status
                      </label>
                      <select
                        className="form-control rounded-0"
                        id="GSTNumber"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        aria-describedby="statusHelp"
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Inprogress">Inprogress</option>
                      </select>
                    </div>
                  </div>

                  {status === "Completed" && (
                    <div className="col-12 col-lg-6 mt-2">
                      <div className="">
                        <label
                          for="completionDate"
                          className="form-label label_text"
                        >
                          Completion Date
                        </label>
                        <input
                          type="date"
                          className="form-control rounded-0"
                          id="completionDate"
                          onChange={(e) => setCompletionDate(e.target.value)}
                          value={completionDate}
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <div className="">
                      <label for="FullName" className="form-label label_text">
                        Remarks
                      </label>
                      <input
                        type="textarea"
                        className="form-control rounded-0"
                        id="FullName"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        aria-describedby="nameHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type="submit"
                        onClick={handleMyService}
                        className="w-80 btn addbtn rounded-0 add_button   m-2 px-4"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-80  btn addbtn rounded-0 Cancel_button m-2 px-4"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {hasRemarks ? (<>
                    <h6 className="mt-3"> Past Actions</h6>
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Sr. No</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedService.remarks.map((remark, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{remark}</td>{" "}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </>
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      No remarks available.
                    </div>
                  ) }

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeEditMyservicePopUp;
