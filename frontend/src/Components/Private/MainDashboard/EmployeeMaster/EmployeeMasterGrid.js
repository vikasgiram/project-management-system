import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import AddEmployeePopup from "./PopUp/AddEmployeePopup";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import UpdateEmployeePopUp from "./PopUp/UpdateEmployeePopUp";
import HashLoader from "react-spinners/HashLoader";

import { useEffect } from "react";
import toast from "react-hot-toast";

import { getEmployees, deleteEmployee } from "../../../../hooks/useEmployees"
import { useNavigate } from "react-router-dom";


export const EmployeeMasterGrid = () => {



    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };


    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [selectedId, setSelecteId] = useState(null);
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [loading, setLoading] = useState(true);


    const [employees, setEmployees] = useState([])

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handleUpdate = (employee = null) => {
        setSelectedEmp(employee);
        // console.log("HandleUpdate CAlled");
        setUpdatePopUpShow(!updatePopUpShow);
    }


    const handelDeleteClosePopUpClick = (id) => {
        setSelecteId(id);
        setdeletePopUpShow(!deletePopUpShow);
    }

    const handelDeleteClick = async () => {
        const data = await deleteEmployee(selectedId);
        if (data) {
            handelDeleteClosePopUpClick();
            return toast.success("Employee Deleted sucessfully...");
        }
        toast.error(data.error);
    };


    // useEffect(() => {

    //     const fetchData = async () => {
    //         const data = await getEmployees();
    //         if (data) {

    //             setEmployees(data.employees || []);
    //             // console.log(employees,"data from useState");
    //             setLoading(false);
    //         }
          
    //     };

    //     fetchData();
    // }, [deletePopUpShow, updatePopUpShow, AddPopUpShow]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const data = await getEmployees();
    
                if (data) {
                    setEmployees(data.employees || []);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
    
        // Call the function to fetch the data
        fetchData();
    }, [deletePopUpShow, updatePopUpShow, AddPopUpShow]);


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
                        <Sidebar isopen={isopen} active="EmployeeMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Employee Master
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
                                                    <th>Department</th>
                                                    <th>Designation</th>
                                                    <th>Action</th>
                                                </tr>

                                                <tbody className="broder my-4">
                                                    {employees && employees.map((employee, index) => (
                                                        <tr className="border my-4" key={employee.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{employee.name}</td>
                                                            <td>{employee.email}</td>
                                                            <td>{employee.department.name}</td>
                                                            <td>{employee.designation.name}</td>
                                                            <td>
                                                                <span
                                                                    onClick={() => handleUpdate(employee)}
                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success cursor-pointer me-3"></i>
                                                                </span>

                                                                <span
                                                                    onClick={() => handelDeleteClosePopUpClick(employee._id)}
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
                <AddEmployeePopup
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

            {updatePopUpShow ?
                <UpdateEmployeePopUp
                    selectedEmp={selectedEmp}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }
        </>
    )
}