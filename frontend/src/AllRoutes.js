import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { useContext } from "react";

import MainDashboard from "./Components/Private/MainDashboard/MainDashboard";
import { UploadComplaintGrid } from "./Components/Private/MainDashboard/SocialMediaAndOfficerVisit/UploadComplaintGrid/UploadComplaintGrid";
import { LogIn } from "./Components/Public/Login";
import { EmployeeMasterGrid } from "./Components/Private/MainDashboard/EmployeeMaster/EmployeeMasterGrid";
import { CustomerMasterGrid } from "./Components/Private/MainDashboard/CustomerMaster/CustomerMasterGrid";
import { ProjectMasterGrid } from "./Components/Private/MainDashboard/ProjectMaster/ProjectMasterGrid";
import { TaskMasterGrid } from "./Components/Private/MainDashboard/TaskMaster/TaskMasterGrid";
import { DepartmentMasterGrid } from "./Components/Private/MainDashboard/DepartmentMaster/DepartmentMasterGrid";
import { DesignationMasterGird } from "./Components/Private/MainDashboard/DesignationMaster/DesignationMasterGrid";
import { TaskSheetMaster } from "./Components/Private/MainDashboard/TaskSheetMaster/TaskSheetMaster";
import { ForgotPassword } from "./Components/Public/ForgotPassword";
import { ChangePassword } from "./Components/Public/ChangePassword";
import { Mailsentsuccessfully } from "./Components/Public/Mailsentsuccessfully";
import { ForgotPasswordConfirm } from "./Components/Public/ForgotPasswordConfirm";
import AdminMainDashboard from "./Components/Private/AdminDashboard/AdminMainDashboard";
import EmployeeMainDashboard from "./Components/Private/EmployeeDashboard/EmployeeMainDashboard";
import { EmployeeTaskGrid } from "./Components/Private/EmployeeDashboard/EmployeeTaskGrid/EmployeeTaskGrid";
import { EmployeeProjectGrid } from "./Components/Private/EmployeeDashboard/EmployeeProjectGrid/EmployeeProjectGrid";
import { EmployeeTaskChart } from "./Components/Private/EmployeeDashboard/EmployeeProjectGrid/EmployeeTaskChart";
import { EmployeeCustomerMasterGrid } from "./Components/Private/EmployeeDashboard/EmployeeCustomerMasterGrid/EmployeeCustomerMasterGrid";
import { EmployeeDashboardEpmloyeeGrid } from "./Components/Private/EmployeeDashboard/EmployeeDashboardEpmloyeeGrid/EmployeeDashboardEpmloyeeGrid";

import { UserContext } from "./context/UserContext";
import { AdminmasterGrid } from "./Components/Private/AdminDashboard/AdminmasterGrid/AdminmasterGrid";
import { AdminCompanyMasterGrid } from "./Components/Private/AdminDashboard/AdminCompanyMasterGrid/AdminCompanyMasterGrid";
import { UserProfile } from "./Components/Private/MainDashboard/UserProfile";
import NotFound from "./Components/NotFound";
import { TicketMasterGrid } from "./Components/Private/MainDashboard/TicketMaster/TicketMaserGrid";
import { EmployeeTicketMasterGrid } from "./Components/Private/EmployeeDashboard/EmployeeTicketMasterGrid/EmployeeTicketGrid";
import Feedback  from "./Components/Public/Feedback";
import { ServiceMasterGrid } from "./Components/Private/MainDashboard/ServiceMaster/ServiceMasterGrid";
import { EmployeeServiceMasterGrid } from "./Components/Private/EmployeeDashboard/EmployeeServiceGrid/EmployeeServiceMasterGrid";
import { EmployeeMyServiceMasterGrid } from "./Components/Private/EmployeeDashboard/EmployeeMyServiceMasterGrid/EmployeeMyServiceMasterGrid";

const AllRoutes = () => {

const {user} = useContext(UserContext);

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LogIn />} />
                    <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route exact path="/ChangePassword" element={<ChangePassword />} />
                    <Route exact path="/Mailsentsuccessfully" element={<Mailsentsuccessfully />} />
                    <Route exact path="/api/reset-password/:id/:token" element={<ForgotPasswordConfirm />} />
                    <Route exact path="UserProfile" element={<UserProfile />} />
                    <Route exact path="/feedback/:id" element={<Feedback />} />
                    


                 {/* Company */}

                 {user && user.user==='company'?(
                    <>
                        <Route exact path="/MainDashboard" element={<MainDashboard />} />
                        <Route exact path="/EmployeeMasterGrid" element={<EmployeeMasterGrid />} />
                        <Route exact path="/CustomerMasterGrid" element={<CustomerMasterGrid />} />
                        <Route exact path="/ProjectMasterGrid" element={<ProjectMasterGrid />} />
                        <Route exact path="/DepartmentMasterGrid" element={<DepartmentMasterGrid />} />
                        <Route exact path="/DesignationMasterGird" element={<DesignationMasterGird />} /> 
                        <Route exact path="/TaskMasterGrid" element={<TaskMasterGrid />} />
                        <Route exact path="/:id" element={<TaskSheetMaster />} />
                        <Route exact path="/UploadComplaintGrid" element={<UploadComplaintGrid />} />
                        <Route exact path="/TicketMasterGrid" element={<TicketMasterGrid />} />
                        <Route exact path="/ServiceMasterGrid" element={<ServiceMasterGrid />} />

                    </>
                ):null}


                    {/* Admin  */}
                    {user && user.user==='admin'?(
                        <>
                        <Route exact path="/AdminMainDashboard" element={<AdminMainDashboard />} />
                        <Route exact path="/AdminCompanyMasterGrid" element={<AdminCompanyMasterGrid />} />
                        <Route exact path="/AdminmasterGrid" element={<AdminmasterGrid />} />

                    </>
                    ):null}

                    {/* Employee  */}
                    {user && user.user==='employee'?(
                        <>
                            <Route exact path="/EmployeeMainDashboard" element={<EmployeeMainDashboard />} />
                            <Route exact path="/EmployeeTaskGrid" element={<EmployeeTaskGrid />} />
                            <Route exact path="/EmployeeProjectGrid" element={<EmployeeProjectGrid />} />
                            <Route exact path="/:id" element={<EmployeeTaskChart />} />
                            <Route exact path="/EmployeeCustomerMasterGrid" element={<EmployeeCustomerMasterGrid />} />
                            <Route exact path="/EmployeeDashboardEpmloyeeGrid" element={<EmployeeDashboardEpmloyeeGrid />} />
                            <Route exact path="/EmployeeTicketMasterGrid" element={<EmployeeTicketMasterGrid />} />
                            <Route exact path="/EmployeeServiceMasterGrid" element={<EmployeeServiceMasterGrid />} />
                            <Route exact path="/EmployeeMyServiceMasterGrid" element={<EmployeeMyServiceMasterGrid />} />
                        </>
                    ):null}

                    <Route path="*" element={<NotFound/>} />

                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes;