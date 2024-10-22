import { formatDate } from "../../../utils/formatDate";

export const AssignInproccessSection = ({assignedprojectName,inproccessProject}) => {
    return (
        <>
            <div className="row   p-2 m-1 " >
                <div className="col-12 col-lg-5 mb-4 mb-lg-0  rounded " >
                    <div className="row bg-white rounded p-lg-3">
                        <h6 className="mb-0 fw-bold text-success mb-3">Assigned Projects</h6>
                        <div className="col-12">
                            <div className="shadow_custom ">
                                <div className="table-responsive">
                                    <table className="table align-items-center table-flush">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="text-center">Project Name</th>
                                                <th className="text-center" >Start Date</th>
                                                <th className="text-center" >Expected End Date</th>
                                                <th className="text-center" >Status</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {assignedprojectName.map((item) => (
                                                
                                            
                                            <tr className="text-center">
                                                <th className="text-center">
                                                    <div className="media align-items-center">
                                                        <div className="media-body">
                                                            <span className="mb-0 text-sm">{item.name}</span>
                                                        </div>
                                                    </div>
                                                </th>

                                                <td>
                                                    {formatDate(item.startDate)}
                                                </td>
                                                <td>
                                                    {formatDate(item.endDate)}
                                                </td>

                                                <td>
                                                    <span className="badge badge-dot mr-4 text-dark">
                                                        <i className="bg-success "></i> Asigned
                                                    </span>
                                                </td>
                                            </tr>

))}
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>


                <div className="col-12 col-lg-7  mx-auto  rounded " >
                    <div className="row  bg-white ms-1 rounded p-3">
                        <h6 className="mb-0 fw-bold mb-3 text-warning-dark">Inprocess</h6>
                        <div className="col-12">
                            <div className="shadow_custom ">

                                <div className="table-responsive">
                                    <table className="table align-items-center table-flush">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="text-center">Project Name</th>
                                                <th className="text-center" >Start Date</th>
                                                <th className="text-center" >Expected End Date</th>
                                                <th className="text-center" >Status</th>
                                                <th className="text-center" >Completion</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {inproccessProject.map(item=>(

                                            
                                            <tr className="text-center">
                                                <th className="text-center">

                                                    <div className="media align-items-center">
                                                        <div className="media-body">
                                                            <span className="mb-0 text-sm">{item.name}</span>
                                                        </div>
                                                    </div>
                                                </th>

                                                <td>
                                                    {formatDate(item.startDate)}
                                                </td>
                                                <td>
                                                    {formatDate(item.endDate)}
                                                </td>

                                                <td>
                                                    <span className="badge badge-dot mr-4 text-dark">
                                                        <i className="bg-warning "></i> 
                                                        {item.projectStatus}
                                                    </span>
                                                </td>

                                                <td className="text-center">
                                                    <div className="d-flex align-items-center ">
                                                        <span className=" text_a">{item.completeLevel}%</span>
                                                        <div className="m-auto">
                                                            <span className="progress">
                                                                <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${item.completeLevel}%`}}></div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                           
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </>
    )
}