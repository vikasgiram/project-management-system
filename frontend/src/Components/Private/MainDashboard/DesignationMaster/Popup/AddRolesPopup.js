import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from 'react-select'; // Import Select from react-select
import { getDepartment } from "../../../../../hooks/useDepartment";
import toast from "react-hot-toast";
import { createDesignation } from "../../../../../hooks/useDesignation";

const AddRolesPopup = ({ handleAdd }) => {
  const { t } = useTranslation();

  const [getDepartments, setGetDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");

  // Fetch departments
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartment();
      if (data) {
        setGetDepartments(data.department || []);
      }
    };
    fetchData();
  }, []);

  // Handle role addition
  const handleEmployeeAdd = async () => {
    const data = {
      name,
      department,
      permissions: permissions.map(permission => permission.value), // map permission objects to values
    };

    if (!name || !department || permissions.length === 0) {
      return toast.error("Please fill all fields");
    }
    // console.log(data);
    await createDesignation(data);
    handleAdd();
  };

  const myPermisssion = [
    { value: "createCustomer", label: 'Create Customer' },
    { value: "updateCustomer", label: 'Update Customer' },
    { value: "deleteCustomer", label: 'Delete Customer ' },
    { value: "viewCustomer", label: 'View Customer' },
    { value: "viewTask", label: 'View Task' },
    { value: "createTask", label: 'Create Task' },
    { value: "updateTask", label: 'Update Task' },
    { value: "deleteTask", label: 'Delete Task' },
    { value: "createProject", label: 'Create Project' },
    { value: "updateProject", label: 'Update Project ' },
    { value: "deleteProject", label: 'Delete Project' },
    { value: "viewProject", label: 'View Project' },
    { value: "createEmployee", label: 'Create Employee' },
    { value: "updateEmployee", label: 'Update Employee' },
    { value: "viewEmployee", label: 'View Employee' },
    { value: "deleteEmployee", label: 'Delete Employee' }
  ];


  return (
    <>
      <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Create New Role
              </h5>
              <button
                onClick={() => handleAdd()}
                type="button"
                className="close px-3"
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div className="row modal_body_height">
                {/* Role Name */}
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label label_text">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control rounded-0"
                      id="name"
                      required
                      aria-describedby="roleNameHelp"
                    />
                  </div>
                </div>

                {/* Department Selection */}
                <div className="col-12 col-lg-6 my-3">
                  <div className="mb-3">
                    <label htmlFor="Department" className="form-label label_text">
                      Department
                    </label>
                    <select
                      className="form-select rounded-0"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {getDepartments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permissions Multi-Select */}
                {/* <div className="col-12 col-lg-6 mt-2">
                  <label htmlFor="permissions" className="form-label label_text">
                    Permissions
                  </label>
                  <Select
                    isMulti // Enable multiple selection
                    options={myPermisssion} // Pass the options array
                    value={permissions} // The current selected permissions
                    onChange={(selected) => setPermissions(selected)} // Update state when selections change
                    placeholder="Select permissions"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    closeMenuOnSelect={false}
                  />
                </div> */}

                <div class="col-10 col-lg-12">

                <label htmlFor="permissions" className="form-label label_text">
                    Permissions
                  </label>

                  <div className="table-responsive">
                    <table className="table table-striped table-class" id="table-id">

                      <tr className="th_border" >
                        <th >Form Level Details</th>
                        <th >Add</th>
                        <th >View</th>
                        <th>Update</th>
                        <th >Delete</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td>Employee Table</td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td> <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>Customer</td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td> <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Project</td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td> <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Task</td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td> <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>Project</td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td> <td>
                            <div>
                              <label class="toggler-wrapper style-22">
                                <input type="checkbox" />
                                <div class="toggler-slider">
                                  <div class="toggler-knob"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


                <div className="col-12 pt-3 mt-2">
                  <button
                    type="button"
                    onClick={handleEmployeeAdd}
                    className="w-80 btn addbtn rounded-0 add_button m-2 px-4"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-80 btn addbtn rounded-0 Cancel_button m-2 px-4"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRolesPopup;
