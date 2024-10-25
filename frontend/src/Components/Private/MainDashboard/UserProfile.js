import { useNavigate } from "react-router-dom"



export const UserProfile = () => {

    const navigate =useNavigate()
    return (
        <>
            <div className="row">
                <div className="col-12  mx-auto center-flex">

                    <div className="row bg-white rounded center-block">

                        <div className="col-12 col-lg-4 py-4 rounded border bg-white mx-auto">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4>John Doe</h4>
                                        <p className="text-secondary mb-1">Full Stack Developer</p>
                                        <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-7 border rounded bg-white mx-auto">
                            <div className=" p-4">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Kenneth Valdez
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            fip@jukmuh.al
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            (239) 816-9029
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            (320) 380-4539
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Bay Area, San Francisco, CA
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                                    <button 
                                    onClick={() =>navigate('/EmployeeMainDashboard')}
                                    className="animated-button mt-3 col-lg-2 ms-auto mx-3"> <i className="fa-solid fa-angle-left"></i> Back</button>
                    </div>

                </div>

            </div>
        </>
    )
}