import { useState, useEffect } from "react";
import { getCustomers } from "../../../../../hooks/useCustomer";
import { updateProject } from "../../../../../hooks/useProjects";
import { formatDateforupdate } from "../../../../../utils/formatDate";

import toast from "react-hot-toast";

const UpdateProjectPopup = ({ handleUpdate, selectedProject }) => {



    const [customers, setCustomers] = useState([]);

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
        const { name, value } = event.target;
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
    };


    // Function to handle changes in billing address fields
    const handleAddressChange = (e) => {
      const { name, value } = e.target;
      setAddress({ ...address, [name]: value });
      
    };
    const handleProjectUpdate = async () => {
        const updatedProject ={
            ...projects,
            Address: { // Ensure the address is nested under "Address"
                ...address // Spread the address state
            }
          }
        try {
            await updateProject(updatedProject);
            handleUpdate();
        } catch (error) {
            toast.error(error);
        }
    };

 

    //   const formatDate = (date) => date ? format(new Date(date), 'yyyy-MM-dd') : '';

      const formattedPurchaseOrderDate = formatDateforupdate(projects?.purchaseOrderDate);
      const formattedStartDate = formatDateforupdate(projects?.startDate);
      const formattedEndDate = formatDateforupdate(projects?.endDate);
   
    return (
        <>
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
                                <div className="col-12" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="CustomerName" className="form-label label_text">Customer Name</label>
                                            <select className="form-select rounded-0" aria-label="Default select example"
                                                id="CustomerName"
                                                name="custId"
                                                onChange={handleChange}
                                                value={projects.custId._id || ''}
                                            >   
                                                {/* {console.log(projects.custId._id,"projects.custId._id")} */}
                                                
                                                {customers && customers.map((cust) => (
                                                    <option key={cust._id} value={cust._id}>{cust.custName}</option>
                                                ))}
                                            </select>
                                          
                                            
                                        </div>
                                    </form>
                                </div>

                                <form>
                                    <div className="mb-3">
                                        <label for="ProjectName" className="form-label label_text">Project Name</label>
                                        <input type="text" className="form-control rounded-0" id="ProjectName" name="name" onChange={handleChange} value={projects.name} aria-describedby="emailHelp" />
                                    </div>

                                </form>

                                <form>
                                    <div className="mb-3">
                                        <label for="ProjectName" className="form-label label_text">Project Status</label>
                                        <select className="form-select rounded-0" aria-label="Default select example"
                                            name="projectStatus"
                                                onChange={handleChange}
                                                value={projects.projectStatus}
                                            >
                                                <option value="upcoming">Upcoming</option>
                                                <option value="inprocess">Inprocess</option>
                                                <option value="finished">Finished</option>
                                               
                                            </select>
                                    </div>

                                </form>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="purchaseOrderDate" 
                                                name="purchaseOrderDate" className="form-label label_text">Purchase Order Date</label>
                                            <input
                                                onChange={handleChange}
                                                value={formattedPurchaseOrderDate}
                                                name="purchaseOrderDate"
                                                type="date"
                                                className="form-control rounded-0"
                                                id="purchaseOrderDate"
                                                aria-describedby="dateHelp"
                                            />
                                            {/* {console.log(projects.purchaseOrderDate,"projects")} */}
                                        </div>
                                    </form>



                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="PurchaseOrderNumber" 
                                            name="purchaseOrderNo"
                                            className="form-label label_text">Purchase Order Number</label>
                                            <input type="number" className="form-control rounded-0" id="PurchaseOrderNumber" 
                                            name="purchaseOrderNo"
                                            value={projects.purchaseOrderNo} onChange={handleChange}  aria-describedby="emailHelp" />
                                        </div>

                                    </form>


                                </div>
                                <div className="col-12 col-lg-6 mt-2" >
                                    <form>
                                        <div className="mb-3">
                                            <label for="PurchaseOrderValu" className="form-label label_text">Purchase Order Value (Rs/USD)
                                            </label>
                                            <input type="number" className="form-control rounded-0" 
                                            name="purchaseOrderValue"
                                            id="PurchaseOrderValu" onChange={handleChange} value={projects.purchaseOrderValue} aria-describedby="emailHelp" />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Category of Project
                                            </label>
                                            <select className="form-select rounded-0" aria-label="Default select example"
                                            name="category"
                                                onChange={handleChange}
                                                value={projects.category}
                                            >
                                                <option selected>-- Select Category Name --</option>
                                                <option value="Surveillance System">Surveillance System</option>
                                                <option value="Access Control System">Access Control System</option>
                                                <option value="Turnkey Project">Turnkey Project</option>
                                                <option value="Alleviz">Alleviz</option>
                                                <option value="CafeLive">CafeLive</option>
                                                <option value="WorksJoy">WorksJoy</option>
                                                <option value="WorksJoy Blu">WorksJoy Blu</option>
                                                <option value="Fire Alarm System">Fire Alarm System</option>
                                                <option value="Fire Hydrant System">Fire Hydrant System</option>
                                                <option value="IDS">IDS</option>
                                                <option value="AI Face Machines">AI Face Machines</option>
                                                <option value="Entrance Automation">Entrance Automation</option>
                                                <option value="Guard Tour System">Guard Tour System</option>
                                                <option value="Home Automation">Home Automation</option>
                                                <option value="IP PA and Communication System">IP PA and Communication System</option>
                                            </select>
                                        </div>

                                    </form>

                                </div>


                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="startDate" className="form-label label_text">Project Start Date
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                name="startDate"
                                                value={formattedStartDate}
                                                type="date"
                                                className="form-control rounded-0"
                                                id="startDate"
                                                aria-describedby="dateHelp"
                                            />
                                          
                                            
                                        </div>
                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="EndDate" className="form-label label_text">Project End Date</label>
                                            <input
                                                
                                                onChange={handleChange}
                                                value={formattedEndDate} // Make sure to handle the case where it might be undefined
                                                type="date"
                                                name="endDate"  // Add the name attribute
                                                className="form-control rounded-0"
                                                id="EndDate"  // Change the id to match the name for clarity
                                                aria-describedby="dateHelp"
                                            />
                                        </div>
                                    </form>

                                </div>



                                <div className="col-12  mt-2" >

                                    <div className="row border bg-gray mx-auto">
                                        <div className="col-10 mb-3">
                                            <span className="SecondaryInfo">
                                                Payment terms:

                                            </span>
                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="advancePay" className="form-label label_text">     Advance Payment
                                                    </label>
                                                    <input type="number" className="form-control rounded-0" id="advancePay" 
                                                    name="advancePay"
                                                    onChange={handleChange} value={projects.advancePay} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="payAgainstDelivery" className="form-label label_text">          Pay Against Delivery

                                                    </label>
                                                    <input type="number" className="form-control rounded-0" id="payAgainstDelivery" 
                                                    name="payAgainstDelivery"
                                                    onChange={handleChange} value={projects.payAgainstDelivery} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="payfterCompletion" className="form-label label_text">     Pay After Completion
                                                    </label>
                                                    <input type="text" className="form-control rounded-0" id="payfterCompletion" 
                                                    name="payfterCompletion"
                                                    onChange={handleChange} value={projects.payfterCompletion} aria-describedby="secemailHelp" />
                                                </div>

                                            </form>

                                        </div>





                                    </div>
                                </div>


                                <div className="col-12  mt-2">
                  <div className="row border mt-4 bg-gray mx-auto">
                    <div className="col-12 mb-3">
                      <span className="AddressInfo">Address</span>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Pincode"
                            id="Pincode"
                            name="pincode"
                            onChange={handleAddressChange}
                            value={address.pincode}
                            aria-describedby="emailHelp"
                          />
                          
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="State"
                            id="State"
                            onChange={handleAddressChange}
                            name="state"
                            value={address.state}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="City"
                            id="city"
                            onChange={handleAddressChange}
                            name="city"
                            value={address.city}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="Country"
                            id="country"
                            name="country"
                            onChange={handleAddressChange}
                            value={address.country}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-12 mt-2">
                      <form>
                        <div className="mb-3">
                          <textarea
                            className="textarea_edit col-12"
                            id="add"
                            name="add"
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={handleAddressChange}
                            value={address.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

               

                




                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="PurchaseOrderCopy" className="form-label label_text">     Purchase Order Copy

                                            </label>
                                            <input type="file" className="form-control rounded-0" id="PurchaseOrderCopy" aria-describedby="secemailHelp" />
                                        </div>

                                    </form>


                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="remark" className="form-label label_text">     remark
                                            </label>
                                            <input type="email" className="form-control rounded-0" id="remark" 
                                            name="remark"
                                            onChange={handleChange} value={projects.remark} aria-describedby="secemailHelp" />
                                        </div>

                                    </form>

                                </div>




                                <div className="row">
                                    <div className="col-12 pt-3 mt-2">
                                        <button
                                            type='button'
                                            onClick={handleProjectUpdate}
                                            className="w-80 btn addbtn rounded-0 add_button   m-2 px-4" >
                                            Update
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

        </>);
}

export default UpdateProjectPopup;