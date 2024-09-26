import { useState } from "react";
import {updateEmployee } from "../../../../../hooks/useEmployees";
import toast from "react-hot-toast";




const UpdateEmployeePopUp = ({ handleUpdate, selectedEmp}) => {

  const [employee, setEmployee] = useState(selectedEmp);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };
  //  console.log(employee,"employee")
  
  const handleEmpUpdate = async () => {
    try {
      await updateEmployee(employee);
      handleUpdate();
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
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Update Employee
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
                <div className="col-12">
                  <form>
                    <div className="mb-3">
                      <label
                        for="name"
                        className="form-label label_text"
                      >
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={employee.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="name"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="mobileNo"
                        className="form-label label_text"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="mobileNo"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="email"
                        className="form-label label_text"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="email"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Department
                      </label>
                      <select
                        className="form-select rounded-0"
                        aria-label="Default select example"
                        disabled
                      >
                        <option >{employee.department.name}</option>
                       
                      </select>{" "}
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="Role"
                        className="form-label label_text"
                      >
                        Designation
                      </label>
                      <select
                        className="form-select rounded-0"
                        aria-label="Default select example"
                        disabled
                      >
                        <option>{employee.designation.name}</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="HourlyRate"
                        className="form-label label_text"
                      >
                        Hourly Rate
                      </label>
                      <div className="input-group border mb-3">
                        <span
                          className="input-group-text rounded-0 bg-white border-0"
                          id="basic-addon1"
                        >
                          <i class="fa-solid fa-indian-rupee-sign"></i>
                        </span>
                        <input
                          type="text"
                          name="hourlyRate"
                          value={employee.hourlyRate}
                          onChange={handleChange}
                          className="form-control rounded-0 border-0"
                          id="HourlyRate"
                          placeholder="eg. 10,000"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>{" "}
                    </div>
                  </form>
                </div>

                
                <div className="row">
                  <div className="col-12 pt-3 mt-2">
                    <button
                      type="button"
                      onClick={handleEmpUpdate}
                      // onClick={() => confirmBtnCallBack(deleteRecord)}
                      className="w-80 btn addbtn rounded-0 add_button   m-2 px-4"
                    >
                      Update
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployeePopUp;