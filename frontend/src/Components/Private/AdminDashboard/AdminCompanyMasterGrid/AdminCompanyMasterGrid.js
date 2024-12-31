import { useState, useEffect } from "react";
import { AdminHeader } from "../AdminHeader";
import { AdminSidebar } from "../AdminSidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddCompanyPopup from "./PopUp/AddCompanyPopup";
import UpdatedCompanyPopup from "./PopUp/UpdatedCompanyPopup";
import { getCompany, deleteCompany } from "../../../../hooks/useCompany";
import { formatDate } from "../../../../utils/formatDate";

export const AdminCompanyMasterGrid = () => {
  const [isopen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isopen);
  };
  const [AddPopUpShow, setAddPopUpShow] = useState(false);
  const [deletePopUpShow, setdeletePopUpShow] = useState(false);
  const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelecteId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAdd = () => {
    setAddPopUpShow(!AddPopUpShow);
  };

  const handleUpdate = (company = null) => {
    setSelectedCompany(company);
    // console.log("HandleUpdate CAlled");
    setUpdatePopUpShow(!updatePopUpShow);
  };

  const handelDeleteClosePopUpClick = (Id) => {
    setSelecteId(Id);
    setdeletePopUpShow(!deletePopUpShow);
  };

  // const handelDeleteClick = async () => {
  //     const data = await deleteCompany(selectedId);
  //     if (data) {
  //         handelDeleteClosePopUpClick();
  //         return toast.success("compony Deleted sucessfully...");
  //     }
  //     toast.error(data.error);
  // };

  const handelDeleteClick = async () => {
    await deleteCompany(selectedId);
    setdeletePopUpShow(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCompany();
        if (data) {
          setCompanyData(data.companies || []);
          setFilteredData(data.companies || []);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deletePopUpShow, updatePopUpShow, AddPopUpShow]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      {loading && (
        <div className="overlay">
          <span className="loader"></span>
        </div>
      )}
      <div className="container-scroller">
        <div className="row background_main_all">
          <AdminHeader toggle={toggle} isopen={isopen} />
          <div className="container-fluid page-body-wrapper">
            <AdminSidebar isopen={isopen} active="AdminCompanyMasterGrid" />
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
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <h5 className="text-white py-2">Company</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-5 ms-auto  ">
                    <div className="row">
                      <div className="col-8 col-lg-6 ms-auto text-end">
                      <div className="form">
                      <i className="fa fa-search"></i>
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                          const newSearchText = e.target.value;
                          setSearchText(newSearchText);

                          // Filter employees as the search text changes
                          const filteredEmp = companyData.filter((company) =>
                            company.name
                              .toLowerCase()
                              .includes(newSearchText.toLowerCase())
                          );
                          setFilteredData(filteredEmp);
                        }}
                        className="form-control form-input bg-transparant"
                        placeholder="Search ..."
                      />
                    </div>
                      </div>

                      <div className="col- col-lg-2 ms-auto text-end">
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Admin</th>
                          <th>Created Date</th>
                          <th>Subscription End Date</th>
                          <th> Status </th>
                          <th>Subscription Amount</th>
                          <th>Action</th>
                        </tr>

                        <tbody className="broder my-4">
                          {currentData &&
                            currentData.map((company, index) => (
                              <tr className="border my-4" key={company.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <td>{company.admin}</td>
                                <td>{formatDate(company.createdAt)}</td>
                                <td>{formatDate(company.subDate)}</td>
                                <td>
                                  {new Date(company.subDate).getTime() >=
                                  Date.now()
                                    ? "Active"
                                    : "Inactive"}
                                </td>
                                <td>{company.subAmount}</td>
                                <td>
                                  <span
                                    onClick={() => handleUpdate(company)}
                                    className="update"
                                  >
                                    <i className="fa-solid fa-pen text-success cursor-pointer me-3"></i>
                                  </span>

                                  <span
                                    onClick={() =>
                                      handelDeleteClosePopUpClick(company._id)
                                    }
                                    className="delete"
                                  >
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
                      className={`btn btn-dark btn-sm me-2 ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
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
        <AddCompanyPopup
          message="Create New Employee"
          handleAdd={handleAdd}
          // heading="Forward"
          // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}

      {updatePopUpShow ? (
        <UpdatedCompanyPopup
          selectedCompany={selectedCompany}
          handleUpdate={handleUpdate}
          // heading="Forward"
          // cancelBtnCallBack={handleAddDepartment}
        />
      ) : (
        <></>
      )}
    </>
  );
};
