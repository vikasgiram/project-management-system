import { useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { ViewMode, Gantt } from "gantt-task-react";
import { getStartEndDateForProject, initTasks } from "../../../Helper/GanttChartHelper";
import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewSwitcher } from "../../../Helper/ViewSwitcher";
import { getProject } from "../../../../hooks//useProjects";
import { HashLoader } from "react-spinners";
import { default as ReactSelect, components } from "react-select";
import { useParams } from "react-router-dom";



const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};




export const TaskSheetMaster = () => {

    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false)
    const [deletePopUpShow, setdeletePopUpShow] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow)
    }


    const handelDeleteClosePopUpClick = () => {
        setdeletePopUpShow(false)
    }


    const {id}=useParams();

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
                console.log(id,"project id");
                
                const response = await getProject(id); 

                const transformedTasks = transformProjectToTasks(response); // Transform the data
                console.log(transformedTasks);
                setTasks(transformedTasks);
                // console.log("Transformed tasks: ", response);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            }
        };
        fetchData();
    }, [id]);


    //     // this is my code from before
    // const transformProjectToTasks = (project) => {
    //     const projectTask = {
    //       id: project._id,
    //       name: project.name,
    //       start: new Date(project.startDate),
    //       end: new Date(project.endDate),
    //       progress: project.completeLevel || 0,
    //       type: "project",
    //       hideChildren: false,
    //     };
    // }

    const transformProjectToTasks = (projects) => {
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

    // useEffect(() => {
    //     if (id) {
    //       const transformedTasks = transformProjectToTasks(id);
    //       setTasks(transformedTasks);
    //       setLoading(false);
    //     }
    //   }, [id]);





    const [state, setState] = useState({ optionSelected: null });

    const handleChange = (selected) => {
        setState({
            optionSelected: selected
        });
    };

    const Values = [
        { value: "Select All", label: "Select All" },
        { value: "Akash Shirke", label: "Akash Shirke" },
        { value: "b", label: "B" },
        { value: "c", label: "C" },
        { value: "d", label: "D" },
        { value: "e", label: "E" },
        { value: "f", label: "F" },
        { value: "g", label: "G" },
        { value: "h", label: "H" },
        { value: "i", label: "I" },
        { value: "j", label: "J" }
    ];

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
                        <Sidebar isopen={isopen} active="TaskSheetMaster" id={id} />
                        
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                            Tasks
                                        </h5>
                                    </div>

                                    {/* <div className="col-12 col-lg-6  ms-auto text-end">
                                        <button
                                            onClick={() => {
                                                handleAdd()
                                            }}
                                            type="button"
                                            className="btn adbtn btn-dark"> <i className="fa-solid fa-plus"></i> Add</button>


                                    </div> */}

                                </div>

                                <div className="row  bg-white p-2 m-1 border rounded"  >
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Project Name</label>
                                                <input type="text" className="form-control rounded-0" id="ProjectName" aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label label_text">Task Name</label>
                                                <select className="form-select rounded-0" aria-label="Default select example">
                                                    <option value="" disabled >-- Select Task Name --</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Start Date</label>
                                                <input type="date" className="form-control rounded-0" id="ProjectName" aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">End Date</label>
                                                <input type="date" className="form-control rounded-0" id="ProjectName" aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Department</label>
                                                <input type="text" className="form-control rounded-0" id="ProjectName" aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Employee Name</label>
                                                <ReactSelect
                                                    options={Values}
                                                    isMulti
                                                    closeMenuOnSelect={false}
                                                    hideSelectedOptions={false}
                                                    components={{
                                                        Option
                                                    }}
                                                    onChange={handleChange}
                                                    value={state.optionSelected}
                                                // Hide dropdown list  when select any item
                                                // closeMenuOnSelect={true}

                                                //Selected Item Remove in dropdown list
                                                // hideSelectedOptions={true}
                                                />
                                            </div>

                                        </form>

                                    </div>


                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Department</label>
                                                <textarea
                                                    className="textarea_edit col-12"
                                                    id=""
                                                    name=""
                                                    placeholder=""
                                                    rows="1"
                                                ></textarea>
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-lg-3  pt-3 mt-3 ">
                                        <button
                                            // onClick={() => {
                                            //     handleAdd()
                                            // }}
                                            type="button"
                                            className="btn adbtn btn-success px-4 me-lg-4 mx-auto"> <i className="fa-solid fa-plus"></i> Add</button>
                                                  <button
                                            // onClick={() => {
                                            //     handleAdd()
                                            // }}
                                            type="button"
                                            className="btn adbtn btn-danger  px-4 mx-auto"> <i class="fa-solid fa-xmark"></i> Clear</button>


                                    </div>
                                  



                                    <div className="col-12 py-2 div_scroll" >
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