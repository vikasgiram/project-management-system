import { useState,useEffect } from "react";
import { AdminSidebar } from "../AdminSidebar";
import { AdminHeader } from "../AdminHeader";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddAdminPoup from "./PopUp/AddAdminPoup";
import UpdateAdminPopup from "./PopUp/UpdateAdminPopup";
import { getAdmin,deleteAdmin } from "../../../../hooks/useAdmin";


export const AdminmasterGrid = () => {
    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };
    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [selectedId, setSelecteId] = useState(null);
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [loading, setLoading] = useState(true);


    const [admins, setAdmins] = useState([])
    
    useEffect(() => {
        const fetch=async() => {
        try{
            const data=await getAdmin();
            setAdmins(data);
            // setLoading(false);
            }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }}
        
        fetch();
    }, [AddPopUpShow,deletePopUpShow,updatePopUpShow]);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handleUpdate = (admin = null) => {
        setSelectedAdmin(admin);
        // console.log("HandleUpdate CAlled");
        setUpdatePopUpShow(!updatePopUpShow);
    }


    const handelDeleteClosePopUpClick = (id) => {
        setSelecteId(id);
        setdeletePopUpShow(!deletePopUpShow);
    }

    const handelDeleteClick = async () => {
        await deleteAdmin(selectedId);
        setdeletePopUpShow(false);
    };


    return (
        <>
            {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )}
            <div className="container-scroller">
                <div className="row background_main_all">
                    <AdminHeader
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <AdminSidebar isopen={isopen} active="AdminmasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Admin
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
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    {/* <th>Department</th>
                                                    <th>Designation</th> */}
                                                    <th>Action</th>
                                                </tr>

                                                <tbody className="broder my-4">
                                                    {admins.admin && admins.admin.map((admin, index) => (
                                                        <tr className="border my-4" key={admin.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{admin.name}</td>
                                                            <td>{admin.email}</td>
                                                            {/* <td>{admin.name}</td>
                                                            <td>{admin.name}</td> */}
                                                            <td>
                                                                <span
                                                                    onClick={() => handleUpdate(admin)}
                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success cursor-pointer me-3"></i>
                                                                </span>

                                                                <span
                                                                    onClick={() => handelDeleteClosePopUpClick(admin._id)}
                                                                    className="delete">
                                                                    <i className="fa-solid fa-trash text-danger cursor-pointer"></i>
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

            {
                deletePopUpShow ?
                    <DeletePopUP
                        message={"Are you sure! Do you want to Delete ?"}
                        cancelBtnCallBack={handelDeleteClosePopUpClick}
                        confirmBtnCallBack={handelDeleteClick}
                        heading="Delete"
                    /> : <></>
            }


            {AddPopUpShow ?
                <AddAdminPoup
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

            {updatePopUpShow ?
                <UpdateAdminPopup
                selectedAdmin={selectedAdmin}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }
        </>
    )
}