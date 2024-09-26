import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getDepartment } from "../../../../hooks/useDepartment";
import { getRole,deleteRole, getAllRole } from "../../../../hooks/useRole";
import AddRolesPopup from "./Popup/AddRolesPopup";

import DeletePopUP from "../../CommonPopUp/DeletePopUp";


export const RoleMasterGrid = () => {

    const [AddPopUpShow, setAddPopUpShow] = useState(false);
    const [deletePopUpShow, setdeletePopUpShow] = useState(false);
    const [isopen, setIsOpen] = useState(false);


    const [selectedId, setSelecteId] = useState(null);

    const [roles, setRoles] = useState([]);


    const toggle = () => {
        setIsOpen(!isopen);
    };

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handelDeleteClosePopUpClick = (id) => {
        setSelecteId(id);
        setdeletePopUpShow(!deletePopUpShow);
    }

    const handelDeleteClick = async () => {
        const data = await deleteRole(selectedId);
        if (data) {
            handelDeleteClosePopUpClick();
            return toast.success("Role Deleted sucessfully...");
        }
        toast.error(data.error);
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllRole();
            // console.log(data,"dta from getDepartment");
            if (data) {
                setRoles(data.roles || []);
                // console.log(departments,"data from useState"); 
            }
        };

        fetchData();
    }, []);




    return (
        <>
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="RoleMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Role Master
                                        </h5>
                                    </div>

                                    <div className="col-12 col-lg-6  ms-auto text-end">
                                        <button
                                            onClick={() => {
                                                handleAdd()
                                            }}
                                            type="button"
                                            className="btn adbtn btn-dark"> <i className="fa-solid fa-plus"></i> Add</button>


                                    </div>

                                </div>

                                <div className="row  bg-white p-2 m-1 border rounded" >
                                    <div className="col-12 py-2">

                                        <div className="table-responsive">
                                            <table className="table table-striped table-class" id="table-id">
                                                <tr className="th_border" >
                                                    <th>Sr. No</th>
                                                    <th>Department Name</th>
                                                    <th>Roles</th>
                                                    <th>Action</th>

                                                </tr>

                                                <tbody className="broder my-4">
                                                    {roles && roles.map((role, index) => (

                                                        <tr className="border my-4" key={role._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{role.department.name}</td>
                                                            <td>
                                                                {role.name}
                                                            </td>


                                                            <td>

                                                                <span
                                                                    onClick={() => console.log(roles._id)}
                                                                    className="delete">
                                                                    <i className="mx-1 fa-solid fa-trash text-danger cursor-pointer"></i>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>




                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {deletePopUpShow ?
                <DeletePopUP
                    message={"Are you sure! Do you want to Delete ?"}
                    cancelBtnCallBack={handelDeleteClosePopUpClick}
                    confirmBtnCallBack={handelDeleteClick}
                    heading="Delete"
                /> : <></>
            }


            {AddPopUpShow ?
                <AddRolesPopup
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }


        </>
    )
}
