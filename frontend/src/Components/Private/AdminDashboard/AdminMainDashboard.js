import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";




function AdminMainDashboard() {
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
                    <AdminHeader
                        // Language={Language}
                        // setLanguage={setLanguage}
                        toggle={toggle} isopen={isopen}
                    />
                    <div className="container-fluid page-body-wrapper">
                        <AdminSidebar isopen={isopen} active="dashboard" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0">

                                <h1 className="text-white">Admin Dash</h1>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </>
    );
}

export default AdminMainDashboard;
