import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCustomers } from "../../../../../hooks/useCustomer";
import { createProject } from "../../../../../hooks/useProjects";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";
import { getAddress } from "../../../../../hooks/usePincode";

const AddServicePopup = ({ handleAddService }) => {

  const [custId, setCustId] = useState('');
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  const [purchaseOrderDate, setPurchaseOrderDate] = useState("");
  const [purchaseOrderValue, setPurchaseOrderValue] = useState("");
  const [endDate, setEndDate] = useState("");
  const [advancePay, setAdvancePayment] = useState("");
  const [payAgainstDelivery, setPayAgainstDelivery] = useState("");
  const [payAfterCompletion, setPayAfterCompletion] = useState("");
  const [remark, setRemark] = useState("");
  const [category, setCategory] = useState('');
  const [POCopy, setPOCopy] = useState("");
  const [loading, setLoading] = useState(false);


  const [Address, setAddress] = useState({
    pincode: "",
    state: "",
    city: "",
    add: "",
    country: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAddress(Address.pincode);

      if (data !== "Error") {
        console.log(data);
        setAddress(prevAddress => ({
          ...prevAddress, 
          state: data.State, 
          city: data.District,   
          country: data.Country 
        }));
      }
    };
    if(Address.pincode > 0)
      fetchData();
  }, [Address.pincode]);



  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomers();
      // console.log(data);
      if (data) {
        setCustomers(data.customers || []);
        // console.log(employees,"data from useState");
      }
    };

    fetchData();
  }, []);


  const handleServiceAdd = async (event) => {
    event.preventDefault();
  };
  // console.log(Address,"Address in popup");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPOCopy(reader.result);

      };
      reader.readAsDataURL(file);
    }
  };
  // console.log(loading)

  return (
    <>
     
      <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <form onSubmit={handleServiceAdd}>
              <div className="modal-header pt-0">

                <h5 className="card-title fw-bold" id="exampleModalLongTitle">

                  Create New Service
                  {/* Forward */}
                </h5>
             
              </div>
              <div className="modal-body">
                <div className="row modal_body_height">

                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Service Type <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Type</option>
                        <option value={"AMC"}>AMC</option>
                        <option value={"One time"}>One time</option>
                        <option value={"warranty"}>Warranty</option>
                      </select>
                    </div>
                  </div>

                  
                <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Priority <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Priority</option>
                        <option value={"high"}>High</option>
                        <option value={"mid"}>Mid</option>
                        <option value={"low"}>Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label
                        for="Department"
                        className="form-label label_text"
                      >
                        Zone <RequiredStar />
                      </label>
                      <select
                        className="form-select rounded-0"
                        id=""
                        aria-label="Default select example"
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Zone</option>
                        <option value={"South"}>South</option>
                        <option value={"North"}>North</option>
                        <option value={"East"}>East</option>
                        <option value={"West"}>West</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="mb-3">
                      <label htmlFor="purchaseOrderDate" className="form-label label_text">
                      Allotment Date <RequiredStar />
                      </label>
                      <input
                        // onChange={(e) => setPurchaseOrderDate(e.target.value)} // Handles date input change
                        // value={purchaseOrderDate} // Prepopulate value from state
                        type="date"
                        className="form-control rounded-0"
                        id="purchaseOrderDate"
                        aria-describedby="dateHelp"
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
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Employee</option>
                        <option value={"South"}>South</option>
                      
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
                        // onChange={(e) => setGender(e.target.value)}
                        required
                      ><option >Select Workmode</option>
                        <option value={"Online"}>Online</option>
                        <option value={"Offline"}>Offline</option>
                      
                      </select>
                    </div>
                  </div>




                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type="submit"
                        onClick={handleServiceAdd}
                        disabled={loading}
                        
                        className="w-80 btn addbtn rounded-0 add_button m-2 px-4"
                      >
                        {!loading ? "Add" : "Submitting..."}
                      </button>
                      <button
                        type="button"
                        onClick={handleAddService}
                        className="w-80  btn addbtn rounded-0 Cancel_button m-2 px-4" >
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

    </>);
}

export default AddServicePopup;