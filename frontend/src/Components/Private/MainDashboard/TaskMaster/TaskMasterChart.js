import React, { useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { useEffect } from "react";

import "gantt-task-react/dist/index.css";

import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import {
    getStartEndDateForProject,
    initTasks,
} from "../../../Helper/GanttChartHelper";
import { ViewSwitcher } from "../../../Helper/ViewSwitcher";

import {getProjects} from "../../../../hooks/useProjects";

export const TaskMasterChart = () => {
    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    const [AddPopUpShow, setAddPopUpShow] = useState(false);
    const [deletePopUpShow, setdeletePopUpShow] = useState(false);

    const handleAdd = () => {
        setAddPopUpShow(!AddPopUpShow);
    };


    const [data, setData] = useState([]);
    const [view, setView] = React.useState(ViewMode.Day);
    const [tasks, setTasks] = React.useState(transformData(data));
    const [isChecked, setIsChecked] = React.useState(true);
    let columnWidth = 90;

    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }
    // const handleTaskChange = (task) => {
    //     console.log("On date change Id:" + task.id);
    //     let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    //     if (task.project) {
    //         const [start, end] = getStartEndDateForProject(newTasks, task.project);
    //         const project =
    //             newTasks[newTasks.findIndex((t) => t.id === task.project)];
    //         if (project.start.getTime() !== start.getTime() ||project.end.getTime() !== end.getTime()) {
    //             const changedProject = { ...project, start, end };
    //             newTasks = newTasks.map((t) =>
    //                 t.id === task.project ? changedProject : t
    //             );
    //         }
    //     }
    //     setTasks(newTasks);
    // };
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

    function transformData(data) {
        const result = [];
        console.log("data in the function "+data);
        if (data && data.projects) {
          data.projects.forEach((project) => {
            if (project) {
              const projectObject = {
                start: new Date(project.startDate),
                end: new Date(project.endDate),
                name: project.name,
                id: project._id,
                type: "project",
                hideChildren: false,
              };
              result.push(projectObject);
      
              if (project.tasks) {
                project.tasks.forEach((task) => {
                  if (task) {
                    const taskObject = {
                      start: new Date(task.startDate),
                      end: new Date(task.endDate),
                      name: task.taskName,
                      id: task._id,
                      type: "task",
                      project: project._id,
                    };
                    result.push(taskObject);
                  }
                });
              }
            }
          });
        }
      
        return result;
      }

      setTasks(transformData(data));

    //   {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    //     name: "Project Name ",
    //     id: "ProjectSample",
    //     // progress: 25,
    //     type: "project",
    //     hideChildren: false,
        
    //   },
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await getProjects();
            console.log("data in the useEffect"+res);
            setData(res|| []);
        };
        fetchTasks();

      }, []);

    return (
        <>
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="TaskMasterChart" />
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
                                        <h5 className="text-white py-2">Tasks</h5>
                                    </div>

                                    <div className="col-12 col-lg-6  ms-auto text-end">
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

                                <div className="row  bg-white p-2 m-1 border rounded">
                                    <div className="col-12 py-2 div_scroll">
                                        <div>
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
        </>
    );
};
