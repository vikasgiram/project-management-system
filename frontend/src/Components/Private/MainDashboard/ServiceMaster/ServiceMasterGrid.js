import { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddServicePopup from "./PopUp/AddServicePopUp";
import UpdateServicePopup from "./PopUp/UpdateServicePopUp";
import { getProjects, deleteProject } from "../../../../hooks/useProjects";
import { formatDate } from "../../../../utils/formatDate";
import { useNavigate } from "react-router-dom";


export const ServiceMasterGrid = () => {
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
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };


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
          setFilteredProjects(data.projects || []);
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

  // console.log(project);


  //   const handleChange = (value) => {
  //     if (value === "upcoming") {
  //       const upcomingProjects = project.filter((project) => project.projectStatus === "upcoming");
  //         setProject(upcomingProjects);
  //     }
  //     if (value === "inprocess") {
  //       const inprocessProjects = project.filter((project) => project.projectStatus === "inprocess");
  //         setProject(inprocessProjects);
  //     }
  //     if (value === "completed") {
  //       const completedProjects = project.filter((project) => project.projectStatus === "completed");
  //         setProject(completedProjects);
  //   }
  // }
  const handleChange = (value) => {
    if (value) {
      const filtered = project.filter((project) => project.projectStatus === value);
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(project);
    }
  };

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentData = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

// Total pages
const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);


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
            <Sidebar isopen={isopen} active="ServiceMasterGrid" />
            <div
              className="main-panel"
              style={{
                width: isopen ? "" : "calc(100%  - 120px )",
                marginLeft: isopen ? "" : "125px",
              }}
            >
              <div className="content-wrapper ps-3 ps-md-0 pt-3">
                <div className="row px-2 py-1   ">
                  <div className="col-12 col-lg-4">
                    <h5 className="text-white py-2">Service Master</h5>
                  </div>

                  <div className="col-12 col-lg-6  ms-auto text-end">

                    <div className="row">
                      <div className="col-4 col-lg-4 ms-auto">
                        {/* <select
                          className="form-select bg_edit"
                          aria-label="Default select example"
                          name="projectStatus"
                          onChange={(e) => handleChange(e.target.value)}
                        >
                          <option  value="">Select Project Status</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="inprocess">Inprocess</option>
                          <option value="completed">Complete</option>
                        </select> */}
                      </div>

                      <div className="col-2 col-lg-2 ms-auto">

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

                      </div>
                    </div>
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
                          <th>Service Type</th>
                          <th>Priority</th>
                          <th>Zone</th>
                          <th>Allotment Date</th>
                          <th>Allocated to</th>
                          <th>workmode</th>
                          <th>Action</th>
                        </tr>

                        {/* <tbody className="broder my-4">
                          {currentData &&
                            currentData.map((project, index) => (
                              <tr className="border my-4" key={project._id}>
                                <td>{index + 1}</td>
                                <td>{project.name}</td>
                                <td>{project.custId?.custName || "N/A"}</td>
                                <td>{formatDate(project.startDate)}</td>
                                <td>{formatDate(project.endDate)}</td>
                                <td>{project.projectStatus}</td>
                                <td>

                                  <i
                                    onClick={() => {
                                      navigate(`/${project._id}`);
                                    }}
                                    className="fa-solid fa-circle-info cursor-pointer"
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
        <AddServicePopup
          message="Create New Employee"
          handleAdd={handleAdd}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
      {UpdatePopUpShow ? (
        <UpdateServicePopup
          handleUpdate={handleUpdate}
          selectedProject={selectedProject}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
      {/* {DetailsPopUpShow ? (
        <GaintchartPoup
          handleDetails={handleDetails}
          selectedProject={selectedProject}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )} */}
    </>
  );
};