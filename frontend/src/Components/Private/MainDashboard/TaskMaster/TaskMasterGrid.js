import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import AddTaskPopUp from "./PopUp/AddTaskPopUp";
import DeletePopUP from "../../CommonPopUp/DeletePopUp";
import UpdateTaskPopUp from "./PopUp/UpdateTaskPopUp";

import { useEffect } from "react";
import toast from "react-hot-toast";

import { getTask, deleteTask } from "../../../../hooks/useTask";


export const TaskMasterGrid = () => {



    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };


    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [selectedId, setSelecteId] = useState(null);
    const [updatePopUpShow, setUpdatePopUpShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);


    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }

    const handleUpdate = (task = null) => {
        setSelectedTask(task);
        setUpdatePopUpShow((prevState) => !prevState);  // Toggle based on previous state
    };



    const handelDeleteClosePopUpClick = (id) => {
        setSelecteId(id);
        setdeletePopUpShow(!deletePopUpShow);
    }

    const handelDeleteClick = async () => {
        const data = await deleteTask(selectedId);
        if (data) {
            handelDeleteClosePopUpClick();
        }

    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const allTasks = await getTask();
                if (allTasks) {
                    setTasks(allTasks.task);
                    setFilteredData(allTasks.task);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [AddPopUpShow, deletePopUpShow, updatePopUpShow]);

    // console.log(tasks,"tasks");

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
                    <Header
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="TaskMasterGrid" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">

                                    <div className="col-12 col-lg-4">
                                        <h5 className="text-white py-2">
                                            Task Master
                                        </h5>
                                    </div>


                                    <div className="col-12 col-lg-4 ms-auto  ">
                                        <div className="row">

                                            <div className="col-4 col--md-6 col-lg-8">
                                                <div className="form">
                                                    <i className="fa fa-search"></i>
                                                    <input type="text"
                                                        value={searchText}
                                                        onChange={(e) => {
                                                            const newSearchText = e.target.value;
                                                            setSearchText(newSearchText);

                                                            // Filter tasks as the search text changes
                                                            const filtered = tasks.filter((task) =>
                                                                task.name.toLowerCase().includes(newSearchText.toLowerCase())
                                                            );
                                                            setFilteredData(filtered);
                                                        }}
                                                        className="form-control form-input bg-transparant"
                                                        placeholder="Search ..." />
                                                </div>
                                            </div>


                                            <div className="col-4 col-lg-4 ms-auto text-end">
                                                <button
                                                    onClick={() => {
                                                        handleAdd()
                                                    }}
                                                    type="button"
                                                    className="btn adbtn btn-dark"> <i className="fa-solid fa-plus"></i> Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="row  bg-white p-2 m-1 border rounded" >
                                    <div className="col-12 py-2">

                                        <div className="table-responsive">
                                            <table className="table table-striped table-class" id="table-id">

                                                <tr className="th_border">
                                                    <th>Sr. No</th>
                                                    <th>Task Name</th>
                                                    <th>Action</th>
                                                </tr>

                                                <tbody className="broder my-4">
                                                    {currentData && currentData.map((task, index) => (
                                                        <tr className="border my-4" key={task._id}>
                                                            <td>{ index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                            <td>{task.name}</td>

                                                            <td>
                                                                <span
                                                                    onClick={() => handleUpdate(task)}

                                                                    className="update">
                                                                    <i className="fa-solid fa-pen text-success me-3 cursor-pointer"></i>
                                                                </span>

                                                                <span
                                                                    onClick={() => handelDeleteClosePopUpClick(task._id)}
                                                                    className="delete">
                                                                    <i className="fa-solid fa-trash text-danger cursor-pointer"></i>
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
            {/* )} */}


            {
                deletePopUpShow ?
                    <DeletePopUP
                        message={'if you delete this task then all the related Tasksheet will be deleted.'}
                        cancelBtnCallBack={handelDeleteClosePopUpClick}
                        confirmBtnCallBack={handelDeleteClick}
                        heading="Delete"
                    /> : <></>
            }


            {AddPopUpShow ?
                <AddTaskPopUp

                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }


            {updatePopUpShow ?
                <UpdateTaskPopUp
                    selectedTask={selectedTask}
                    handleUpdate={handleUpdate}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }


        </>
    )
}