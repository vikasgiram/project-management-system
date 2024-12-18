import { useEffect, useState } from "react";
import { updateEmployee } from "../../../../../hooks/useEmployees";
import toast from "react-hot-toast";
import { getDepartment } from "../../../../../hooks/useDepartment";
import { getDesignation } from "../../../../../hooks/useDesignation";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";

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
      setDesignations([]);
    } else {
      setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    }
  };

  // console.log(employee,"ds");


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
                  {/* <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label label_text">
                        Full Name <RequiredStar />
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={employee.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="name"
                        required
                      />
                    </div>
                  </div> */}

                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        for="clientName"
                        className="form-label label_text"
                      >
                        Client Name <RequiredStar />
                      </label>
                      <input
                        type="text"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className="form-control rounded-0"
                        id="name"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12  mt-2">
                    <div className="row border mt-4 bg-gray mx-auto">
                      <div className="col-12 mb-3">
                        <span className="AddressInfo">Address <RequiredStar /></span>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Pincode"
                            id="exampleInputEmail1"
                            // onChange={(e) =>
                            //   setBillingAddress({
                            //     ...billingAddress,
                            //     pincode: e.target.value,
                            //   })
                            // }
                            // value={billingAddress.pincode}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="State"
                            id="exampleInputEmail1"
                            // onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                            // value={billingAddress.state}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="City"
                            id="exampleInputEmail1"
                            // onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                            // value={billingAddress.city}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="Country"
                            id="exampleInputEmail1"
                            // onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                            // value={billingAddress.country}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-12 mt-2">
                        <div className="mb-3">
                          <textarea
                            className="textarea_edit col-12"
                            id=""
                            name=""
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            // onChange={(e) => setBillingAddress({ ...billingAddress, add: e.target.value })}
                            // value={billingAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        for="clientName"
                        className="form-label label_text"
                      >
                        Complaint Details <RequiredStar />
                      </label>
                      <input
                        type="text"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className="form-control rounded-0"
                        id="name"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        for="clientName"
                        className="form-label label_text"
                      >
                        Product <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Product</option>
                        <option value={"Surveillance System"}>Surveillance System</option>
                        <option value={"Access Control System"}>Access Control System</option>
                        <option value={"Turnkey Project"}>Turnkey Project</option>
                        <option value={"Alleviz"}>Alleviz</option>
                        <option value={"CafeLive"}>CafeLive</option>
                        <option value={"WorksJoy"}>WorksJoy</option>
                        <option value={"WorksJoy Blu"}>WorksJoy Blu</option>
                        <option value={"Fire Alarm System"}>Fire Alarm System</option>
                        <option value={"Fire Hydrant System"}>Fire Hydrant System</option>
                        <option value={"IDS"}>IDS</option>
                        <option value={"AI Face Machines"}>AI Face Machines</option>
                        <option value={"Entrance Automation"}>Entrance Automation</option>
                        <option value={"Guard Tour System"}>Guard Tour System</option>
                        <option value={"Home Automation"}>Home Automation</option>
                        <option value={"IP PA and Communication System"}>IP PA and Communication System</option>
                      </select>
                    </div>
                  </div>

                  
                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Contact Person name <RequiredStar />
                      </label>
                      <input
                        type="text"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className="form-control rounded-0"
                        id="name"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Designation"
                        className="form-label label_text"
                      >
                        Contact Person no <RequiredStar />
                      </label>
                      <input
                        type="number"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className="form-control rounded-0"
                        id="name"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Complaint Source <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Source</option>
                        <option value={"Email"}>Email</option>
                        <option value={"Call"}>Call</option>
                        <option value={"WhatsApp"}>WhatsApp</option>
                        <option value={"SMS"}>SMS</option>
                        <option value={"Direct"}>Direct</option>
                      </select>
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
