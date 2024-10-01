import React, { useState, useEffect } from "react";
import { getCustomers } from "../../../../../hooks/useCustomer";
import { getProjects, updateProject } from "../../../../../hooks/useProjects";

import toast from "react-hot-toast";
import { Gantt, ViewMode } from "gantt-task-react";
import {
  getStartEndDateForProject,
  initTasks,
} from "../../../../Helper/GanttChartHelper";
import { ViewSwitcher } from "../../../../Helper/ViewSwitcher";

const GaintchartPoup = ({ handleDetails, selectedProject }) => {
  // const [customers, setCustomers] = useState([]);

  // const [projects, setProjects] = useState(selectedProject);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const data = await getCustomers();
  //         // console.log(data);
  //         if (data) {
  //             setCustomers(data.customers || []);
  //             // console.log(employees,"data from useState");
  //         }
  //     };

  //     fetchData();
  // }, []);

  // const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setProjects((prevProjects) => ({ ...prevProjects, [name]: value }));
  // };

  // const handleProjectUpdate = async () => {
  //     try {
  //         await updateProject(projects);
  //         handleUpdate();
  //     } catch (error) {
  //         toast.error(error);
  //     }
  // };

  const [loading, setLoading] = useState(true);
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
    <>
      <div
        className="modal fade show"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#00000090",
        }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content p-3">
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Chart
              </h5>
              <button
                onClick={() => handleDetails()}
                type="button"
                className="close px-3"
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
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
    </>
  );
};

export default GaintchartPoup;
