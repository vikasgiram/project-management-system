import { useState, useEffect } from "react";
import { EmployeeHeader } from "./EmployeeHeader";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { EmployeeDasboardCards } from "./EmployeeDasboardCards";
import { AssignInproccessSection } from "./AssignInproccessSection";
import { PerFormanceChart } from "./PerFormanceChart";




function EmployeeMainDashboard() {
    const [isopen, setIsOpen] = useState(false);






    // console.log("dashboard",dashboardData);

    const toggle = () => {
        setIsOpen(!isopen);
    };

    // const [Language, setLanguage] = useState({
    //   DDL: [],
    //   ID: 0,
    //   Label: sessionStorage.getItem('LanguageChange')
    // })

    return (
        <>
            {/* {loading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )} */}

            <div className="container-scroller">
                <div className="row background_main_all">
                    <EmployeeHeader
                        // Language={Language}
                        // setLanguage={setLanguage}
                        toggle={toggle} isopen={isopen}
                    />
                    <div className="container-fluid page-body-wrapper">
                        <EmployeeSidebar isopen={isopen} active="dashboard" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0">

                                <div className="row p-2   ">
                                    <div className="col-12 col-lg-6">
                                        <h5 className="text-white fw-bold py-2">
                                            Dashboard
                                        </h5>
                                    </div>

                                    <div className="col-12 col-lg-6  ms-auto text-end">
                                        <span>
                                            <img
                                                src="static/assets/img/satisfaction.png"
                                                className="customer_img"
                                                alt="logo"
                                            />
                                            <span className="Customer_fs ps-3 text-white">Avg Score |
                                                <span className="Customer_count ms-2">44%</span></span>
                                        </span>


                                    </div>

                                </div>
                                <EmployeeDasboardCards />
                                <AssignInproccessSection />
                                <PerFormanceChart />


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </>
    );
}

export default EmployeeMainDashboard;