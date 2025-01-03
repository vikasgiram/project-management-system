import { useState,useEffect } from "react";
import { EmployeeHeader } from "../EmployeeHeader";
import { EmployeeSidebar } from "../EmployeeSidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import ViewTaskPopUp from "./PopUp/ViewTaskPopUp";
import { getMyProjects } from "../../../../hooks/useProjects";
import { formatDate } from "../../../../utils/formatDate";

export const EmployeeTaskGrid = () => {

    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [TaskPopUpShow, setTaskPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [selectedId, setSelecteId] = useState(null);
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }
    const handleViewTask = (id) => {
        setSelecteId(id);
        setTaskPopUpShow(!TaskPopUpShow)
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
    // const handelDeleteClick = async () => {
    //     const data = await deleteEmployee(selectedId);
    //     if (data) {
    //         handelDeleteClosePopUpClick();
    //         return toast.success("Employee Deleted sucessfully...");
    //     }
    //     toast.error(data.error);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try{
            const data = await getMyProjects();
            if (data) {

                setProjects(data.projects || []);
                setFilteredProjects(data.projects || []);
                setLoading(false);
            }
        }catch(error){
            console.error("Error fetching projects:", error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    const handleChange = (value) => {
    
        if (value) {
          const filtered = projects.filter((projects) => projects.projectStatus === value);
          setFilteredProjects(filtered);
          
        } else {
          setFilteredProjects(projects);
        }
      };
      
      
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentData = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(projects.length / itemsPerPage);


    return (
        <>
            {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )}
            <div className="container-scroller">
                <div className="row background_main_all">
                    <EmployeeHeader
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <EmployeeSidebar isopen={isopen} active="EmployeeTaskGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">
                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            My Projects
                                        </h5>
                                        <div className="col-4 col-lg-4 ms-auto">
                        <select
                          className="form-select bg_edit"
                          aria-label="Default select example"
                          name="projectStatus"
                          onChange={(e) => handleChange(e.target.value)}
                        >
                          <option  value="">Select Status</option>
                          <option value="inprocess">Inprocess</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                                    </div>
                                  
                                </div>
                                <div className="row  bg-white p-2 m-1 border rounded" >
                                    <div className="col-12 py-2">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-class" id="table-id">
                                                <tr className="th_border" >
                                                    <th>Project No.</th>
                                                    <th>Project Name</th>
                                                    <th>Customer Name</th>
                                                    <th>Project Status</th>
                                                    <th>Finish Date</th>
                                                    <th>Tasks</th>
                                                </tr>
                                                <tbody className="broder my-4">
                                                    {currentData && currentData.length>0 ? ( currentData.map((project, index) => (
                                                    <tr className="border my-4" key={project.id}>
                                                        <td>{ index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                        <td>{project.name}</td>
                                                        <td>{project.custId?.custName || "N/A"}</td>
                                                        <td>{project.projectStatus}</td>
                                                        <td>{formatDate(project.endDate)}</td>
                                                        <td>
                                                            <i onClick={() => { handleViewTask(project._id)}}
                                                            class="fa-solid fa-eye Task_View_icon">
                                                            </i>
                                                        </td>
                                                        </tr>
                                                    ))
                                                    ):(
                                                        <tr>
                                                            <td colSpan="6" className="text-center">
                                                                No Projects assigned...
                                                            </td>
                                                        </tr>
                                                    )
                                                    }                               
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
            {
                deletePopUpShow ?
                    <DeletePopUP
                        message={"Are you sure! Do you want to Delete ?"}
                        cancelBtnCallBack={handelDeleteClosePopUpClick}
                        // confirmBtnCallBack={handelDeleteClick}
                        heading="Delete"
                    /> : <></>
            }
            {TaskPopUpShow ?
                <ViewTaskPopUp
                    message="Task"
                    selectedId= {selectedId}
                    handleViewTask={handleViewTask}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }
            {/* {updatePopUpShow ?
                <UpdateEmployeePopUp
                    selectedEmp= {selectedEmp}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            } */}
        </>
    )
}