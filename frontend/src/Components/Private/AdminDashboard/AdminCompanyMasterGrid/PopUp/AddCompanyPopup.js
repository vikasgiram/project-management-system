
import { useState } from "react";
import toast from "react-hot-toast";
import { createCompany } from "../../../../../hooks/useCompany";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";



const AddCompanyPopup = ({ handleAdd }) => {

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [subDate, setSubDate] = useState("");
  const [subAmount, setSubAmount] = useState("");
  const [logo, setLogo] = useState("");
  const [GST, setGST] = useState("");
  const [Address, setAddress] = useState({
    pincode: "",
    state: "",
    city: "",
    country: "",
    add: ""
  });


  const handleCompanyAdd = async (event) => {
    event.preventDefault();
    const data = {
      name,
      admin,
      mobileNo,
      email,
      password,
      confirmPassword,
      subDate,
      subAmount,
      GST,
      Address,

    };
    if (!name || !mobileNo || !email || !password || !confirmPassword || !subDate || !subAmount || !admin) {
      return toast.error("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return toast.error("Password desen't match");
    }
    await createCompany(data);
    // console.log(data);
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
            <form>
              <div className="modal-header pt-0">
                <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                  Add Company
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
                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="name"
                        className="form-label label_text"
                      >
                        Company Name <RequiredStar />
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
                        for="name"
                        className="form-label label_text"
                      >
                        Admin Name <RequiredStar />
                      </label>
                      <input
                        type="text"
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value)}
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
                        type="text"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="form-control rounded-0"
                        id="MobileNumber"
                        aria-describedby="emailHelp"
                        required
                      />
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

                  <div className="col-12 col-lg-6 mt-2" >
                    <div className="mb-3">
                      <label htmlFor="Subscription" className="form-label label_text">Subscription End Date  <RequiredStar />
                      </label>
                      <input
                        onChange={(e) => setSubDate(e.target.value)}
                        value={subDate}
                        type="date"
                        className="form-control rounded-0"
                        id="Subscription"
                        aria-describedby="dateHelp"
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="col-12 col-lg-6 mt-2" >
                    <div className="mb-3">
                      <label htmlFor="ProjectEndDate" className="form-label label_text">Project End Date
                      </label>
                      <input
                        // onChange={(e) => setEndDate(e.target.value)}
                        // value={endDate}
                        type="date"
                        className="form-control rounded-0"
                        id="ProjectEndDate"
                        aria-describedby="dateHelp"
                      />
                    </div>
                </div> */}

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="SubscriptionAmount"
                        className="form-label label_text"
                      >
                        Subscription Amount <RequiredStar />
                      </label>
                      <div className="input-group border mb-3">
                        <span
                          className="input-group-text rounded-0 bg-white border-0"
                          id="basic-addon1"
                        >
                          <span>&#8377;</span>
                        </span>
                        <input
                          type="text"
                          id="SubscriptionAmount"
                          value={subAmount}
                          onChange={(e) => setSubAmount(e.target.value)}
                          className="form-control rounded-0 border-0"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          required
                        />
                      </div>{" "}
                    </div>
                  </div>



                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="gstNo"
                        className="form-label label_text"
                      >
                        GST No <RequiredStar />
                      </label>
                      <div className="input-group border mb-3">

                        <input
                          type="text"
                          id="gstNo"
                          value={GST}
                          onChange={(e) => setGST(e.target.value)}
                          className="form-control rounded-0 border-0"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          required
                        />
                      </div>{" "}
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2" >

                    <div className="mb-3">
                      <label for="LOGO" className="form-label label_text">     Logo

                      </label>
                      <input type="file" className="form-control rounded-0" id="LOGO" aria-describedby="secemailHelp"

                        onChange={(e) => setLogo(e.target.files[0])} files={logo}
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
                            onChange={(e) =>
                              setAddress({
                                ...Address,
                                pincode: e.target.value,
                              })
                            }
                            value={Address.pincode}
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
                            onChange={(e) => setAddress({ ...Address, state: e.target.value })}
                            value={Address.state}
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
                            onChange={(e) => setAddress({ ...Address, city: e.target.value })}
                            value={Address.city}
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
                            onChange={(e) => setAddress({ ...Address, country: e.target.value })}
                            value={Address.country}
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
                            onChange={(e) => setAddress({ ...Address, add: e.target.value })}
                            value={Address.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6 mt-3">
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
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-3">
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type="submit"
                        onClick={handleCompanyAdd}
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

export default AddCompanyPopup;
