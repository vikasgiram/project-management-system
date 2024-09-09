import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { DashboardGroupBtn } from "./MainContent/DashboardGroupBtn";
import { CompanyInfo } from "./MainContent/CompanyInfo";
import { ProjectBar } from "./MainContent/ProjectBar";
import { ProjectDuration } from "./MainContent/ProjectDuration";



function MainDashboard() {
  const [isopen, setIsOpen] = useState(false);
  
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
      {/* <div className="wrapper"> */}
      <div className="container-scroller">
        <div className="row background_main_all">
          <Header
            // Language={Language}
            // setLanguage={setLanguage}

            toggle={toggle} isopen={isopen} />
          <div className="container-fluid page-body-wrapper">
            <Sidebar isopen={isopen} active="dashboard" />
            <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
              <div className="content-wrapper ps-3 ps-md-0">
              
              {/* MainContent */}

                <DashboardGroupBtn />

                {/* CompanyInfo */}
                <CompanyInfo />


                {/* ProjectBar */}
                <ProjectBar />

                {/* ProjectDuration */}
                <ProjectDuration />
               

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default MainDashboard;
