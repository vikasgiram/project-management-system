import { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import UpdateServicePopup from "./PopUp/UpdateServicePopUp";
import { getAllService, deleteService } from "../../../../hooks/useService";
import { formatDate } from "../../../../utils/formatDate";
import ViewServicePopUp from "./PopUp/ViewServicePopUp";

export const ServiceMasterGrid = () => {


  const [isopen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isopen);
  };

  const [AddPopUpShow, setAddPopUpShow] = useState(false);
  const [deletePopUpShow, setdeletePopUpShow] = useState(false);
  const [UpdatePopUpShow, setUpdatePopUpShow] = useState(false);


  const [selectedId, setSelecteId] = useState(null);
  const [service, setService] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [detailsServicePopUp, setDetailsServicePopUp] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };




  const handleUpdate = (projects = null) => {
    setSelectedService(projects);
    setUpdatePopUpShow(!UpdatePopUpShow);
  };

  const handelDeleteClosePopUpClick = (id) => {
    setSelecteId(id);
    setdeletePopUpShow(!deletePopUpShow);
  };

  const handelDeleteClick = async () => {
    const data = await deleteService(selectedId);
    if (data) {
      handelDeleteClosePopUpClick();
      return toast.success("service Deleted sucessfully...");
    }
    toast.error(data.error);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllService();
        if (data) {
          console.log(data);
          setService(data);
          setFilteredProjects(data);
          
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

  const handleChange = (value) => {
    if (value) {
      const filtered = service.filter((service) => service.projectStatus === value);
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(service);
    }
  };
  const handelDetailsPopUpClick = (service) => {
    setSelectedService(service);
    setDetailsServicePopUp(!detailsServicePopUp);
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
                          <option  value="">Select service Status</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="inprocess">Inprocess</option>
                          <option value="completed">Complete</option>
                        </select> */}
                      </div>

                      <div className="col-2 col-lg-2 ms-auto">

                        {/* <button
                          onClick={() => {
                            
                          }}
                          type="button"
                          className="btn adbtn btn-dark"
                        >
                          {" "}
                          <i className="fa-solid fa-plus"></i> Add
                        </button> */}

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
                          <th>Complaint</th>
                          <th>Client</th>
                          <th>Product</th>
                          <th>Priority</th>      
                          <th>Allotment Date</th>
                          <th>Allocated to</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>

                        <tbody className="broder my-4">
                          {service &&
                            service.map((service, index) => (
                              <tr className="border my-4" key={service._id}>
                                <td>{index + 1}</td>
                                <td>{service?.ticket?.details}</td>
                                <td>{service?.ticket?.client?.custName}</td>
                                <td>{service?.ticket?.product}</td>
                                <td>{service.priority}</td>
                                <td>{formatDate(service.allotmentDate)}</td>
                                {service.allotTo && service.allotTo.map((allotTo) => (
                                  <td >{allotTo.name}</td>
                                ))}
                                <td>{service.status}</td>
                                <td>
                                  <span
                                    onClick={() => handleUpdate(service)}
                                    className="update"
                                  >
                                    <i className="mx-1 fa-solid fa-pen text-success cursor-pointer"></i>
                                  </span>

                                  

                                  <span
                                    onClick={() =>
                                      handelDeleteClosePopUpClick(service._id)
                                    }
                                    className="delete"
                                  >
                                    <i className="mx-1 fa-solid fa-trash text-danger cursor-pointer"></i>
                                  </span>

                                  <span onClick={() => handelDetailsPopUpClick(service)}>
                                    <i class="fa-solid fa-eye cursor-pointer text-primary mx-1"></i>
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
      {/* {AddPopUpShow ? (
        <AddServicePopup
          message="Create New Employee"
          handleAdd={handleAdd}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )} */}
      {UpdatePopUpShow ? (
        <UpdateServicePopup
          handleUpdate={handleUpdate}
          selectedService={selectedService}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
        {detailsServicePopUp ? (
        <ViewServicePopUp
          closePopUp={handelDetailsPopUpClick}
          selectedService={selectedService}
        />
      ) : (
        <></>
      )}
    </>
  );
};
