import {
    BrowserRouter as Router,
    Route,
    Routes,
    // useLocation,
    // Navigate,
    // Outlet
} from "react-router-dom";
import MainDashboard from "./Components/Private/MainDashboard/MainDashboard";
import { UploadComplaintGrid } from "./Components/Private/MainDashboard/SocialMediaAndOfficerVisit/UploadComplaintGrid/UploadComplaintGrid";
import { LogIn } from "./Components/Public/Login";
import { EmployeeMasterGrid } from "./Components/Private/MainDashboard/EmployeeMaster/EmployeeMasterGrid";
import { CustomerMasterGrid } from "./Components/Private/MainDashboard/CustomerMaster/CustomerMasterGrid";
import { ProjectMasterGrid } from "./Components/Private/MainDashboard/ProjectMaster/ProjectMasterGrid";


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




















                    <Route exact path="/UploadComplaintGrid" element={<UploadComplaintGrid />} />





                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes;