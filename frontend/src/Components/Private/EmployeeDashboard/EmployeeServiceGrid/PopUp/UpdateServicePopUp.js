import { useState, useEffect } from "react";
import { formatDateforupdate } from "../../../../../utils/formatDate";
import { getEmployees } from "../../../../../hooks/useEmployees";
import { updateService } from "../../../../../hooks/useService";
import toast from "react-hot-toast";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";

const UpdateServicePopup = ({ handleUpdate, selectedService }) => {

  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(selectedService);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData.employees || []);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchEmployees();
  }, []);
  // console.log(service.allotTo.name);
  



  const handleChange = (event) => {
    const { name, value } = event.target;

    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleServiceUpdate = async (event) => {

    event.preventDefault();
    setLoading(!loading);
    try {
      await updateService(service._id, service);
      // console.log(service);
      
      handleUpdate();
    } catch (error) {
      toast.error(error);
    }
  };

  // const formattedPurchaseOrderDate = formatDateforupdate(projects?.purchaseOrderDate);
  // const formattedStartDate = formatDateforupdate(projects?.startDate);
  const formattedDate = formatDateforupdate(service?.allotmentDate);

  return (
    <>
      <form onSubmit={handleServiceUpdate}>
        <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>

          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header pt-0">

                <h5 className="card-title fw-bold" id="exampleModalLongTitle">

                  Update Project
                  {/* Forward */}
                </h5>
                <button onClick={() => handleUpdate()} type="button" className="close px-3" style={{ marginLeft: "auto" }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row modal_body_height">

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="serviceType"
                        className="form-label label_text"
                      >
                        Service Type <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="serviceType"
                        name="serviceType"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{service.serviceType}</option>
                        <option value={"AMC"}>AMC</option>
                        <option value={"One Time"}>One time</option>
                        <option value={"Warranty"}>Warranty</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="priority"
                        className="form-label label_text"
                      >
                        Priority <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="priority"
                        name="priority"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{service.priority}</option>
                        <option value={"High"}>High</option>
                        <option value={"Medium"}>Mid</option>
                        <option value={"Low"}>Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="zone"
                        className="form-label label_text"
                      >
                        Zone <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="zone"
                        name="zone"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{service.zone}</option>
                        <option value={"South"}>South</option>
                        <option value={"North"}>North</option>
                        <option value={"East"}>East</option>
                        <option value={"West"}>West</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="allotmentDate" className="form-label label_text">
                        Allotment Date <RequiredStar />
                      </label>
                      <input
                        onChange={handleChange} // Handles date input change
                        value={formattedDate} // Prepopulate value from state
                        type="date"
                        className="form-control rounded-0"
                        id="allotmentDate"
                        name="allotmentDate"
                        aria-describedby="dateHelp"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Allocated to <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{service?.allotTo[0].name}</option>
                        {Array.isArray(employees) &&
                          employees.map((emp) => (
                            <option value={emp._id} key={emp._id}>{emp.name}</option>
                          ))}

                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Workmode <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                      ><option hidden>{service.workMode}</option>
                        <option value={"Onsite"}>Onsite</option>
                        <option value={"Remote"}>Remote</option>

                      </select>
                    </div>
                  </div>





                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type='submit'
                        onClick={handleServiceUpdate}
                        disabled={loading}
                        className="w-80 btn addbtn rounded-0 add_button   m-2 px-4" >
                        {!loading ? "Update" : "Submitting..."}
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-80  btn addbtn rounded-0 Cancel_button m-2 px-4" >
                        Cancel

                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </>);
}

export default UpdateServicePopup;