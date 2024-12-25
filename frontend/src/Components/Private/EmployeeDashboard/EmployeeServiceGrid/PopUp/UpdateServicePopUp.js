import { useState, useEffect } from "react";
import { getCustomers } from "../../../../../hooks/useCustomer";
import { updateProject } from "../../../../../hooks/useProjects";
import { formatDateforupdate } from "../../../../../utils/formatDate";

import toast from "react-hot-toast";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";
import { getAddress } from "../../../../../hooks/usePincode";

const UpdateServicePopup = ({ handleUpdate, selectedProject }) => {

// console.log(selectedProject,"selectedProject");


    const [customers, setCustomers] = useState([]);
    const [POCopy, setPOCopy] = useState(null);
    const [loading, setLoading] = useState(false);


    const [projects, setProjects] = useState({
        ...selectedProject,
        purchaseOrderDate: selectedProject?.purchaseOrderDate,
        startDate: selectedProject?.startDate,
        endDate: selectedProject?.endDate

    });


    const [address, setAddress] = useState({
        add: selectedProject?.Address?.add || "",
        city: selectedProject?.Address?.city || "",
        state: selectedProject?.Address?.state || "",
        country: selectedProject?.Address?.country || "",
        pincode: selectedProject?.Address?.pincode || "",
    });


    //   console.log(selectedProject?.Address?.city,"address");
    useEffect(() => {
        const fetchData = async () => {
          const data = await getAddress(address.pincode);
    
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
        if(address.pincode > 0)
          fetchData();
      }, [address.pincode]);


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



    const handleChange = (event) => {
        const { name, value,type,files } = event.target;
        setProjects((prevProjects) => ({ ...prevProjects, [name]: value }));
     
      
        
        if (name === 'custId') {
            setProjects((prevProjects) => ({
                ...prevProjects,
                custId: { _id: value }, // Ensure you're setting an object with _id
            }));
        } else {
            setProjects((prevProjects) => ({
                ...prevProjects,
                [name]: value,
            }));
        }

        if (name === "projectStatus" && value === "completed") {
            setProjects((prevProjects) => ({
                ...prevProjects,
                completeLevel: 100, // Set completion level to 100
            }));
        } else if (name === "projectStatus") {
            setProjects((prevProjects) => ({
                ...prevProjects,
                completeLevel: prevProjects.completeLevel < 100 ? prevProjects.completeLevel : '', // Clear if needed
            }));
        }
    };



    // Function to handle changes in billing address fields
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };


  


    const handleProjectUpdate = async (event) => {
       
        event.preventDefault();
        setLoading(!loading);
       
        const updatedProject = {
            ...projects,
            Address: { 
                ...address 
            },POCopy
        }
       
        try {     
            // console.log(updatedProject,"updatedProject");
            
            await updateProject(updatedProject);
            handleUpdate();
        } catch (error) {
            toast.error(error);
        }
    };
    const viewFile = () => {
        window.open(projects.POCopy);
      };

    //   const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setPOCopy(reader.result);
            
    //       };
    //       reader.readAsDataURL(file);
    //     }
        
    //   };
    //   console.log(POCopy,"POCopy");
      

    //   const formatDate = (date) => date ? format(new Date(date), 'yyyy-MM-dd') : '';

    const formattedPurchaseOrderDate = formatDateforupdate(projects?.purchaseOrderDate);
    const formattedStartDate = formatDateforupdate(projects?.startDate);
    const formattedEndDate = formatDateforupdate(projects?.endDate);

    return (
        <>
            <form onSubmit={handleProjectUpdate}>
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

                                    {/* <div className="col-12" >
                                        <div className="mb-3">
                                            <label htmlFor="CustomerName" className="form-label label_text">Customer Name <RequiredStar /></label>
                                            <select className="form-select rounded-0" aria-label="Default select example"
                                                id="CustomerName"
                                                name="custId"
                                                onChange={handleChange}
                                                value={projects.custId._id || ''}
                                            >

                                                {customers && customers.map((cust) => (
                                                    <option key={cust._id} value={cust._id}>{cust.custName}</option>
                                                ))}
                                            </select>


                                        </div>
                                    </div> */}

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
                                                type='submit'
                                                onClick={handleProjectUpdate}
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