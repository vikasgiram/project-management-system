import { useState, useContext, useEffect } from "react";
import { deleteCustomer, getCustomers } from "../../../../hooks/useCustomer";
import { EmployeeHeader } from "../EmployeeHeader";
import { EmployeeSidebar } from "../EmployeeSidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import EmployeeAddCustomerPopUp from "./PopUp/EmployeeAddCustomerPopUp";
import EmployeeUpdateCustomerPopUp from "./PopUp/EmployeeUpdateCustomerPopUp";
import { UserContext } from "../../../../context/UserContext";
import { use } from "i18next";

export const EmployeeCustomerMasterGrid = () => {

    const [isopen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const toggle = () => {
        setIsOpen(!isopen);
    };
    
    const {user} = useContext(UserContext);
    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false)

    const [selectedId, setSelecteId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedCust, setSelectedCust]= useState(null);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handleUpdate = (customer) => {
        setSelectedCust(customer);
        setUpdatePopUpShow(!updatePopUpShow);
    }

    const handelDeleteClosePopUpClick = (id) => {
        setSelecteId(id);
        setdeletePopUpShow(!deletePopUpShow);
    }

    const handelDeleteClick = async () => {
        await deleteCustomer(selectedId);
        setdeletePopUpShow(false);
    };


    // useEffect(() => {

    //     const fetchData = async () => {
    //         const data = await getCustomers();
    //         if (data) {

    //             setCustomers(data.customers || []);
    //             // console.log(employees,"data from useState");
    //             setLoading(false);

    //         }
    //     };

    //     fetchData();
    // }, [deletePopUpShow, AddPopUpShow, updatePopUpShow]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCustomers();
                if (data) {
                    setCustomers(data.customers || []);
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [deletePopUpShow, AddPopUpShow, updatePopUpShow]);
    

   


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
                        <EmployeeSidebar isopen={isopen} active="EmployeeCustomerMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Customer Master
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
                                                    <th>Phone</th>
                                                    <th>GST No</th>
                                                    <th>Action</th>
                                                    
                                                </tr>
                                                <tbody>
                                                    {customers && customers.map((customer, index) => (
                                                        <tr className="border my-4" key={customer.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{customer.custName}</td>
                                                            <td>{customer.email}</td>
                                                            <td>{customer.phoneNumber1}</td>
                                                            <td>{customer.GSTNo}</td>
                                                            <td>
                                                                {user.permissions.includes('updateCustomer')?(<span
                                                                    onClick={()=>handleUpdate(customer)}
                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success me-3 cursor-pointer"></i>
                                                                </span>):('')}

                                                                {user.permissions.includes('deleteCustomer')?(<span
                                                                    onClick={() => handelDeleteClosePopUpClick(customer._id)}
                                                                    className="delete">
                                                                    <i className="fa-solid fa-trash text-danger cursor-pointer"></i>
                                                                </span>):('')}
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
                    confirmBtnCallBack={handelDeleteClick}
                    heading="Delete"
                /> : <></>
            }


            {AddPopUpShow ?
                <EmployeeAddCustomerPopUp
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

            {updatePopUpShow ?
                <EmployeeUpdateCustomerPopUp
                    selectedCust={selectedCust}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

        </>
    )
}