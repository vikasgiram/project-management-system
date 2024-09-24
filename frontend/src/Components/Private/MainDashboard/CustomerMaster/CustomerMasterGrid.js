import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { toast } from "react-toastify";

import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddCustomerPopUp from "./PopUp/AddCustomerPopUp";
import UpdateCustomerPopUp from "./PopUp/UpdateCustomerPopUp";

import { useEffect } from "react";

import { getCustomers, deleteCustomer } from "../../../../hooks/useCustomer";

export const CustomerMasterGrid = () => {

    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [UpdatePopUpShow, setUpdatePopUpShow] = useState(false)

    const [selectedId, setSelecteId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedCust, setSelectedCust]= useState(null);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handleUpdate = (customer) => {
        setSelectedCust(customer);
        setUpdatePopUpShow(!UpdatePopUpShow)
    }

    const handelDeleteClosePopUpClick = (id) => {
        setSelecteId(id);
        setdeletePopUpShow(!deletePopUpShow);
    }

    const handelDeleteClick = async () => {
        await deleteCustomer(selectedId);
        setdeletePopUpShow(false);
    };


    useEffect(() => {

        const fetchData = async () => {
            const data = await getCustomers();
            if (data) {

                setCustomers(data.customers || []);
                // console.log(employees,"data from useState");

            }
        };

        fetchData();
    }, [deletePopUpShow, AddPopUpShow, UpdatePopUpShow]);


    return (
        <>
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="CustomerMasterGrid" />
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
                                                                <span
                                                                    onClick={() => handleUpdate(customer)}
                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success cursor-pointer"></i>
                                                                </span>

                                                                <span
                                                                    onClick={() => handelDeleteClosePopUpClick(customer._id)}
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


            {deletePopUpShow ?
                <DeletePopUP
                    message={"Are you sure! Do you want to Delete ?"}
                    cancelBtnCallBack={handelDeleteClosePopUpClick}
                    confirmBtnCallBack={handelDeleteClick}
                    heading="Delete"
                /> : <></>
            }


            {AddPopUpShow ?
                <AddCustomerPopUp
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

            {UpdatePopUpShow ?
                <UpdateCustomerPopUp
                    selectedCust={selectedCust}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

        </>
    )
}

