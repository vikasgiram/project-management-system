import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCustomers } from "../../../../../hooks/useCustomer";
import { createProject } from "../../../../../hooks/useProjects";

const AddProjectPopup = ({ handleAdd }) => {

    const [custId, setCustId] = useState('');
    const [name, setName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
    const [purchaseOrderDate, setPurchaseOrderDate] = useState("");
    const [purchaseOrderValue, setPurchaseOrderValue] = useState("");
    const [endDate, setEndDate] = useState("");
    const [advancePay, setAdvancePayment] = useState("");
    const [payAgainstDelivery, setPayAgainstDelivery] = useState("");
    const [payfterCompletion, setPayfterCompletion] = useState("");
    const [remark, setRemark] = useState("");
    const [category, setCategory] = useState('');
    const [POCopy, setPOCopy] = useState("");

    

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


    const handleProjectAdd = async () => {
        const data = {
            custId,
            name,
            purchaseOrderDate,
            purchaseOrderNo,
            purchaseOrderValue,
            category,
            startDate,
            endDate,
            advancePay,
            payAgainstDelivery,
            payfterCompletion,
            remark,
            POCopy   // change in backend



        };
        // if(!custId || !name || !email || !hourlyRate || !password || !confirmPassword|| !department || !role){
        //   return toast.error("Please fill all fields");
        // }

        console.log(data, "data");
        await createProject(data);
        handleAdd();
      };

    return (
        <>
            <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                        <div className="modal-header pt-0">

                            <h5 className="card-title fw-bold" id="exampleModalLongTitle">

                                Create New Project
                                {/* Forward */}
                            </h5>
                            <button onClick={() => handleAdd()} type="button" className="close px-3" style={{ marginLeft: "auto" }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row modal_body_height">
                                <div className="col-12" >


                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label label_text">Customer Name</label>
                                            <select className="form-select rounded-0" aria-label="Default select example"
                                                value={custId} // this sets the current selected value
                                                onChange={(e) => {
                                                    
                                                    setCustId(e.target.value);
                                                    // console.log("Selected customer ID:", customerId);
                                                }}
                                            >
                                                <option value="" >-- Select Customer Name --</option>
                                                {customers && customers.map((cust) => (
                                                    <option key={cust._id} value={cust._id}>{cust.custName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </form>

                                </div>

                                <form>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label label_text">Project Name</label>
                                        <input type="text" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setName(e.target.value)} value={name} aria-describedby="emailHelp" />
                                    </div>

                                </form>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="purchaseOrderDate" className="form-label label_text">Purchase Order Date</label>
                                            <input
                                                onChange={(e) =>    setPurchaseOrderDate(e.target.value)}
                                                value={purchaseOrderDate}
                                                type="date"
                                                className="form-control rounded-0"
                                                id="purchaseOrderDate"
                                                aria-describedby="dateHelp"
                                            />
                                        </div>
                                    </form>



                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Purchase Order Number</label>
                                            <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPurchaseOrderNo(e.target.value)} value={purchaseOrderNo} aria-describedby="emailHelp" />
                                        </div>

                                    </form>


                                </div>
                                <div className="col-12 col-lg-6 mt-2" >
                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Purchase Order Value (Rs/USD)
                                            </label>
                                            <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPurchaseOrderValue(e.target.value)} value={purchaseOrderValue} aria-describedby="emailHelp" />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label label_text">Category of Project</label>
                <select
                    className="form-select rounded-0"
                    aria-label="Default select example"
                    value={category} // binding the selected value to state
                    onChange={(e) => {
                       
                        setCategory(e.target.value);
                        
                    }} 
                >
                    <option value="" selected>-- Select Category Name --</option>
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
                                            <label htmlFor="purchaseOrderDate" className="form-label label_text">Project Start Date
                                            </label>
                                            <input
                                                onChange={(e) => setStartDate(e.target.value)}
                                                value={startDate}
                                                type="date"
                                                className="form-control rounded-0"
                                                id="purchaseOrderDate"
                                                aria-describedby="dateHelp"
                                            />
                                        </div>
                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="purchaseOrderDate" className="form-label label_text">Project End Date
                                            </label>
                                            <input
                                                onChange={(e) => setEndDate(e.target.value)}
                                                value={endDate}
                                                type="date"
                                                className="form-control rounded-0"
                                                id="purchaseOrderDate"
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
                                                    <label for="exampleInputEmail1" className="form-label label_text">     Advance Payment
                                                    </label>
                                                    <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setAdvancePayment(e.target.value)} value={advancePay} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label label_text">          Pay Against Delivery

                                                    </label>
                                                    <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPayAgainstDelivery(e.target.value)} value={payAgainstDelivery} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label label_text">     Pay After Completion
                                                    </label>
                                                    <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPayfterCompletion(e.target.value)} value={payfterCompletion} aria-describedby="secemailHelp" />
                                                </div>

                                            </form>

                                        </div>





                                    </div>
                                </div>


                                <div className="col-12 col-lg-6 mt-2" >

                                    <form onSubmit={(e)=>e.preventDefault()}>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">     Purchase Order Copy

                                            </label>
                                            <input type="file" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="secemailHelp"
                                            
                                                onChange={(e)=>setPOCopy(e.target.files[0])} files={POCopy}
                                            />
                                        </div>

                                    </form>


                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">     remark
                                            </label>
                                            <input type="text" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setRemark(e.target.value)} value={remark} aria-describedby="secemailHelp" />
                                        </div>

                                    </form>

                                </div>






                                <div className="row">
                                    <div className="col-12 pt-3 mt-2">
                                        <button
                                            type='button'
                                            onClick={handleProjectAdd}
                                            className="w-80 btn addbtn rounded-0 add_button   m-2 px-4" >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleAdd}
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

export default AddProjectPopup;