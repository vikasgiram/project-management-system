import { useState,useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddProjectPopup from "./PopUp/AddProjectPopup";

import { getProjects } from "../../../../hooks/useProject";


export const ProjectMasterGrid = () => {
    const [isopen, setIsOpen] = useState(false);

    const [projects,setProjects]=useState([])

useEffect(()=>{

    const fetchData=async()=>{
        const data=await getProjects();
        if(data){
            setProjects(data.projects || []);
            // console.log(projects,"data from useState");
        }
    }    
    fetchData();
},[]);


    
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }


    const handelDeleteClosePopUpClick = () => {
        setdeletePopUpShow(false)
    }


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
                                                <thead>
                                                <tr className="th_border" >
                                                    <th>Sr. No</th>
                                                    <th>Name</th>
                                                    <th>Project Status</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {projects.map((project, index) => (
                                                        
                                                    
                                                <tr className="border my-4">
                                                    <td>{index+1}</td>
                                                    <td>{project.name}</td>
                                                    <td>{project.projectStatus}</td>
                                                    <td>{project.startDate}</td>
                                                    <td>{project.endDate}</td>
                                                    <td>
                                                        <span
                                                            onClick={() => {
                                                                handleAdd()
                                                            }}
                                                            className="update ">
                                                            <i class="fa-solid fa-pen text-success cursor-pointer"></i>
                                                        </span>

                                                        <span
                                                            onClick={() => {
                                                                setdeletePopUpShow(true)
                                                            }}
                                                            className="update">
                                                            <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
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

