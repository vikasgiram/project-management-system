import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { DashboardGroupBtn } from "./MainContent/DashboardGroupBtn";
import { CompanyInfo } from "./MainContent/CompanyInfo";
import { ProjectBar } from "./MainContent/ProjectBar";
import { ProjectDuration } from "./MainContent/ProjectDuration";

import { getDashboardData } from "../../../hooks/useCompany";




function MainDashboard() {
  const [isopen, setIsOpen] = useState(false);
  const [custCount, setCustCount] = useState([]);
  const [categorywise, setCategorywise] = useState({});
  const [valueWise, setValueWise] = useState([]);
  const [forbar, setForbar] = useState({});
  const [duration, setDuration] = useState([]);

  


  useEffect(() => {
    
    const fetchData = async () => {
      const data = await getDashboardData();
      if (data) {
        // console.log(data,"data from useEffect");
        
       
        setCustCount(data.customerCount || []);
        setCategorywise(data.category.total|| []);
        setForbar(data.category.category|| []);  
        setValueWise(data.valueWiseProjectData|| []);
        setDuration(data.delayedProjectCountsByRange || []);  

      }
    };

    fetchData(); 
  }, []);

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
      {/* <div className="wrapper"> */}
      <div className="container-scroller">
        <div className="row background_main_all">
          <Header
            // Language={Language}
            // setLanguage={setLanguage}
            toggle={toggle} isopen={isopen} 
          />
          <div className="container-fluid page-body-wrapper">
            <Sidebar isopen={isopen} active="dashboard" />
            <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
              <div className="content-wrapper ps-3 ps-md-0">
              
              {/* MainContent */}

                <DashboardGroupBtn custCount={custCount}/>

                {/* CompanyInfo */}
                <CompanyInfo categorywise={categorywise} />


                {/* ProjectBar */}
                <ProjectBar forbar={forbar} valueWise={valueWise}/>

                {/* ProjectDuration */}
                <ProjectDuration duration={duration}/>
               

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
