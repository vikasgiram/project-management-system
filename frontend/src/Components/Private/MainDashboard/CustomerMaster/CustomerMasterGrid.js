import { useState } from "react";
import { Header } from "../Header/Header";
import axios from "axios";
import { Sidebar } from "../Sidebar/Sidebar";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import AddCustomerPopUp from "./PopUp/AddCustomerPopUp";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import { EditCust } from "../../../../customCURD/custEdit";
import { getCustomers } from "../../../../hooks/useCustomers";


export const CustomerMasterGrid = () => {

    const [customers, setCustomers] = useState([]);

    const [isopen, setIsOpen] = useState(false);
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

    useEffect(() => {

        const fetchData = async () => {
            const data = await getCustomers();
            if (data) {
                setCustomers(data.customers || []);
                // console.log(customers,"data from useState");
            }
        };
        fetchData();
    }, [])

    // console.log(customers);
    // const EditBook = () => {

    //     const[title,setTitle] = useState("");
    //     const[author,setAuthor] = useState("");
    //     const[publishYear,setPublishYear] = useState("");
    //     const[loading,setLoading] = useState(false);
    //     const navigate = useNavigate();
    //     const {id}=useParams();
    
    //     useEffect(()=>{
    //         setLoading(true);
    //         axios
    //         .get(`api/customer/${id}`)
    //         .then((response)=>{
    //             setTitle(response.data.title);
    //             console.log(response.data.author);
    //             setAuthor(response.data.author);
    //             setPublishYear(response.data.publishYear);
    //             setLoading(false);
    //         })
    //         .catch((error)=>{
    //             setLoading(false);
    //             alert("something went wrong");
    //             console.log(error);
    //         });
    //     },[])
    
    //     const handleEditBook =()=>{
    //         {
    //             const data={
    //                 title,
    //                 author,
    //                 publishYear 
    //             };
    //             setLoading(true);
    //             axios
    //             .put(`http://localhost:5555/books/${id}`,data)
    //             .then((response)=>{
    //                 setLoading(false);
    //                 navigate("/");
    //             })
    //             .catch((error)=>{
    //                 setLoading(false);
    //                 alert("something went wrong");
    //                 console.log(error);
    //             });
    //         }
    //     };}
    

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
                                                <thead>
                                                    <tr className="th_border" >
                                                        <th>Sr. No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customers && customers.map((customers, index) => (
                                                        <tr className="border my-4" key={customers.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{customers.custName}</td>
                                                            <td>{customers.email}</td>
                                                            <td>{customers.phoneNumber1}</td>
                                                            <td>{customers.createdAt}</td>
                                                            <td>
                                                                <span
                                                                    onClick={() => {
                                                                        handleAdd()
                                                                    }}
                                                                    className="update ">
                                                                    {/* <i class="fa-solid fa-pen text-success cursor-pointer"
                                                                to={`/api/customer/${customers._id}`
                                                               
                                                            }
                                                            ></i> */}

                                                                    <i className="fa-solid fa-pen text-success cursor-pointer"
                                                                        onClick={() => console.log("bsbsbb",customers._id)} //its working
                                                                    ></i>
                                                                    

                                                                </span>

                                                                <span
                                                                    onClick={() => {
                                                                        setdeletePopUpShow(true)
                                                                    }}
                                                                    className="update">
                                                                    <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
                                                                </span>
                                                            </td>
                                                        </tr>))}
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
                <AddCustomerPopUp
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }

        </>
    )
}

