import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import MainDashboard from "./Components/Private/MainDashboard/MainDashboard";
import { UploadComplaintGrid } from "./Components/Private/MainDashboard/SocialMediaAndOfficerVisit/UploadComplaintGrid/UploadComplaintGrid";
import { LogIn } from "./Components/Public/Login";
import { EmployeeMasterGrid } from "./Components/Private/MainDashboard/EmployeeMaster/EmployeeMasterGrid";
import { CustomerMasterGrid } from "./Components/Private/MainDashboard/CustomerMaster/CustomerMasterGrid";
import { ProjectMasterGrid } from "./Components/Private/MainDashboard/ProjectMaster/ProjectMasterGrid";
import { TaskMasterChart } from "./Components/Private/MainDashboard/TaskMaster/TaskMasterChart";
import { DepartmentMasterGrid } from "./Components/Private/MainDashboard/DepartmentMaster/DepartmentMasterGrid";
import { RoleMasterGrid } from "./Components/Private/MainDashboard/RoleMaster/RoleMasterGrid";



const AllRoutes = () => {



    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LogIn />} />

                    <Route exact path="/MainDashboard" element={<MainDashboard />} />

                 {/* master */}

                    <Route exact path="/EmployeeMasterGrid" element={<EmployeeMasterGrid />} />
                    <Route exact path="/CustomerMasterGrid" element={<CustomerMasterGrid />} />
                    <Route exact path="/ProjectMasterGrid" element={<ProjectMasterGrid />} />
                    <Route exact path="/DepartmentMasterGrid" element={<DepartmentMasterGrid />} />
                    <Route exact path="/RoleMasterGrid" element={<RoleMasterGrid />} /> 
                    <Route exact path="/TaskMasterChart" element={<TaskMasterChart />} />

                    <Route exact path="/UploadComplaintGrid" element={<UploadComplaintGrid />} />
                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes;