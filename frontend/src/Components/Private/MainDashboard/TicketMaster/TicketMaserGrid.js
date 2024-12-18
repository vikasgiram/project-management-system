import { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import AddEmployeePopup from "./PopUp/AddTicketPopup";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import UpdateEmployeePopUp from "./PopUp/UpdateTicketPopUp";
import toast from "react-hot-toast";
import { getEmployees, deleteEmployee } from "../../../../hooks/useEmployees"
import {Feedback} from "./Feedback";
import { useNavigate } from "react-router-dom";

export const TicketMasterGrid = () => {
    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const navigate = useNavigate();


    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [selectedId, setSelecteId] = useState(null);
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);


    const [employees, setEmployees] = useState([])
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


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
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const data = await getEmployees();

                if (data) {
                    setEmployees(data.employees || []);
                    setFilteredData(data.employees || []);
                    // console.log(employees);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [deletePopUpShow, updatePopUpShow, AddPopUpShow]);

    // console.log(employees);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(   filteredData.length / itemsPerPage);


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
                        <Sidebar isopen={isopen} active="TicketMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <div className="row">
                                            <div className="col-12 col-lg-4">
                                                <h5 className="text-white py-2">
                                                    Ticket Master
                                                    {/* <button onClick={() => navigate("/feedback")}>aaaa</button> */}
                                                
                                                </h5>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="col-12 col-lg-4 ms-auto  ">
                                        
                                        <div className="row">
                                            <div className="col-8 col-lg-6 ms-auto text-end">
                                                <div className="form">
                                                    <i className="fa fa-search"></i>
                                                    <input type="text"
                                                        value={searchText}
                                                        onChange={(e) => {
                                                            const newSearchText = e.target.value;
                                                            setSearchText(newSearchText);

                                                            // Filter employees as the search text changes
                                                            const filteredEmp = employees.filter((emp) =>
                                                                emp.name.toLowerCase().includes(newSearchText.toLowerCase())
                                                            );
                                                            setFilteredData(filteredEmp);
                                                        }}
                                                        className="form-control form-input bg-transparant"
                                                        placeholder="Search ..." />
                                                </div>
                                            </div>

                                            <div className="col- col-lg-2 ms-auto text-end">
                                                <button
                                                    onClick={() => {
                                                        handleAdd()
                                                    }}
                                                    type="button"
                                                    className="btn adbtn btn-dark"> <i className="fa-solid fa-plus"></i> Add</button>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="row  bg-white p-2 m-1 border rounded" >
                                    <div className="col-12 py-2">

                                        <div className="table-responsive">
                                            <table className="table table-striped table-class" id="table-id">

                                                <tr className="th_border" >
                                                    <th>Sr. No</th>
                                                    <th>Client Name</th>
                                                    <th>Complaint Details</th>
                                                    <th>Product</th>
                                                    <th>Registered by</th>
                                                    <th>Action</th>
                                                </tr>

                                                {/* <tbody className="broder my-4">
                                                    {currentData && currentData.map((employee, index) => (
                                                        <tr className="border my-4" key={employee._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{employee.name}</td>
                                                            <td>{employee.email}</td>
                                                            <td>{employee.department && employee.department.name}</td>
                                                            <td>{employee.designation && employee.designation.name}</td>
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

                                                    <p> {filteredData.length === 0 && <p>No results found</p>}</p>
                                                </tbody> */}
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