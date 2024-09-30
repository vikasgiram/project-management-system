import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { DashboardGroupBtn } from "./MainContent/DashboardGroupBtn";
import { CompanyInfo } from "./MainContent/CompanyInfo";
import { ProjectBar } from "./MainContent/ProjectBar";
import { ProjectDuration } from "./MainContent/ProjectDuration";

import { getDashboardData } from "../../../hooks/useCompany";

import { data } from "jquery";
import HashLoader from "react-spinners/HashLoader";





function MainDashboard() {
  const [isopen, setIsOpen] = useState(false);

  const [custCount, setCustCount] = useState([]);
  const [categorywise, setCategorywise] = useState({});
  const [valueWise, setValueWise] = useState([]);
  const [forbar, setForbar] = useState({});
  const [duration, setDuration] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchData = async () => {
      const data = await getDashboardData();
      if (data) {
        // console.log(data,"data from useEffect");


        setCustCount(data.customerCount || []);
        setCategorywise(data.category.total || []);
        setForbar(data.category.category || []);
        setValueWise(data.valueWiseProjectData || []);
        setDuration(data.delayedProjectCountsByRange || []);
        setLoading(false);
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
       {loading ? (
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',  // Full height of the viewport
                  width: '100vw',   // Full width of the viewport
                  position: 'absolute', // Absolute positioning to cover the viewport
                  top: 0,
                  left: 0,
                  backgroundColor: '#f8f9fa' // Optional background color
               }}
            >
               <HashLoader color="#4C3B77" loading={loading} size={50} />
            </div>
         ) : (

     
      
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

                <DashboardGroupBtn custCount={custCount} />

                {/* CompanyInfo */}
                <CompanyInfo categorywise={categorywise} />


                {/* ProjectBar */}
                <ProjectBar forbar={forbar} valueWise={valueWise} />

                {/* ProjectDuration */}
                <ProjectDuration duration={duration} />


              </div>
            </div>
          </div>
        </div>
      </div>
         )}
      {/* </div> */}
    </>
  );
}

export default MainDashboard;
