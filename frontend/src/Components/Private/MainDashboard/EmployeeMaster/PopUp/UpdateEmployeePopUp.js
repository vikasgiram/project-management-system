import { useState } from "react";
import {updateEmployee } from "../../../../../hooks/useEmployees";
import toast from "react-hot-toast";
import { useEffect } from "react";

import { getDepartment } from "../../../../../hooks/useDepartment";
import { getRole } from "../../../../../hooks/useRole";

import { getEmployee,updateEmployee } from "../../../../../hooks/useEmployees";
import toast from "react-hot-toast";





const UpdateEmployeePopUp = ({ handleUpdate }) => {
  const { t } = useTranslation();

  const [getDepartments, setGetDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [roles, setRoles] = useState([]);
  

  
  const[name,setName] = useState("");
  const[mobileNo,setMobileNo] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");
  const[hourlyRate,setHourlyRate] = useState();
  const[role,setRole] = useState();

  const[getEmployee,setGetEmployee]=useState("");

  const {id}=useParams();

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartment();
      // console.log(data);
      if (data) {
        setGetDepartments(data.department || []);
        // console.log(employees,"data from useState");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (department) {
      const fetchRoles = async () => {
        // console.log("Fetch role called");
        const data = await getRole(department);
        // console.log(data,"data")
        if (data) {
          setRoles(data.roles || []);
          // console.log(data.roles,"roles");
        }
      };

      fetchRoles();
    }
  }, [department]);


  // useEffect(() => {
  //   const fetchEmployee = async () => {
  //     try {
  //       const data = await getEmployee(id); // Fetch employee by ID
  //       console.log(data, "employee data");
  
  //       if (data && data.employee) {
  //         const employee = data.employee; // Assuming the response has employee data
  //         // Set the fetched data into state
  //         setName(employee.name || "");
  //         setMobileNo(employee.mobileNo || "");
  //         setEmail(employee.email || "");
  //         setHourlyRate(employee.hourlyRate || "");
  //         setRole(employee.role._id || "");  // Make sure this matches your API structure
  //         setDepartment(employee.department._id || ""); // Assuming _id is sent
  //       }
  //     } catch (error) {
  //       console.error("Error fetching employee data:", error);
  //     }
  //   };
  
  //   if (id) { // Only fetch if id exists
  //     fetchEmployee();
  //   }
  // }, [id]);


  
  
  const handleUpdateEmployee = async()=>{
    {
        const updatedEmployee={
            name,
            mobileNo,
            email,
            hourlyRate,
            department,
            role

        }
        try {
          const data = await updateEmployee(id, updatedEmployee);
          console.log(data);
          if (data) {
            toast.success("Employee updated successfully!");
            handleUpdate(); // Close modal
          } else {
            toast.error("Error updating employee.");
          }
        } catch (error) {
          toast.error("Error updating employee.");
          console.error(error);
        }


       
    }
};
// console.log(role+'name')
// console.log(selectedDepartmentId+'select department'); //worked id of department
// console.log(department,'department'); //worked data of departments


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
                        for="exampleInputEmail1"
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
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label label_text"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
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
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
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
                        for="exampleInputEmail1"
                        className="form-label label_text"
                      >
                        Role
                      </label>
                      <select
                        className="form-select rounded-0"
                        aria-label="Default select example"
                        disabled
                      >
                        <option>{employee.role.name}</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
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
                      onClick={handleUpdateEmployee}
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