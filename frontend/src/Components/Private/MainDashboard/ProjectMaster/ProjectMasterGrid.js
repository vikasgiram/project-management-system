import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddProjectPopup from "./PopUp/AddProjectPopup";

import { useEffect } from "react";

import { getProjects } from "../../../../hooks/useProjects";
import { formatDate } from "../../../../utils/formatDate";

export const ProjectMasterGrid = () => {

    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)

    const [projects, setProjects]= useState([]);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }


    const handelDeleteClosePopUpClick = () => {
        setdeletePopUpShow(false)
    }


    useEffect(() => {

        const fetchData = async () => {
            const data = await getProjects();
            if (data) {

                setProjects(data.projects || []);
                // console.log(employees,"data from useState");

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
                        <Sidebar isopen={isopen} active="ProjectMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                        Project Master
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
                                                    <th>Customer Name</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                <tbody className="broder my-4">
                                                    {projects && projects.map((project, index) => (
                                                    <tr className="border my-4" key={project.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{project.name}</td>
                                                        <td>{project.custId.custName}</td>
                                                        <td>{formatDate(project.startDate)}</td>
                                                        <td>{formatDate(project.endDate)}</td>
                                                        <td>{project.projectStatus}</td>
                                                        <td>
                                                        <span
                                                            onClick={() => handleAdd(project.id)}
                                                            className="update">
                                                            <i className="fa-solid fa-pen text-success cursor-pointer"></i>
                                                        </span>

                                                        <span
                                                            onClick={() => setdeletePopUpShow(true)}
                                                            className="update">
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


            {deletePopUpShow ?
                <DeletePopUP
                    message={"Are you sure! Do you want to Delete ?"}
                    cancelBtnCallBack={handelDeleteClosePopUpClick}
                    // confirmBtnCallBack={handelDeleteClick}
                    heading="Delete"
                /> : <></>
            }


            {AddPopUpShow ?
                <AddProjectPopup
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

        </>
    )
}