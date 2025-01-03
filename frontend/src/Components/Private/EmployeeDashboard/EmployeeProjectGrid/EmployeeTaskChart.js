import React,{ useState,useEffect, useContext } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { default as ReactSelect, components } from "react-select";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert'; 
import { getStartEndDateForProject, initTasks } from "../../../Helper/GanttChartHelper";
import { createTaskSheet, deleteTaskSheet, getTaskSheet } from "../../../../hooks/useTaskSheet";
import { getTask } from "../../../../hooks/useTask";
import { getDepartment } from "../../../../hooks/useDepartment";
import { getEmployee } from "../../../../hooks/useEmployees";
import { EmployeeHeader } from "../EmployeeHeader";
import { EmployeeSidebar } from "../EmployeeSidebar";
import { ViewSwitcher } from "../../../Helper/ViewSwitcher";
import { UserContext } from "../../../../context/UserContext";
import { formatDateforEditAction } from "../../../../utils/formatDate";
import { getAllActions } from "../../../../hooks/useAction";


// const Option = (props) => {
//     return (
//         <div>
//             <components.Option {...props}>
//                 <input
//                     type="checkbox"
//                     checked={props.isSelected}
//                     onChange={() => null}
//                 />{" "}
//                 <label>{props.label}</label>
//             </components.Option>
//         </div>
//     );
// };




export const EmployeeTaskChart = () => {

    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const [view, setView] = React.useState(ViewMode.Day);
    const [tasks, setTasks] = React.useState(initTasks());
    const [isChecked, setIsChecked] = React.useState(true);
    const [showAction, setShowAction] = useState(false);
    const [forTask, setForTask] = useState([]);



    const [employees, setEmployees] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [remark, setRemark] = useState("");
    const [taskDropDown, setTaskDropDown] = useState([]);
    const [departmentName, setDepartmentName] = useState([]);
    const [department, setDepartment] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [renderPage, setRenderPage] = useState(false);


    let columnWidth = 90;
    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleAdd=(event)=>{
        event.preventDefault();
        setRenderPage(!renderPage)
        handleTaskAdd();
    }
    const forActionShow = async (id) => {
        const actions = await getAllActions(id);
        setForTask(actions);
        setShowAction(true);
      }
    const handleTaskChange = (task) => {
        // console.log("On date change Id:" + task.id);
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
        if(task.type==='task'){
            confirmAlert({
                title: 'Confirm to Delete',
                message: `Are you sure to delete ` + task.name + ` ?`,
                buttons: [
                  {
                    label: 'Yes',
                    onClick: async () => {
                      await deleteTaskSheet(task.id);
                      setTasks(tasks.filter((t) => t.id !== task.id));
                    }
                  },
                  {
                    label: 'No',
                    onClick: () => {
                      return
                    }
                  }
                ]
              });
        }
    };
    const handleProgressChange = async (task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };
    const handleDblClick = (task) => {
        // alert("On Double Click event Id:" + task.type);
        if(task.type==='task')
        forActionShow(task.id);
    
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

                const response = await getTaskSheet(id);
                // console.log(response.task[0].project.name);
                
                setProjectName(response.task[0].project);
                
                const transformedTasks = transformProjectToTasks(response); // Transform the data

                setTasks(transformedTasks);
                // console.log("Transformed tasks: ", response);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            }
        };
        fetchData();
    }, [id,renderPage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getTask();
                if (data) {
                    setTaskDropDown(data.task || []);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };
        if(user.permissions.includes('viewTask'))
        fetchData();
    }, [])
    // console.log(taskName,"task n ");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDepartment();
                // console.log(data, "department");

                if (data) {
                    setDepartmentName(data.department || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if(user.permissions.includes('viewDepartment'))
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("department Id:" + department);
                if (!department) {
                    return;
                }
                const data = await getEmployee(department);
                if (data) {

                    const formattedData = data.map(employee => ({
                        value: employee._id,
                        label: employee.name
                    }));


                    setEmployeeOptions(formattedData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if(user.permissions.includes('viewEmployee'))
        fetchData();
    }, [department]);

    // console.log(employees,"employee");


    const transformProjectToTasks = (projectData) => {
        // Extract project information from the task array
        const project = projectData.task[0].project;
        // Create a project task entry
        const projectTask = {
            id: project._id,
            name: project.name,
            start: new Date(project.startDate),
            end: new Date(project.endDate),
            progress: project.completeLevel || 0,  // Set default to 0 if undefined
            type: "project",
            hideChildren: false,
        };
        
        // Map the tasks within the project
        const taskList = projectData.task.map((task) => ({
            id: task._id,
            name: task.taskName.name, // Access taskName object
            start: new Date(task.startDate),
            end: new Date(task.endDate),
            project: project._id,  // Associate with project ID
            type: "task",
            progress: task.taskLevel || 0,  // Set default to 0 if undefined
        }));
        
        // console.log("Task list"+taskList);
        // Return an array containing the project task followed by its task list
        return [projectTask, ...taskList];
    };

    const handleTaskAdd = async () => {


        const data = {
            project: id,
            employees,
            taskName,
            startDate,
            endDate,
            remark
           
        };
        if (
            !employees ||
            !taskName ||
            !startDate ||
            !endDate ||
            !remark 
           
        ) {
            return toast.error("Please fill all fields");
        }
        if(startDate>endDate){
            return toast.error("Start date should be less than end date");
        }


        await createTaskSheet(data);
        toast.success("Task added successfully");
        clearForm();
    };

    const clearForm = () => {
        setTaskName("");
        setStartDate("");
        setEndDate("");
        setRemark("");
        setEmployees([]);
        setDepartment(""); 
    };


    return (
        <>      
             {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )}
            <div className="container-scroller">
                <div className="row background_main_all">
                    <form onSubmit={handleAdd}>
                    <EmployeeHeader
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <EmployeeSidebar isopen={isopen} active="EmployeeTaskChart" id={id} />

                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">

                                <div className="row px-2 py-1   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white py-2">
                                           Project Name: {projectName && projectName.name+" - "+ projectName.custId.custName}
                                        </h5>
                                    </div>
                                </div>

                                <div className="row  bg-white p-2 m-1 border rounded"  >
                                    {user.permissions.includes('createTaskSheet')?(<>
                                        <div className="col-12 col-md-6 col-lg-3">
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
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-3">
                                                <div className="mb-3">
                                                    <label for="startDate" className="form-label label_text">Start Date</label>
                                                    <input type="date" className="form-control rounded-0" id="startDate"
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        value={startDate}
                                                        aria-describedby="emailHelp" />
                                                </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-3">
                                                <div className="mb-3">
                                                    <label for="endDate" className="form-label label_text">End Date</label>
                                                    <input type="date" className="form-control rounded-0" id="endDate"
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        value={endDate}
                                                        aria-describedby="emailHelp" />
                                                </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-3">
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
                                        </div>

                                        

                                        <div className="col-12 col-md-6 col-lg-3">
                                                <div className="mb-3">
                                                    <label for="ProjectName" className="form-label label_text">Employee Name</label>
                                                    <ReactSelect
                                                        options={employeeOptions}  // Employee options (e.g., from API)
                                                        isMulti                    // Allows selecting multiple employees
                                                        closeMenuOnSelect={false}   // Keeps menu open after selecting an item
                                                        hideSelectedOptions={false} // Show selected options in the dropdown
                                                        onChange={(selectedOption) => {
                                                            // Map over the selected options to extract only the IDs
                                                            const employeeIds = selectedOption ? selectedOption.map(option => option.value) : [];
                                                            setEmployees(employeeIds);  // Set employees state to array of IDs
                                                        }}
                                                        value={employees.map(id => employeeOptions.find(option => option.value === id))} // Keep selected values synced
                                                    />
                                                </div>
                                        </div>


                                        <div className="col-12 col-md-6 col-lg-3">
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
                                        </div>

                                        <div className="col-12 col-lg-3  pt-3 mt-3 ">
                                            <button
                                                type="submit"
                                                className="btn adbtn btn-success px-4 me-lg-4 mx-auto"> <i className="fa-solid fa-plus"></i> Add</button>
                                            <button
                                                onClick={() => {
                                                    clearForm()
                                                }}
                                                type="button"
                                                className="btn adbtn btn-danger  px-4 mx-auto"> <i class="fa-solid fa-xmark"></i> Clear</button>


                                        </div>

                                    </>):('')}


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
                                      
                                        </div>
                                    </div>
                                    {showAction ? (<div className="col-12 col-lg-12  mx-auto  rounded ">

<div className="row  bg-white ms-lg-1 pt-5 rounded p-lg-3">


  <div className="col-12 col-lg-6">
    <h6 className="mb-0 fw-bold mb-3 text-warning-dark">Task Name </h6>
  </div>


  <div className="col-12 col-lg-6 text-end">
    <span
      onClick={() => setShowAction(false)}
      type="button"
      className="close  px-3"
    // style={{ marginLeft: "1150px" }}
    >
      <span aria-hidden="true">&times;</span>
    </span>
  </div>


  <div className="col-12">
    <div className="shadow_custom ">
      <div className="table-responsive">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th className="text-center">Action</th>
              <th className="text-center">Action By</th>
              <th className="text-center">Start Time </th>
              <th className="text-center">End Time</th>
              <th className="text-center">Completion</th>
            </tr>
          </thead>

          {forTask && forTask.length !== 0 ? (


            <tbody>
              {forTask && forTask.map((action) => (
                <tr className="text-center" >
                  <td>{action.action}</td>
                  <td>{action.actionBy.name}</td>
                  <td>{formatDateforEditAction(action.startTime)}</td>
                  <td>{formatDateforEditAction(action.endTime)}</td>
                  <td className="text-center">
        <div className="d-flex align-items-center"
          style={{ justifyContent: "center" }}
        >
        {action.complated}%
            <span className="progress"
                  style={{ marginLeft: "10px" }}
            >
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                aria-valuenow={action.complated}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${action.complated}%`,
                }}
              ></div>
            </span>
          
        </div>
      </td>
                </tr>
              ))}

            </tbody>
          ) : (<h6 style={{ marginLeft: "450px" }}>No Action performed....</h6>)}
        </table>
      </div>
    </div>
  </div>
</div>

</div>) : (<></>)}


                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}