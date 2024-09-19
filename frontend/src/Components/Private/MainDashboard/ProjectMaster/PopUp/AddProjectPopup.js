import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getCustomers } from "../../../../../hooks/useCustomer";

const AddProjectPopup = ({ handleAdd }) => {

    const [projectName, setProjectName] = useState("");
    const [purchaseOrderDate, setPurchaseOrderDate] = useState("");
    const [purchaseOrderValue, setPurchaseOrderValue] = useState("");
    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
    const [projectStartDate, setProjectStartDate] = useState("");
    const [projectEndDate, setProjectEndDate] = useState("");
    const [advancePayemnt, setAdvancePayment] = useState("");
    const [payAgainstDelivary, setPayAgainstDelivary] = useState("");
    const [payAfterComplition, setPayAfterComplition] = useState("");
    const [remark, setRemark] = useState("");
    const [purchaseOrderCopy, setPurchaseOrderCopy] = useState("");

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
                                            <select className="form-select rounded-0" aria-label="Default select example">
                                                <option value="" selected>-- Select Customer Name --</option>
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
                                        <input type="text" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setProjectName(e.target.value)} value={projectName} aria-describedby="emailHelp" />
                                    </div>

                                </form>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="purchaseOrderDate" className="form-label label_text">Purchase Order Date</label>
                                            <input
                                                onChange={(e) => setPurchaseOrderDate(e.target.value)}
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
                                            <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPurchaseOrderNumber(e.target.value)} value={purchaseOrderNumber} aria-describedby="emailHelp" />
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
                                            <label for="exampleInputEmail1" className="form-label label_text">Category of Project
                                            </label>
                                            <select className="form-select rounded-0" aria-label="Default select example">
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
                                            <label htmlFor="purchaseOrderDate" className="form-label label_text">Project Start Date
                                            </label>
                                            <input
                                                onChange={(e) => setProjectStartDate(e.target.value)}
                                                value={projectStartDate}
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
                                                onChange={(e) => setProjectEndDate(e.target.value)}
                                                value={projectEndDate}
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
                                                    <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setAdvancePayment(e.target.value)} value={advancePayemnt} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label label_text">          Pay Against Delivery

                                                    </label>
                                                    <input type="number" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPayAgainstDelivary(e.target.value)} value={payAgainstDelivary} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label label_text">     Pay After Completion
                                                    </label>
                                                    <input type="email" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setPayAfterComplition(e.target.value)} value={payAfterComplition} aria-describedby="secemailHelp" />
                                                </div>

                                            </form>

                                        </div>





                                    </div>
                                </div>


                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">     Purchase Order Copy

                                            </label>
                                            <input type="file" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="secemailHelp" />
                                        </div>

                                    </form>


                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">     remark
                                            </label>
                                            <input type="email" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setRemark(e.target.value)} value={remark} aria-describedby="secemailHelp" />
                                        </div>

                                    </form>

                                </div>






                                <div className="row">
                                    <div className="col-12 pt-3 mt-2">
                                        <button
                                            type='button'
                                            // onClick={() => confirmBtnCallBack(deleteRecord)}
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