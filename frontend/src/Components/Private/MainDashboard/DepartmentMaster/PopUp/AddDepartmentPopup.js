import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createDepartment } from "../../../../../hooks/useDepartment";


const AddDepartmentPopup = ({ handleAdd }) => {


    const [name, setName] = useState("");

    const handleProjectAdd = async () => {
        const data = {
            name,
        };
        if (!name) {
            return toast.error("Please fill all fields");
        }
        await createDepartment(data);
        handleAdd();
    };

    return (
        <>
            <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                        <div className="modal-header pt-0">

                            <h5 className="card-title fw-bold" id="exampleModalLongTitle">

                                Create New Department
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
                                            <label for="Name" className="form-label label_text">     Department Name
                                            </label>
                                            <input type="text" className="form-control rounded-0" id="Name" onChange={(e) => setName(e.target.value)} value={name} aria-describedby="secemailHelp" />
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

export default AddDepartmentPopup;