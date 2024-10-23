import { useEffect, useState } from "react";
import { updateEmployee } from "../../../../../hooks/useEmployees";
import toast from "react-hot-toast";
import { getDepartment } from "../../../../../hooks/useDepartment";
import { getDesignation } from "../../../../../hooks/useDesignation";

const UpdateEmployeePopUp = ({ handleUpdate, selectedEmp }) => {
  const [employee, setEmployee] = useState(selectedEmp);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  // Handle changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    // Check if the department is being changed
    if (name === "department") {
      const selectedDept = departments.find(dept => dept._id === value);
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        department: selectedDept,
        designation: "", // Reset designation when department changes
      }));
    } else {
      setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    }
  };

  const handleEmpUpdate = async (event) => {

    event.preventDefault();
    try {
      await updateEmployee(employee);
      handleUpdate();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getDepartment();
      if (data) {
        setDepartments(data.department || []);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (employee.department) {
      const fetchDesignations = async () => {
        const data = await getDesignation(employee.department._id);
        if (data) {
          setDesignations(data.designations || []);
        }
      };

      fetchDesignations();
    }
  }, [employee.department]);

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
            <form onSubmit={handleEmpUpdate}>
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
              <div className="row modal_body_height">
                <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label label_text">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={employee.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="name"
                      />
                    </div>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label label_text">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="mobileNo"
                      />
                    </div>
                </div>

                <div className="col-12 col-lg-6 mt-2">
  <div className="mb-3">
    <label htmlFor="gender" className="form-label label_text">
      Gender
    </label>
    <select
      name="gender"
      value={employee.gender} // Bind this to the state
      onChange={handleChange} // Update the state on change
      className="form-select rounded-0"
      id="gender"
      aria-label="Default select example"
    >
      {/* <option value="">Select Gender</option> */}
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>
</div>


                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label label_text">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="email"
                      />
                    </div>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="Department" className="form-label label_text">
                        Department
                      </label>
                      <select
                        name="department"
                        className="form-select rounded-0"
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          {employee.department ? employee.department.name : "Select Department"}
                        </option>
                        {departments.map((department) => (
                          <option
                            key={department._id}
                            value={department._id}
                          >
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="Role" className="form-label label_text">
                        Designation
                      </label>
                      <select
                        name="designation"
                        className="form-select rounded-0"
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          {employee.designation ? employee.designation.name : "Select Designation"}
                        </option>
                        {designations.map((designation) => (
                          <option
                            key={designation._id}
                            value={designation._id}
                          >
                            {designation.name}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="HourlyRate" className="form-label label_text">
                        Hourly Rate
                      </label>
                      <div className="input-group border mb-3">
                        <span
                          className="input-group-text rounded-0 bg-white border-0"
                          id="basic-addon1"
                        >
                          <i className="fa-solid fa-indian-rupee-sign"></i>
                        </span>
                        <input
                          type="text"
                          name="hourlyRate"
                          value={employee.hourlyRate}
                          onChange={handleChange}
                          className="form-control rounded-0 border-0"
                          id="HourlyRate"
                          placeholder="eg. 10,000"
                          aria-label="Hourly Rate"
                        />
                      </div>
                    </div>
                </div>

                <div className="row">
                  <div className="col-12 pt-3 mt-2">
                    <button
                      type="submit"
                      onClick={handleEmpUpdate}
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

export default UpdateEmployeePopUp;
