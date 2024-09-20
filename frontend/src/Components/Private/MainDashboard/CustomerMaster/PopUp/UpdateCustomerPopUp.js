import { useState } from "react";



const UpdateCustomerPopUp = ({ handleUpdate }) => {

    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [secMobileNo, setSecMobileNo] = useState("");
    const [secEmail, setSecEmail] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [delPincode,setDelPincode] =useState("");
    const [delState,setDelState] =useState("");
    const [delCity,setDelCity] =useState("");
    const [delAddress,setDelAddress] =useState("");
    const [gstNo,setGstNo] =useState("");

    return (
        <>
            <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                        <div className="modal-header pt-0">

                            <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                                Update Customer
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
                                        <div className="">
                                            <label for="exampleInputEmail1" className="form-label label_text">Full Name</label>
                                            <input type="text" className="form-control rounded-0" id="exampleInputEmail1" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="nameHelp" />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Mobile Number</label>
                                            <input type="number" className="form-control rounded-0" id="exampleInputEmail1" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} aria-describedby="mobileNoHelp" />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >
                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Email</label>
                                            <input type="email" className="form-control rounded-0" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                                        </div>

                                    </form>
                                </div>

                                <div className="col-12  mt-2" >

                                    <div className="row border bg-gray mx-auto">
                                        <div className="col-10 mb-3">
                                            <span className="SecondaryInfo">
                                                Secondary Info
                                            </span>
                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label label_text">Mobile Number</label>
                                                    <input type="email" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setSecMobileNo(e.target.value)} value={secMobileNo} aria-describedby="mobileNoHelp" />
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label label_text">Email</label>
                                                    <input type="email" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setSecEmail(e.target.value)} value={secEmail} aria-describedby="secemailHelp" />
                                                </div>

                                            </form>

                                        </div>

                                    </div>
                                </div>

                                <div className="col-12  mt-2" >
                                    <div className="row border mt-4 bg-gray mx-auto">
                                        <div className="col-12 mb-3">
                                            <span className="AddressInfo">
                                                Address
                                            </span>
                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <input type="text" className="form-control rounded-0" placeholder="Pincode" id="exampleInputEmail1" onChange={(e) => setPincode(e.target.value)} value={pincode} aria-describedby="emailHelp" />
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >
                                            <form>
                                                <div className="mb-3">
                                                    <input type="text" className="form-control rounded-0" placeholder="State" id="exampleInputEmail1" onChange={(e) => setState(e.target.value)} value={state} aria-describedby="emailHelp" />
                                                </div>

                                            </form>
                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >
                                            <form>
                                                <div className="mb-3">
                                                    <input type="text" className="form-control rounded-0" placeholder="City" id="exampleInputEmail1" onChange={(e) => setCity(e.target.value)} value={city} aria-describedby="emailHelp" />
                                                </div>

                                            </form>
                                        </div>

                                        <div className="col-12 col-lg-12 mt-2" >
                                            <form>
                                                <div className="mb-3">
                                                    <textarea className="textarea_edit col-12" id="" name="" placeholder="House NO., Building Name, Road Name, Area, Colony" onChange={(e) => setAddress(e.target.value)} value={address} rows="2" >
                                                    </textarea>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12  mt-2" >
                                    <div className="row border mt-4 bg-gray mx-auto">
                                        <div className="col-12 mb-4">
                                            <div className="row">
                                                <div className="col-12 col-lg-4">
                                                    <span className="AddressInfo">
                                                        Delivery Address
                                                    </span>
                                                </div>

                                                <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                                                    <span className=" ms-lg-4 AddressInfo">
                                                        <input type="checkbox" className="me-3 bg-white" id="" name="" value="" />
                                                        Same as above
                                                    </span>
                                                </div>

                                            </div>



                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <input type="number" className="form-control rounded-0" placeholder="Pincode" id="exampleInputEmail1" onChange={(e) => setDelPincode(e.target.value)} value={delPincode} aria-describedby="emailHelp" />
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >

                                            <form>
                                                <div className="mb-3">
                                                    <input type="text" className="form-control rounded-0" placeholder="State" id="exampleInputEmail1" onChange={(e) => setDelState(e.target.value)} value={delState} aria-describedby="emailHelp" />
                                                </div>
                                            </form>
                                        </div>

                                        <div className="col-12 col-lg-6 mt-2" >
                                            <form>
                                                <div className="mb-3">
                                                    <input type="text" className="form-control rounded-0" placeholder="City" id="exampleInputEmail1" onChange={(e) => setDelCity(e.target.value)} value={delCity} aria-describedby="emailHelp" />
                                                </div>

                                            </form>
                                        </div>

                                        <div className="col-12 col-lg-12 mt-2" >
                                            <form>
                                                <div className="mb-3">
                                                    <textarea className="textarea_edit col-12" id="" name="" placeholder="House NO., Building Name, Road Name, Area, Colony" onChange={(e) => setDelAddress(e.target.value)} value={delAddress} rows="2" >
                                                    </textarea>
                                                </div>
                                            </form>
                                        </div>


                                    </div>
                                </div>

                                <div className="col-12 col-lg-6 mt-2" >
                                    <form>
                                        <div className="">
                                            <label for="exampleInputEmail1" className="form-label label_text">GST Number</label>
                                            <input type="email" className="form-control rounded-0" id="exampleInputEmail1" onChange={(e) => setGstNo(e.target.value)} value={gstNo} aria-describedby="emailHelp" />
                                        </div>
                                    </form>

                                </div>


                                <div className="row">
                                    <div className="col-12 pt-3 mt-2">
                                        <button
                                            type='button'
                                            // onClick={() => confirmBtnCallBack(deleteRecord)}
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

export default UpdateCustomerPopUp;