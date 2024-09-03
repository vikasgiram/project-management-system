import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from 'react-select'

const AddEmployeePopup = ({ handleAdd }) => {

    const { t } = useTranslation()

    // const [DDLID, setDDLID] = useState({
    //     DDL: [],
    //     ID: 0,
    //     Label: "Select...",
    // })

    // const options = [
    //     { id: 1, value: 1, label: '1' },
    //     { id: 2, value: 2, label: '2' },
    // ]

    return (
        <>
            <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                        <div className="modal-header pt-0">

                            <h5 className="card-title fw-bold" id="exampleModalLongTitle">

                                Create New Employee
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
                                            <label for="exampleInputEmail1" className="form-label label_text">Full Name</label>
                                            <input type="email" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Mobile Number</label>
                                            <input type="email" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Email</label>
                                            <input type="email" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>

                                    </form>

                                </div>


                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Department</label>
                                            <select className="form-select rounded-0" aria-label="Default select example">
                                                <option selected>Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>                                        </div>

                                    </form>

                                </div>


                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Role</label>
                                            <select className="form-select rounded-0" aria-label="Default select example">
                                                <option selected>Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>

                                    </form>

                                </div>



                                <div className="col-12 col-lg-6 mt-2" >

                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label label_text">Hourly Rate</label>

                                            <div className="input-group border mb-3">
                                                <span className="input-group-text rounded-0 bg-white border-0" id="basic-addon1"><i class="fa-solid fa-indian-rupee-sign"></i></span>
                                                <input type="text" className="form-control rounded-0 border-0" placeholder="eg. 10,000" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>                                        </div>

                                    </form>

                                </div>

                                <div className="row">
                                    <div className="col-12 col-lg-6 mt-2" >

                                        <form>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label label_text">Password</label>
                                                <input type="email" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>


                                    <div className="col-12 col-lg-6 mt-2" >

                                        <form>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label label_text">Confirm Password</label>
                                                <input type="email" className="form-control rounded-0" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>
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

export default AddEmployeePopup;