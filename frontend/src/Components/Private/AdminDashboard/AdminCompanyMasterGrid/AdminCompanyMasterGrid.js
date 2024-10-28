import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import { AdminSidebar } from "../AdminSidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddCompanyPopup from "./PopUp/AddCompanyPopup";
import UpdatedCompanyPopup from "./PopUp/UpdatedCompanyPopup";
// import { getAdmin,deleteAdmin,createAdmin,updateAdmin } from "../../../../hooks/useAdmin";
import {getCompany} from "../../../../hooks/useCompany";
import {formatDate} from "../../../../utils/formatDate";
import { deleteCompany } from "../../../../hooks/useCompany";

export const AdminCompanyMasterGrid = () => {



    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };


    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelecteId] = useState(null);

    const[companyData,setCompanyData]=useState([]);



    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handleUpdate = (company = null) => {
        setSelectedCompany(company);
        // console.log("HandleUpdate CAlled");
        setUpdatePopUpShow(!updatePopUpShow);
    }


    const handelDeleteClosePopUpClick = (Id) => {
        setSelecteId(Id);
        setdeletePopUpShow(!deletePopUpShow);
    }

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
                const data =await getCompany();
                if (data) {
                    setCompanyData(data.companies || []);
                    
                }
            } catch (error) {
                console.error("Error fetching company:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        // Call the function to fetch the data
        fetchData();
    }, [deletePopUpShow, updatePopUpShow, AddPopUpShow]);


    return (
        <>
            {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )}
            <div className="container-scroller">
                <div className="row background_main_all">
                    <AdminHeader
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <AdminSidebar isopen={isopen} active="AdminCompanyMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Company
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
                                                    <th>Email</th>
                                                    <th>Admin</th>
                                                    <th>Created Date</th>
                                                    <th>Subscription End Date</th>
                                                    <th>Subscription Amount</th>
                                                    <th>Action</th>
                                                </tr>

                                                <tbody className="broder my-4">
                                                    {companyData && companyData.map((company, index) => (
                                                        <tr className="border my-4" key={company.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{company.name}</td>
                                                            <td>{company.email}</td>
                                                            <td>{company.admin}</td>
                                                            <td>{formatDate(company.createdAt)}</td>
                                                            <td>{formatDate(company.subDate)}</td>
                                                            <td>{company.subAmount}</td>
                                                            <td>
                                                                <span
                                                                    onClick={() => handleUpdate(company)}
                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success cursor-pointer me-3"></i>
                                                                </span>

                                                                <span
                                                                    onClick={() => handelDeleteClosePopUpClick(company._id)}
                                                                    className="delete">
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
                <AddCompanyPopup
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

            {updatePopUpShow ?
                <UpdatedCompanyPopup
                selectedCompany={selectedCompany}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }
        </>
    )
}