import { useState } from "react";
import { updateTicket } from "../../../../../hooks/useTicket";
import { getCustomers } from "../../../../../hooks/useCustomer";

import toast from "react-hot-toast";

import { RequiredStar } from "../../../RequiredStar/RequiredStar";

const UpdateEmployeePopUp = ({ handleUpdate, selectedTicket }) => {
  const [ticket, setTicket] = useState(selectedTicket);
  const [customers,setCustomer]=useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]:value,
      client: {
        ...prevTicket.client,
        [name]: value,
      },
      Address:{
        ...prevTicket.Address,
        [name]:value
      }
      
    }));
  }

  // console.log(ticket,"ds");


  const handleEmpUpdate = async (event) => {
    event.preventDefault();
    if(!ticket.details || !ticket.product || !ticket.client || !ticket.contactPerson || !ticket.contactNumber || !ticket.source){
      return toast.error("Please fill all fields");
    }
    if(ticket.contactNumber.length !== 10){
       return toast.error("Please Enter Valid Contact Number");
      }
    if(/[a-zA-Z]/.test(ticket.contactNumber)){
      return toast.error("Phone number should not contain alphabets");
    }
    const phoneRegex = /^\d+$/;

    if (!phoneRegex.test(ticket.contactNumber)) {
        return toast.error("Phone number must only contain digits (0-9).");
    }
    try {
      await updateTicket(ticket._id,ticket);
      handleUpdate();
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchCusetomer=async ()=>{
    const data=await getCustomers();
    setCustomer(data.customers);
  }


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
                  Update ticket
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
                        value={ticket.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="name"
                        required
                      />
                    </div>
                  </div> */}

                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="custName" className="form-label label_text">
                        Client Name <RequiredStar />
                      </label>
                      {/* <input
                        type="text"
                        name="custName"
                        value={ticket.client.custName}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="custName"
                        required
                      /> */}
                      <select
                        className="form-select rounded-0"
                        id="custName"
                        name="custName"
                        aria-label="Default select example"
                        onChange={handleChange}
                        onClick={fetchCusetomer}
                        required
                      ><option hidden>{ticket.client.custName}</option>
                        {customers && customers.map((cust)=>
                          <option value={cust._id}>{cust.custName}</option>
                        )}
                      </select>
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
                            id="pincode"
                            name="pincode"
                            onChange={handleChange}
                            value={ticket.Address.pincode}
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
                            name="state"
                            id="state"
                            onChange={handleChange}
                            value={ticket.Address.state}
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
                            name="city"
                            id="city"
                            onChange={handleChange}
                            value={ticket.Address.city}
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
                            id="country"
                            name="country"
                            onChange={handleChange}
                            value={ticket.Address.country}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-12 mt-2">
                        <div className="mb-3">
                          <textarea
                            className="textarea_edit col-12"
                            id="add"
                            name="add"
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={handleChange}
                            value={ticket.Address.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        for="details"
                        className="form-label label_text"
                      >
                        Complaint Details <RequiredStar />
                      </label>
                      <input
                        type="text"
                        name="details"
                        value={ticket.details}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="details"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        for="product"
                        className="form-label label_text"
                      >
                        Product <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="product"
                        name="product"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{ticket.product}</option>
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
                        for="contactPerson"
                        className="form-label label_text"
                      >
                        Contact Person name <RequiredStar />
                      </label>
                      <input
                        type="text"
                        value={ticket.contactPerson}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="contactPerson"
                        name="contactPerson"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="contactNumber"
                        className="form-label label_text"
                      >
                        Contact Person no <RequiredStar />
                      </label>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={ticket.contactNumber}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="contactNumber"
                        name="contactNumber"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="source"
                        className="form-label label_text"
                      >
                        Complaint Source <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="source"
                        name="source"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{ticket.source}</option>
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
