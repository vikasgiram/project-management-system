import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { toast } from "react-toastify";

import AddRolesPopup from "./Popup/AddRolesPopup";

import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import { getAllDesignations, deleteDesignation } from "../../../../hooks/useDesignation";
import { HashLoader } from "react-spinners";



export const DesignationMasterGird = () => {

    const [AddPopUpShow, setAddPopUpShow] = useState(false);
    const [deletePopUpShow, setdeletePopUpShow] = useState(false);
    const [isopen, setIsOpen] = useState(false);


    const [selectedId, setSelecteId] = useState(null);

    const [designations, setDesignation] = useState([]);
    const [loading, setLoading] = useState(true);


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
        const data = await deleteDesignation(selectedId);
        if (data) {
            handelDeleteClosePopUpClick();
            return toast.success("Designation Deleted sucessfully...");
        }
        toast.error(data.error);
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDesignations();
            // console.log(data,"dta from getDepartment");
            if (data) {
                setDesignation(data.designations || []);
                // console.log(departments,"data from useState"); 
                setLoading(false);
            }
        };

        fetchData();
    }, [AddPopUpShow,deletePopUpShow]);




    return (
        <>
            {loading ? (
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',  // Full height of the viewport
                  width: '100vw',   // Full width of the viewport
                  position: 'absolute', // Absolute positioning to cover the viewport
                  top: 0,
                  left: 0,
                  backgroundColor: '#f8f9fa' // Optional background color
               }}
            >
               <HashLoader color="#4C3B77" loading={loading} size={50} />
            </div>
         ) : (
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="DesignationMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Designation Master
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
                                                    <th>Designation</th>
                                                    <th>Action</th>

                                                </tr>

                                                <tbody className="broder my-4">
                                                    {designations && designations.map((designation, index) => (

                                                        <tr className="border my-4" key={designation._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{designation.department.name}</td>
                                                            <td>
                                                                {designation.name}
                                                            </td>


                                                            <td>

                                                                <span
                                                                    onClick={() =>handelDeleteClosePopUpClick(designation._id) }
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
         )}


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
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }


        </>
    )
}
