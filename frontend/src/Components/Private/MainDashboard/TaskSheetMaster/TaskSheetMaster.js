import { useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { ViewMode, Gantt } from "gantt-task-react";
import { getStartEndDateForProject, initTasks } from "../../../Helper/GanttChartHelper";
import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewSwitcher } from "../../../Helper/ViewSwitcher";
import { getProject } from "../../../../hooks//useProjects";
import { createTask } from "../../../../hooks/useTaskSheet";
import { HashLoader } from "react-spinners";
import { default as ReactSelect, components } from "react-select";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getTask } from "../../../../hooks/useTask";
import { getEmployee, getEmployees } from "../../../../hooks/useEmployees";
import { getDepartment } from "../../../../hooks/useDepartment";



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

    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const [view, setView] = React.useState(ViewMode.Day);
    const [tasks, setTasks] = React.useState(initTasks());
    const [isChecked, setIsChecked] = React.useState(true);



    const [employees, setEmployees] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [remark, setRemark] = useState("");
    const [company, setCompany] = useState("");
    const [taskDropDown, setTaskDropDown] = useState([]);
    const [departmentName, setDepartmentName] = useState([]);
    const [department, setDepartment] = useState(null);


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
                console.log(id, "project id");

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTask();
                if (data) {
                    setTaskDropDown(data.task || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    // console.log(taskName,"task n ");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDepartment();
                console.log(data, "department");

                if (data) {
                    setDepartmentName(data.department || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("department Id:" + department);
                if (!department) {
                    return;
                }
                const data = await getEmployee(department);
                if (data) {
                    const formattedData = data.map(employee => ({
                        value: employee.id,
                        label: employee.name
                    }));
                    console.log(formattedData, "employee");

                    setEmployeeOptions(formattedData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [department]);

    // console.log(employees,"employee");


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


    const [state, setState] = useState({ optionSelected: null });

    const handleChange = (selected) => {
        setState({
            optionSelected: selected
        });
    };

    const handleTaskAdd = async () => {


        const data = {
            employees,
            taskName,
            startDate,
            endDate,
            remark,
            company
        };
        if (
            !employees ||
            !taskName ||
            !startDate ||
            !endDate ||
            !remark ||
            !company
        ) {
            return toast.error("Please fill all fields");
        }


        await createTask(data);
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
                                                <label htmlFor="taskName" className="form-label label_text">Task Name</label>
                                                <select className="form-select rounded-0" aria-label="Default select example"
                                                    onChange={(e) => setTaskName(e.target.value)}
                                                    value={taskName}
                                                >
                                                    <option value=""  >-- Select Task Name --</option>
                                                    {
                                                        taskDropDown && taskDropDown.map((task) => (
                                                            <option value={task._id}>{task.name}</option>
                                                        ))
                                                    }

                                                </select>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="startDate" className="form-label label_text">Start Date</label>
                                                <input type="date" className="form-control rounded-0" id="startDate"
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    value={startDate}
                                                    aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="endDate" className="form-label label_text">End Date</label>
                                                <input type="date" className="form-control rounded-0" id="endDate"
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                    value={endDate}
                                                    aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="taskName" className="form-label label_text">Department</label>
                                                <select className="form-select rounded-0" aria-label="Default select example"
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                    value={department}
                                                >
                                                    <option value=""  >-- Select Department Name --</option>
                                                    {
                                                        departmentName && departmentName.map((department) => (
                                                            <option value={department._id}>{department.name}</option>
                                                        ))
                                                    }

                                                </select>
                                            </div>
                                        </form>
                                    </div>

                                    {/* <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="company" className="form-label label_text">Department</label>
                                                <input type="text" className="form-control rounded-0" id="company" 
                                                onChange={(e) => setCompany(e.target.value)}
                                                value={company}
                                                aria-describedby="emailHelp" />
                                            </div>

                                        </form>

                                    </div> */}

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Employee Name</label>
                                                <ReactSelect
                                                    options={employeeOptions} // Use fetched employee data as options
                                                    isMulti
                                                    closeMenuOnSelect={false} // Keep dropdown open for multi-select
                                                    hideSelectedOptions={false} // Show selected items in the list
                                                    onChange={(e) => setEmployees(e.target.value)}
                                                    value={employees} // Bind selected value to state
                                                />
                                            </div>

                                        </form>

                                    </div>


                                    <div className="col-12 col-md-6 col-lg-3">
                                        <form>
                                            <div className="mb-3">
                                                <label for="ProjectName" className="form-label label_text">Remark</label>
                                                <textarea
                                                    onChange={(e) => setRemark(e.target.value)}
                                                    value={remark}
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