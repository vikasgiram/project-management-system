import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { getDepartment } from "../../../../../hooks/useDepartment";
import { getRole } from "../../../../../hooks/useRole";

import axios from "axios";
import { useNavigate } from "react-router-dom";


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
        console.log("Fetch role called");
        const data = await getRole(department);
        // console.log(data,"data")
        if (data) {
          setRoles(data.roles || []);
          console.log(data.roles,"roles");
        }
      };

      fetchRoles();
    }
  }, [department]);



  
  const handleEmployeeAdd =()=>{
    {
        const data={
            name,
            mobileNo,
            email,
            hourlyRate,
            password,
            confirmPassword,
            department,
            role

        };
       
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
                        type="text"
                        value={name}
                        onChange={(e)=>(setName(e.target.value))}
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
                        value={mobileNo}
                        onChange={(e)=>(setMobileNo(e.target.value))}
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
                        value={email}
                        onChange={(e)=>(setEmail(e.target.value))}
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
                        onChange={handleDepartmentChange}
                      >
                        <option value="">Select Department</option>
                        {getDepartments &&
                          getDepartments.map((department) => (
                            <option value={department._id}>
                              {department.name}
                            </option>
                          ))}
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
                        onChange={handleRoleChange}   //S
                      >
                        <option>Select Role</option>
                        {roles &&
                          roles.map((role) => (
                            <option value={role._id}>{role.name}</option>
                          ))}
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
                          value={hourlyRate}
                          onChange={(e)=>setHourlyRate(e.target.value)}
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
                      onClick={handleEmployeeAdd}
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