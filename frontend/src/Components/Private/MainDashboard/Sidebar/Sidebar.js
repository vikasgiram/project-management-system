import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery'
import { useTranslation } from "react-i18next";


export const Sidebar = ({ isopen, active, subMenu }) => {
    // const [toggleactive, settoggleactive] = useState("dashboard")
    const [ReportOpen, setReportOpen] = useState(false)
    const [Open, setOpen] = useState(false)


    const [AdminReportOpen, setAdminReportOpen] = useState(false)


    var body = $('body');

    const SidebarHideShow = () => {
        if ((body.hasClass('sidebar-icon-only'))) {
            body.toggleClass('sidebar-icon-only');
        }
        // else {
        //     body.toggleClass('sidebar-icon-only');
        // }
    }

    const handelOnCardClick = () => {

        body.toggleClass('sidebar-icon-only');
    }

    const { t } = useTranslation()

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
                        src="static/assets/img/nav/DACCESS.png"
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
                        className={Open || active === "dashboard" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/MainDashboard' className="nav-link ">
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
                        className={Open || active === "EmployeeMasterGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/EmployeeMasterGrid' className="nav-link ">
                            {/* <i className="fa-solid fa-circle dic_style  "></i>   */}
                            {/* <i className="fa-solid fa-user-tie ps-3 side_icon_fs" ></i> */}
                            {/* <i className="fa-solid fa-asterisk ps-3 star_fs" ></i> */}
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Employee Master
                            </span>
                        </Link>
                    </li>

                    <li
                        className={Open || active === "CustomerMasterGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/CustomerMasterGrid' className="nav-link ">
                            {/* <i className="fa-solid fa-circle dic_style  "></i>   */}
                            {/* <i className="fa-solid fa-users ps-3 side_icon_fs"></i> */}
                            {/* <i className="fa-solid fa-asterisk ps-3 star_fs" ></i> */}
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Customer Master
                            </span>
                        </Link>
                    </li>


                    <li
                        className={Open || active === "ProjectMasterGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/ProjectMasterGrid' className="nav-link ">
                            {/* <i className="fa-solid fa-circle dic_style  "></i>   */}
                            {/* <i className="fa-solid fa-diagram-project ps-3 side_icon_fs"></i> */}
                            {/* <i className="fa-solid fa-asterisk ps-3 star_fs" ></i> */}
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Project Master
                            </span>
                        </Link>
                    </li>

                    <li
                        className={Open || active === "DepartmentMasterGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/DepartmentMasterGrid' className="nav-link ">
                            {/* <i className="fa-solid fa-circle dic_style  "></i>   */}
                            {/* <i className="fa-regular fa-building ps-3 side_icon_fs"></i> */}
                            {/* <i className="fa-solid fa-asterisk ps-3 star_fs" ></i> */}
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>

                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Department Master
                            </span>
                        </Link>
                    </li>


                    <li
                        className={Open || active === "DesignationMasterGird" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/DesignationMasterGird' className="nav-link ">
                            {/* <i className="fa-solid fa-circle dic_style  "></i>   */}
                            {/* <i className="fa-solid fa-asterisk ps-3 star_fs" ></i> */}
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>
                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Designation Master
                            </span>
                        </Link>
                    </li>


                    <li
                        className={Open || active === "TaskMasterGrid" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/TaskMasterGrid' className="nav-link ">
                            {/* <i class="fa-solid fa-circle dic_style  "></i>   */}
                            <i className="fa-brands fa-usps ps-3 side_icon_fs"></i>
                            <span
                                className="menu-title_m"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Task Master
                            </span>
                        </Link>
                    </li>




                    {/* <li className={ReportOpen || active === "Master" ? " nav-item active" : "nav-item sidebar_item"}>


                        <a
                            className="nav-link cursor-pointer"
                            // data-toggle="collapse"  href="#ui-basic1" aria-expanded="false" aria-controls="ui-basic1"
                            onClick={() => { setReportOpen(!ReportOpen); setAdminReportOpen(false); SidebarHideShow() }}
                        >
                            <img src="static/assets/img/nav/Master.png" className="menu-icon" />

                            <span
                                className="menu-title"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Master <i className=" ps-4 fa-solid fa-caret-down"></i>
                            </span>
                        </a>

                        <div className={ReportOpen ? "collapse show " : "collapse hide"} id="ui-basic1" style={{ height: ReportOpen ? '' : '0px' }}>
                            <ul className="nav flex-column sub-menu ">
                                <Link to='/EmployeeMasterGrid' className="nav-link ">
                                    <span style={{ display: isopen ? "" : "none" }} className="cursor-pointer" >
                                        <li className={subMenu === "DepartmentMaster" ? "nav-item activeli" : "nav-item"}>
                                            <span className={subMenu === "DepartmentMaster" ? "nav-link activeli" : "nav-link"}> <i className="fa-solid fa-circle dic_style ms-3 pe-2"></i> 
                                            Employee Master
                                             </span>
                                        </li>
                                    </span>
                                </Link>

                                <Link to='/CustomerMasterGrid' className="nav-link ">
                                    <span style={{ display: isopen ? "" : "none" }} className="cursor-pointer" >
                                        <li className={subMenu === "RoleMaster" ? "nav-item activeli" : "nav-item"}>
                                            <span className={subMenu === "RoleMaster" ? "nav-link activeli" : "nav-link"}><i className="fa-solid fa-circle dic_style ms-3 pe-2"></i>
                                                Customer Master
                                            </span>
                                        </li>
                                    </span>
                                </Link>


                                <Link to='/ProjectMasterGrid' className="nav-link ">
                                    <span style={{ display: isopen ? "" : "none" }} className="cursor-pointer" >
                                        <li className={subMenu === "DesignationMaster" ? "nav-item activeli" : "nav-item"}>
                                            <span className={subMenu === "DesignationMaster" ? "nav-link activeli" : "nav-link"}><i className="fa-solid fa-circle dic_style ms-3 pe-2"></i>
                                                Project Master
                                            </span>
                                        </li>
                                    </span>
                                </Link>


                                <Link to='/DepartmentMasterGrid' className="nav-link ">
                                    <span style={{ display: isopen ? "" : "none" }} className="cursor-pointer" >
                                        <li className={subMenu === "DesignationMaster" ? "nav-item activeli" : "nav-item"}>
                                            <span className={subMenu === "DesignationMaster" ? "nav-link activeli" : "nav-link"}><i className="fa-solid fa-circle dic_style ms-3 pe-2"></i>
                                                Department Master
                                            </span>
                                        </li>
                                    </span>
                                </Link>

                                <Link to='/DesignationMasterGird' className="nav-link ">
                                    <span style={{ display: isopen ? "" : "none" }} className="cursor-pointer" >
                                        <li className={subMenu === "DesignationMaster" ? "nav-item activeli" : "nav-item"}>
                                            <span className={subMenu === "DesignationMaster" ? "nav-link activeli" : "nav-link"}><i className="fa-solid fa-circle dic_style ms-3 pe-2"></i>
                                                Designation Master
                                            </span>
                                        </li>
                                    </span>
                                </Link>
                                <Link to='/TaskMasterChart' className="nav-link ">
                                    <span style={{ display: isopen ? "" : "none" }} className="cursor-pointer" >
                                        <li className={subMenu === "EmployeeMaster" ? "nav-item activeli" : "nav-item"}>
                                            <span className={subMenu === "EmployeeMaster" ? "nav-link activeli" : "nav-link"}><i className="fa-solid fa-circle dic_style ms-3 pe-2"></i>
                                            Task Master
                                            </span>
                                        </li>
                                    </span>
                                </Link>
                            </ul>
                        </div>
                    </li> */}



                    {/* <li onClick={() => setOpen(!Open)}
                        className={Open || active === "define_department" ? " nav-item active" : "nav-item sidebar_item"}>
                        <Link to='/Master' className="nav-link " >
                            <img src="static/assets/img/nav/report.png" className="menu-icon" />
                            <span
                                className="menu-title"
                                style={{ display: isopen ? "" : "none" }}
                            >
                                Report
                            </span>
                        </Link>
                    </li> */}




                </ul>
            </nav>
        </div>
    );
}
