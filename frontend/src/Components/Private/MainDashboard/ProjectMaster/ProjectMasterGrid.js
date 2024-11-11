import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { toast } from "react-toastify";

import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddProjectPopup from "./PopUp/AddProjectPopup";
import UpdateProjectPopup from "./PopUp/UpdateProjectPopup";
import DownloadPopup from "./PopUp/DownloadProjectPopup";

import { getProjects, deleteProject, exportProject } from "../../../../hooks/useProjects";
import { formatDate } from "../../../../utils/formatDate";
import GaintchartPoup from "./PopUp/GaintchartPoup";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


export const ProjectMasterGrid = () => {
  const navigate = useNavigate();

  const [isopen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isopen);
  };

  const [AddPopUpShow, setAddPopUpShow] = useState(false);
  const [deletePopUpShow, setdeletePopUpShow] = useState(false);
  const [UpdatePopUpShow, setUpdatePopUpShow] = useState(false);
  const [DetailsPopUpShow, setDetailsPopUpShow] = useState(false);
  const [DownloadPopUpShow, setDownloadPopUpShow] = useState(false);

  const [selectedId, setSelecteId] = useState(null);
  const [project, setProject] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    setAddPopUpShow(!AddPopUpShow);
  };

  const handleUpdate = (projects = null) => {
    setSelectedProject(projects);
    setUpdatePopUpShow(!UpdatePopUpShow);
  };

  const handleDetails = (project) => {
    setSelectedProject(project);
    setDetailsPopUpShow(!DetailsPopUpShow);
  };

  const handelDeleteClosePopUpClick = (id) => {
    setSelecteId(id);
    setdeletePopUpShow(!deletePopUpShow);
  };

  const handleDownloads = () => {
    // setSelectedProject(project);
    setDownloadPopUpShow(!DownloadPopUpShow);
  };

  const handelDeleteClick = async () => {
    const data = await deleteProject(selectedId);
    if (data) {
      handelDeleteClosePopUpClick();
      return toast.success("Project Deleted sucessfully...");
    }
    toast.error(data.error);
  };



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getProjects();
  //     if (data) {
  //       setProject(data.projects || []);
  //       // console.log(employees,"data from useState");
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [AddPopUpShow, UpdatePopUpShow, deletePopUpShow]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        if (data) {
          setProject(data.projects || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [AddPopUpShow, UpdatePopUpShow, deletePopUpShow]);

  return (
    <>
      {loading && (
        <div className="overlay">
          <span className="loader"></span>
        </div>
      )}

      <div className="container-scroller">
        <div className="row background_main_all">
          <Header toggle={toggle} isopen={isopen} />
          <div className="container-fluid page-body-wrapper">
            <Sidebar isopen={isopen} active="ProjectMasterGrid" />
            <div
              className="main-panel"
              style={{
                width: isopen ? "" : "calc(100%  - 120px )",
                marginLeft: isopen ? "" : "125px",
              }}
            >
              <div className="content-wrapper ps-3 ps-md-0 pt-3">
                <div className="row px-2 py-1   ">
                  <div className="col-12 col-lg-6">
                    <h5 className="text-white py-2">Project Master</h5>
                  </div>

                  <div className="col-12 col-lg-6  ms-auto text-end">
                    <button
                      onClick={() => {
                        handleAdd();
                      }}
                      type="button"
                      className="btn adbtn btn-dark"

                      
                    >
                      {" "}
                      <i className="fa-solid fa-plus"></i> Add
                    </button>

                    <button
                      onClick={() => {
                        handleDownloads(project);
                      }}
                      type="button"
                      className="btn adbtn btn-dark mx-3"
                    >
                      {" "}
                      <i class="fa-solid fa-download"></i> Download Report
                    </button>
                  </div>

                </div>

                <div className="row  bg-white p-2 m-1 border rounded">
                  <div className="col-12 py-2">
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-class"
                        id="table-id"
                      >
                        <tr className="th_border">
                          <th>Sr. No</th>
                          <th>Name</th>
                          <th>Customer Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Details</th>
                          <th>Action</th>
                        </tr>

                        <tbody className="broder my-4">
                          {project &&
                            project.map((project, index) => (
                              <tr className="border my-4" key={project._id}>
                                <td>{index + 1}</td>
                                <td>{project.name}</td>
                                <td>{project.custId?.custName || "N/A"}</td>
                                <td>{formatDate(project.startDate)}</td>
                                <td>{formatDate(project.endDate)}</td>
                                <td>{project.projectStatus}</td>
                                <td>
                                  {/* {project.projectStatus} */}

                                  <i
                                    onClick={() => {
                                      navigate(`/${project._id}`);
                                    }}
                                    class="fa-solid fa-circle-info cursor-pointer"
                                  ></i>
                                </td>
                                <td>
                                  <span
                                    onClick={() => handleUpdate(project)}
                                    className="update"
                                  >
                                    <i className="mx-1 fa-solid fa-pen text-success cursor-pointer"></i>
                                  </span>

                                  <span
                                    onClick={() =>
                                      handelDeleteClosePopUpClick(project._id)
                                    }
                                    className="delete"
                                  >
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

      {deletePopUpShow ? (
        <DeletePopUP
          message={"Are you sure! Do you want to Delete ?"}
          cancelBtnCallBack={handelDeleteClosePopUpClick}
          confirmBtnCallBack={handelDeleteClick}
          heading="Delete"
        />
      ) : (
        <></>
      )}
      {AddPopUpShow ? (
        <AddProjectPopup
          message="Create New Employee"
          handleAdd={handleAdd}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
      {UpdatePopUpShow ? (
        <UpdateProjectPopup
          handleUpdate={handleUpdate}
          selectedProject={selectedProject}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
      {DetailsPopUpShow ? (
        <GaintchartPoup
          handleDetails={handleDetails}
          selectedProject={selectedProject}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
      {DownloadPopUpShow ? (
        <DownloadPopup
          handleDownloads={handleDownloads}
        // selectedProject={selectedProject}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
      {/* {DownloadPopUpShow ? (
    <DownloadPopup
        handleDownloads={handleDownloads}
        // selectedProject={selectedProject}
    />
) : null} */}
    </>
  );
};
