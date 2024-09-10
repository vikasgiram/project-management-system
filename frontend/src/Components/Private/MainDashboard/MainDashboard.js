import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { DashboardGroupBtn } from "./MainContent/DashboardGroupBtn";
import { CompanyInfo } from "./MainContent/CompanyInfo";
import { ProjectBar } from "./MainContent/ProjectBar";
import { ProjectDuration } from "./MainContent/ProjectDuration";

import { HDashboard } from "../../../Hooks/Company/HDashboard";





function MainDashboard() {
  const [isopen, setIsOpen] = useState(false);
  const [custCount, setCustCount] = useState([]);
  const [categorywise, setCategorywise] = useState({});


  useEffect(()=>{
    barChart();
  },[]);
  // console.log(HDashboard,"data");
  const barChart = async () => {          
    try {
        const response = await fetch("api/company/dashboard");
        const data = await response.json();
        setCategorywise(data.category.total|| []); 
        setCustCount(data.customerCount|| []); 
        // setValueWise(json.valueWiseProjectData|| []);
        // console.log(categorywise);
    } catch (error) {
        console.error("Error fetching data", error);
    }
  }

  
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

                <DashboardGroupBtn custCount={custCount}/>

                {/* CompanyInfo */}
                <CompanyInfo categorywise={categorywise}/>


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
