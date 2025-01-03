import { useState, useEffect } from "react";
import { EmployeeHeader } from "../EmployeeHeader";
import { EmployeeSidebar } from "../EmployeeSidebar";
import { toast } from "react-toastify";
// import DeletePopUP from "../../CommonPopUp/DeletePopUp";
// import UpdateServicePopup from "./PopUp/UpdateServicePopUp";
// import ViewServicePopUp from "./PopUp/ViewServicePopUp";
// import { getAllService, deleteService } from "../../../../hooks/useService";
import {getFeedback, getRemaningFeedback} from "../../../../hooks/useFeedback"
import { formatDate } from "../../../../utils/formatDate";



export const EmployeeFeedbackMasterGrid = () => {

  const [isopen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isopen);
  };

  const [feedback, setFeedback] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10; 

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getRemaningFeedback();
        setFeedback(response);
        setFilteredProjects(response);
        setFilteredData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);
  // console.log(feedback,"feedback");
  

 
  // const handleChange = (value) => {
  //   if (value) {
  //     const filtered = service.filter((service) => service.projectStatus === value);
  //     setFilteredProjects(filtered);
  //   } else {
  //     setFilteredProjects(service);
  //   }
  // };

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
// console.log(currentData);


// Total pages
const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      {/* {loading && (
        <div className="overlay">
          <span className="loader"></span>
        </div>
      )} */}

      <div className="container-scroller">
        <div className="row background_main_all">
          <EmployeeHeader toggle={toggle} isopen={isopen} />
          <div className="container-fluid page-body-wrapper">
            <EmployeeSidebar isopen={isopen} active="EmployeeFeedbackMasterGrid" />
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
                    <h5 className="text-white py-2">Feedback Master</h5>
                  </div>

                  <div className="col-12 col-lg-6  ms-auto text-end">

                    <div className="row">
                    <div className="col-8 col-lg-6 ms-auto text-end">
                                                <div className="form">
                                                    <i className="fa fa-search"></i>
                                                    <input type="text"
                                                        value={searchText}
                                                        onChange={(e) => {
                                                            const newSearchText = e.target.value;
                                                            setSearchText(newSearchText);

                                                            // Filter customers as the search text changes
                                                            const filtered = feedback.filter((feedback) =>
                                                            feedback.ticket.client.custName.toLowerCase().includes(newSearchText.toLowerCase())||
                                                            feedback.ticket.contactPerson.toLowerCase().includes(newSearchText.toLowerCase()) ||
                                                            feedback.ticket.product.toLowerCase().includes(newSearchText.toLowerCase())
                                                            );
                                                            setFilteredData(filtered);
                                                        }}
                                                        className="form-control form-input bg-transparant"
                                                        placeholder="Search ..." />
                                                </div>
                                            </div>

                      {/* <div className="col-2 col-lg-2 ms-auto">

                        <button
                          onClick={() => {
                            
                          }}
                          type="button"
                          className="btn adbtn btn-dark"
                        >
                          {" "}
                          <i className="fa-solid fa-plus"></i> Add
                        </button>

                      </div> */}
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
                          <th>Client</th>
                          <th>Contact Person</th>
                          <th>Contact No</th>
                          <th>Product</th>
                          <th>Allotment Date</th>
                          <th>Completion Date</th>
                          <th>Alloted to</th>
                          <th>Action</th>
                       
                        </tr>

                        <tbody className="broder my-4">
                          {currentData &&
                            currentData.map((feedback, index) => (
                              <tr className="border my-4" key={feedback._id}>
                                <td>{index + 1}</td>
                                <td>{feedback?.ticket?.client?.custName}</td>
                                <td>{feedback?.ticket?.contactPerson}</td>
                                <td>{feedback?.ticket?.contactNumber}</td>
                                <td>{feedback?.ticket?.product}</td>
                                <td>{formatDate(feedback?.allotmentDate)}</td>
                                <td>{formatDate(feedback.completionDate)}</td>
                                <td>
                                  {feedback?.allotTo?.map(person => person.name).join(', ')}
                                </td>
                                <td>
                                  <span
                                    onClick={() => console.log(feedback._id)
                                    }
                                    className="update"
                                  >
                                    <i className="mx-1 fa-solid fa-pen text-success cursor-pointer"></i>
                                  </span>

                                  <span >
                                    <i class="fa-solid fa-eye cursor-pointer text-primary mx-1"></i>
                                  </span>
                                </td>  
                              </tr>
                            ))}
                            {filteredData.length === 0 && (<p>No data found</p>)}
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

      {/* {deletePopUpShow ? (
        <DeletePopUP
          message={"Are you sure! Do you want to Delete ?"}
          cancelBtnCallBack={handelDeleteClosePopUpClick}
          confirmBtnCallBack={handelDeleteClick}
          heading="Delete"
        />
      ) : (
        <></>
      )} */}
      {/* {AddPopUpShow ? (
        <AddServicePopup
          message="Create New Service"
          handleAdd={handleAdd}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )} */}
      {/* {UpdatePopUpShow ? (
        <UpdateServicePopup
          handleUpdate={handleUpdate}
          selectedService={selectedService}
        // heading="Forward"
        // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )} */}
      {/* {detailsServicePopUp ? (
        <ViewServicePopUp
          closePopUp={handelDetailsPopUpClick}
          selectedService={selectedService}
        />
      ) : (
        <></>
      )} */}
    </>
  );
};
