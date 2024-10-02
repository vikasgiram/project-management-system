import { useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { ViewMode, Gantt } from "gantt-task-react";
import { getStartEndDateForProject, initTasks } from "../../../Helper/GanttChartHelper";
import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewSwitcher } from "../../../Helper/ViewSwitcher";
import {getProjects} from "../../../../hooks//useProjects";
import { HashLoader } from "react-spinners";

export const TaskMasterChart = () => {

    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [loading, setLoading] = useState(true);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }


    const handelDeleteClosePopUpClick = () => {
        setdeletePopUpShow(false)
    }




    const [view, setView] = React.useState(ViewMode.Day);
    const [tasks, setTasks] = React.useState(initTasks());
    const [isChecked, setIsChecked] = React.useState(true);
    let columnWidth = 90;
    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }
    const handleTaskChange = (task) => {
        console.log("On date change Id:" + task.id);
        let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project =
                newTasks[newTasks.findIndex((t) => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map((t) =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTasks(newTasks);
    };
    const handleTaskDelete = (task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter((t) => t.id !== task.id));
        }
        return conf;
    };
    const handleProgressChange = async (task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };
    const handleDblClick = (task) => {
        alert("On Double Click event Id:" + task.id);
    };
    const handleSelect = (task, isSelected) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };
    const handleExpanderClick = (task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProjects(); // Get project data from API
                const transformedTasks = transformProjectsToTasks(response.projects); // Transform the data
                setTasks(transformedTasks);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            }
        };
        fetchData();
    }, []);

    const transformProjectsToTasks = (projects) => {
        return projects.flatMap((project) => {
            const projectTask = {
                id: project._id,
                name: project.name,
                start: new Date(project.startDate),
                end: new Date(project.endDate),
                progress: project.completeLevel,
                type: "project",
                hideChildren: false,
            };

            // Map tasks within each project
            const taskList = project.tasks.map((task) => ({
                id: task._id,
                name: task.taskName,
                start: new Date(task.startDate),
                end: new Date(task.endDate),
                project: project._id,
                type: "task",
                progress: task.taskLevel,
            }));

            return [projectTask, ...taskList];
        });
    };


    return (
        <> {loading ? (
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',  // Full height of the viewport
                  width: '100vw',   // Full width of the viewport
                  position: 'absolute', // Absolute positioning to cover the viewport
                  top: 0,
                  left: 0,
                  backgroundColor: '#f8f9fa' // Optional background color
               }}
            >
               <HashLoader color="#4C3B77" loading={loading} size={50} />
            </div>
         ) : (
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="TaskMasterChart" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Tasks
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

                                <div className="row  bg-white p-2 m-1 border rounded"  >
                                    <div className="col-12 py-2 div_scroll" >

                                        {/* <div className="table-responsive">
                                            <table className="table table-striped table-class" id="table-id">
                                                <tr className="th_border" >
                                                    <th>Sr. No</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                                <tr className="border my-4">
                                                    <td>1</td>
                                                    <td>Akash Shirke</td>
                                                    <td>designer.daccess@gmail.com</td>
                                                    <td>9975917840</td>
                                                    <td>Oct 26, 2015</td>
                                                    <td>
                                                        <span
                                                            onClick={() => {
                                                                handleAdd()
                                                            }}
                                                            className="update ">
                                                            <i class="fa-solid fa-pen text-success cursor-pointer"></i>
                                                        </span>

                                                        <span
                                                            onClick={() => {
                                                                setdeletePopUpShow(true)
                                                            }}
                                                            className="update">
                                                            <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
                                                        </span>
                                                    </td>
                                                </tr>



                                            </table>
                                        </div> */}


                                        <div >
                                            <ViewSwitcher
                                                onViewModeChange={(viewMode) => setView(viewMode)}
                                                onViewListChange={setIsChecked}
                                                isChecked={isChecked}
                                            />
                                            <Gantt
                                                tasks={tasks}
                                                viewMode={view}
                                                // onDateChange={handleTaskChange}
                                                onDelete={handleTaskDelete}
                                                onProgressChange={handleProgressChange}
                                                onDoubleClick={handleDblClick}
                                                onSelect={handleSelect}
                                                onExpanderClick={handleExpanderClick}
                                                listCellWidth={isChecked ? "155px" : ""}
                                                columnWidth={columnWidth}
                                                barBackgroundColor="blue"
                                                rowHeight={40}
                                                fontSize={12}
                                            />
                                            {/* <h3>Gantt With Limited Height</h3>
                                            <Gantt
                                                tasks={tasks}
                                                viewMode={view}
                                                onDateChange={handleTaskChange}
                                                onDelete={handleTaskDelete}
                                                onProgressChange={handleProgressChange}
                                                onDoubleClick={handleDblClick}
                                                onSelect={handleSelect}
                                                onExpanderClick={handleExpanderClick}
                                                listCellWidth={isChecked ? "155px" : ""}
                                                ganttHeight={300}
                                                columnWidth={columnWidth}
                                            /> */}
                                        </div>


                                    </div>

                                </div>







                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )}


            {/* {deletePopUpShow ?
                <DeletePopUP
                    message={"Are you sure! Do you want to Delete ?"}
                    cancelBtnCallBack={handelDeleteClosePopUpClick}
                    // confirmBtnCallBack={handelDeleteClick}
                    heading="Delete"
                /> : <></>
            }


            {AddPopUpShow ?
                <AddProjectPopup
                    message="Create New Employee"
                    handleAdd={handleAdd}
                // heading="Forward"
                // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            } */}

        </>
    )
}