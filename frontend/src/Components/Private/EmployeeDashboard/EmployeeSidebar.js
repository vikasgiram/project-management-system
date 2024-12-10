import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";


export const EmployeeSidebar = ({ isopen, active, subMenu }) => {
    const [Open, setOpen] = useState(false)
	const {user} = useContext(UserContext);

    // const SidebarHideShow = () => {
    //     if ((body.hasClass('sidebar-icon-only'))) {
    //         body.toggleClass('sidebar-icon-only');
    //     }
    //     // else {
    //     //     body.toggleClass('sidebar-icon-only');
    //     // }
    // }

    // const handelOnCardClick = () => {

    //     body.toggleClass('sidebar-icon-only');
    // }

    return (
        <div
            className={
                isopen
                    ? "left-slidebar dark-shadow sidebar-block"
                    : "left-slidebar dark-shadow sidebar-none"
            }
            style={{ width: isopen ? "210px" : "97px" }}
        >
            <div className="navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <span className="navbar-brand brand-logo">
                    <img
                        style={{ width: isopen ? "100%" : "100%" }}
                        src={user.logo || "static/assets/img/nav/DACCESS.png"}
                        className="logo"
                        alt="logo"
                    />
                </span>

            </div>
            <nav
                className="sidebar  sidebar-offcanvas" id="sidebar"
                style={{ maxHeight: isopen ? "" : " calc(100vh - 150px)" }}
            >
                <ul className="nav d-block">

                    <li
                    title="Dashboard"
                        className={Open || active === "dashboard" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/EmployeeMainDashboard' className="nav-link ">
                            <img src="static/assets/img/nav/dashboard.png" className="menu-icon" />
                            <span
                                className="menu-title"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Dashboard
                            </span>
                        </Link>
                    </li>

                    <li
                    title="My Projects"
                        className={Open || active === "EmployeeTaskGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/EmployeeTaskGrid' className="nav-link ">
                            <i class="fa-solid fa-bars-progress ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                My Projects
                            </span>
                        </Link>
                    </li>

                    {user.permissions.includes('viewProject')?(
                        <li
                        title="All Projects"
                        className={Open || active === "EmployeeProjectGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/EmployeeProjectGrid' className="nav-link ">
                            <i class="fa-solid fa-list-check ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                All Projects
                            </span>
                        </Link>
                    </li>):
                        ('')
                    }


                    {user.permissions.includes('viewCustomer')?(
                        <li
                        title="Customer"
                        className={Open || active === "EmployeeCustomerMasterGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/EmployeeCustomerMasterGrid' className="nav-link ">
                            <i class="fa-solid fa-people-line ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Customer
                            </span>
                        </Link>
                    </li>):('')}

                    {user.permissions.includes('viewEmployee')?(
                        <li
                        title="Employee"
                        className={Open || active === "EmployeeDashboardEpmloyeeGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/EmployeeDashboardEpmloyeeGrid' className="nav-link ">
                            {/* <i className="fa-brands fa-usps ps-3 side_icon_fs"></i> */}
                            <i class="fa-solid fa-user-group ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Employee
                            </span>
                        </Link>
                    </li>):('')}


                    {/* <li
                        className={Open || active === "DesignationMasterGird" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='' className="nav-link ">
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>
                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                My Task
                            </span>
                        </Link>
                    </li> */}



                </ul>
            </nav>
        </div>
    );
}
