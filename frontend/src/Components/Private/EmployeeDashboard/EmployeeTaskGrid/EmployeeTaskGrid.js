import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
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
            const data = await getMyProjects();
            if (data) {

                setProjects(data.projects || []);
                setLoading(false);

            }
        };

        fetchData();
    }, []);


    return (
        <>
            {/* {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )} */}
            <div className="container-scroller">
                <div className="row background_main_all">
                    <EmployeeHeader
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <EmployeeSidebar isopen={isopen} active="EmployeeMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            My Projects
                                        </h5>
                                    </div>

                                    {/* <div className="col-12 col-lg-6  ms-auto text-end">
                                        <button
                                            onClick={() => {
                                                handleAdd()
                                            }}
                                            type="button"
                                            className="btn adbtn btn-dark"> <i className="fa-solid fa-plus"></i> Add</button>


                                    </div> */}

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
                                                    {projects && projects.length>0 ? ( projects.map((project, index) => (
                                                    <tr className="border my-4" key={project.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{project.name}</td>
                                                        <td>{project.custId.custName}</td>
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