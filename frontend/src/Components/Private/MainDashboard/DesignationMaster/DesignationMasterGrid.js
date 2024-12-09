import { useState,useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { toast } from "react-toastify";

import AddDesignationPopup from "./Popup/AddDesignationPopup";
import UpdateDesignationPopup from "./Popup/UpdateDesignationPopup";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import { getAllDesignations, deleteDesignation } from "../../../../hooks/useDesignation";
import { getDepartment } from "../../../../hooks/useDepartment";




export const DesignationMasterGird = () => {

    const [AddPopUpShow, setAddPopUpShow] = useState(false);
    const [deletePopUpShow, setdeletePopUpShow] = useState(false);
    const [UpdatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [isopen, setIsOpen] = useState(false);


    const [selectedId, setSelecteId] = useState(null);
    const [selectedDes, setSelectedDes] = useState(null);

    const [designations, setDesignation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


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

    const handleUpdate = (designation = null) => {
        setSelectedDes(designation);
        // console.log("HandleUpdate CAlled");
        setUpdatePopUpShow(!UpdatePopUpShow);
    }

    const handelDeleteClick = async () => {
        const data = await deleteDesignation(selectedId);
        if (data) {
            handelDeleteClosePopUpClick();
            return toast.success("Designation Deleted sucessfully...");
        }

    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getAllDesignations();
                if (data) {
                    setDesignation(data.designations || []);
                    setFilteredData(data.designations || []);
                }
            }
            catch (error) {
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [AddPopUpShow, deletePopUpShow, UpdatePopUpShow]);

    // console.log(designations,"designations");
    
    const handleChange=(value)=>{
        if(value){
            const filtered = designations.filter((designation) => designation.department._id === value);
            setFilteredData(filtered);
        }else{
            setFilteredData(designations);
        }
    }
    const uniqueDepartments = designations.reduce((acc, designation) => {
        const departmentId = designation.department._id;
        // Check if the department ID is already in the accumulator
        if (!acc.some(dept => dept._id === departmentId)) {
            acc.push(designation.department);
        }
        return acc;
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(currentData.length / itemsPerPage);

     
    return (
        <>
            {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )}
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="DesignationMasterGird" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Designation Master
                                        </h5>
                                    </div>

                                    <div className="col-12 col-lg-6  ms-auto text-end">
                                    
                                    <select
                       
                        onChange={(e) => handleChange(e.target.value)}
                      >
                        <option value="">Select Department</option>
                        {uniqueDepartments.map((department) => (
                          <option key={department._id} value={department._id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                                    {/* <span class="loader"></span> */}
                                    
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
                                                    {currentData && currentData.map((designation, index) => (

                                                        <tr className="border my-4" key={designation._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{designation.department.name}</td>
                                                            <td>
                                                                {designation.name}
                                                            </td>
                                                            <td>
                                                                <span
                                                                    onClick={() => handleUpdate(designation)}
                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success cursor-pointer me-3"></i>
                                                                </span>

                                                                <span
                                                                    onClick={() => handelDeleteClosePopUpClick(designation._id)}
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
                                <div className="pagination-container text-center my-3 sm">
                                    <button
                                        disabled={currentPage <= 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="btn btn-dark me-2 btn-sm me-2"
                                    >
                                        Previous
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`btn btn-dark btn-sm me-2 ${currentPage === index + 1 ? 'active' : ''}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        disabled={currentPage >= totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="btn btn-dark btn-sm me-2"
                                    >
                                        Next
                                    </button>
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
                <AddDesignationPopup
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

            {UpdatePopUpShow ?
                <UpdateDesignationPopup
                    selectedDes={selectedDes}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }



        </>
    )
}
