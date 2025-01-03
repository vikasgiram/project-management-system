import { useState,useEffect } from "react";
import { getDepartment } from "../../../../../hooks/useDepartment";
import { createEmployee } from "../../../../../hooks/useEmployees";
import toast from "react-hot-toast";
import { getDesignation } from "../../../../../hooks/useDesignation";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";



const AddEmployeePopup = ({ handleAdd }) => {

  const [getDepartments, setGetDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [designations, setDesignations] = useState([]);

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hourlyRate, setHourlyRate] = useState();
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');


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
      const fetchDesignations = async () => {

        const data = await getDesignation(department);

        if (data) {
          setDesignations(data.designations || []);

        }
      };

      fetchDesignations();
    }
  }, [department]);

  const handleEmployeeAdd = async (event) => {
    event.preventDefault();
    const data = {
      name,
      mobileNo,
      email,
      hourlyRate,
      password,
      confirmPassword,
      department,
      designation,
      gender
    };
    if (!name || !mobileNo || !email || !hourlyRate || !password || !confirmPassword || !department || !designation || !gender) {
      return toast.error("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return toast.error("Password desen't match");
    }
    if (/[a-zA-Z]/.test(mobileNo)) {
      return toast.error("Phone number should not contain alphabets");
    }
    if (/[^0-9]/.test(mobileNo)) {
      return toast.error("Phone number should not contain special characters");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return toast.error("Enter valid Email");
    }
    if(hourlyRate <= 0){
      return toast.error("Hourly rate should be greater than 0");
    }
    await createEmployee(data);
    handleAdd();
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
            <form onSubmit={handleEmployeeAdd}>
              <div className="modal-header pt-0">
                <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                  Create New Employee
                  {/* Forward */}
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
                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        for="name"
                        className="form-label label_text"
                      >
                        Full Name <RequiredStar />
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        for="MobileNumber"
                        className="form-label label_text"
                      >
                        Mobile Number <RequiredStar />
                      </label>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="form-control rounded-0"
                        id="MobileNumber"
                        aria-describedby="emailHelp"
                        maxlength="10"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Gender"
                        className="form-label label_text"
                      >
                        Gender <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="Department"
                        aria-label="Default select example"
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>

                      </select>
                    </div>
                  </div>


                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Email"
                        className="form-label label_text"
                      >
                        Email <RequiredStar />
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control rounded-0"
                        id="Email"
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
                        Department <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="Department"
                        aria-label="Default select example"
                        onChange={(e) => setDepartment(e.target.value)}
                        required
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
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Designation"
                        className="form-label label_text"
                      >
                        Designation <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        aria-label="Default select example"
                        id="Designation"
                        onChange={(e) => setDesignation(e.target.value)} //S
                        required
                      >
                        <option>Select Role</option>
                        {designations &&
                          designations.map((designation) => (
                            <option value={designation._id}>{designation.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="HourlyRate"
                        className="form-label label_text"
                      >
                        Hourly Rate <RequiredStar />
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
                          id="HourlyRate"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          className="form-control rounded-0 border-0"
                          placeholder="eg. 10,000"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          required
                        />
                      </div>{" "}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6 mt-2">
                      <div className="mb-3">
                        <label
                          for="password"
                          className="form-label label_text"
                        >
                          Password <RequiredStar />
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control rounded-0"
                          id="password"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <div className="mb-3">
                        <label
                          for="ConfirmPassword"
                          className="form-label label_text"
                        >
                          Confirm Password <RequiredStar />
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-control rounded-0"
                          id="ConfirmPassword"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type="submit"
                        onClick={handleEmployeeAdd}
                        className="w-80 btn addbtn rounded-0 add_button   m-2 px-4"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={handleAdd}
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

export default AddEmployeePopup;
