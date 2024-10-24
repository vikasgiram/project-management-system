
import { useNavigate } from "react-router-dom"
import { AdminInfoPieChart } from "./AdminInfoPieChart"
// import { CompanyInfEmployeeDashboardPieChartoPieChart } from "./EmployeeDashboardPieChart"
// import { CompanyInfoPieChart } from "./CompanyInfoPieChart"


export const AdminDashboardCards = ({ totalProjectCount, completedProjectCount, inproccessProjectCount }) => {

    const navigate = useNavigate()

    return (
        <div className="row  bg-white p-2 m-1 border rounded" >
            <div className="col-12 col-lg-8 mx-auto py-1 " >
                <div className="row pt-3">

                    <div className="col-12 col-md-4 pb-3 cursor-pointer"
                    // onClick={() => navigate('/')}
                    >
                        <div className="p-4 background_style PurpleColor ">
                            <div className="row">
                                <div className="col-9">
                                    <h6 className=" text-dark card_heading">

                                        Company Registered
                                    </h6>
                                    <h2 className="pt-2 fw-bold card_count">
                                        {/* {categorywise.inprocess} */}
                                        {/* {completedProjectCount} */}
                                        10000
                                    </h2>
                                </div>
                                <div className="col-3 d-flex align-items-center justify-content-center ">
                                    <img src="./static/assets/img/checked.png" className="img_opacity all_card_img_size" alt="img not found" srcset="" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-12 col-md-4 pb-3 cursor-pointer"
                    // onClick={() => navigate('/')}
                    >
                        <div className="p-4 background_style bg_sky" >
                            <div className="row">
                                <div className="col-9">
                                    <h6 className=" text-dark card_heading">
                                        Activate Companys
                                    </h6>
                                    <h2 className="pt-2 fw-bold card_count demo_bottom">
                                        {/* {categorywise.finished} */}
                                        {/* {totalProjectCount} */}
                                        5000
                                    </h2>
                                </div>
                                <div className="col-3 d-flex align-items-center justify-content-center ">
                                    <img src="./static/assets/img/planning.png" className="img_opacity all_card_img_size" alt="img not found" srcset="" />
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="col-12 col-md-4 pb-3 cursor-pointer"
                    // onClick={() => navigate('/')}
                    >
                        <div className="p-4 background_style pinkcolor ">
                            <div className="row">
                                <div className="col-9">
                                    <h6 className=" text-dark card_heading">
                                        Deactivated companys
                                    </h6>
                                    <h2 className="pt-2 fw-bold card_count">
                                        {/* {categorywise.upcoming} */}
                                        {/* {inproccessProjectCount} */}
                                        2500
                                    </h2>
                                </div>
                                <div className="col-3 d-flex align-items-center justify-content-center ">
                                    <img src="./static/assets/img/cloud.png" className="img_opacity all_card_img_size" alt="" srcset="" />
                                </div>
                            </div>
                        </div>

                    </div>




                </div>
            </div>
            {/* 
            <CompanyInfEmployeeDashboardPieChartoPieChart 
                    totalProjectCount={totalProjectCount} 
                    completedProjectCount={completedProjectCount} 
                    inproccessProjectCount={inproccessProjectCount} /> */}


            <AdminInfoPieChart
            //  categorywise={categorywise}
             />
        </div>
    )
}