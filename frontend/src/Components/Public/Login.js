import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "././login.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "../../hooks/useAuth";
// import { useAuthDispatch, useAuthState } from "../../../helper/Context/context";

export const LogIn = () => {
  const navigation = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username + " " + password);
  
    try {
      const data = await loginUser(username, password);
      console.log(data,"login data");
      if (data.error) {
        return toast.error(data.error); 
      }
  
     
      if (data.user === "employee") {
        navigation("/employeeDashboard");
      } else if (data.user === "company") {
        navigation("/MainDashboard");
      } else if (data.user === "admin") {
        alert("Welcome Admin");
        navigation("/adminDashboard");
      }
  
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in."); // Show error message using toast
    }
  };

  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="pt-5 all_bg" style={{ height: "100vh" }}>
        <div className=" mx-auto row bg-img center">
          <div className="col-12  col-md-5  mt-md-0 col-lg-7 mx-auto    ">
            <div className="row px-2">
              <h4 className="text-center pb-2 fw-bold login_text">LOG IN</h4>

              <div className="col-9 mx-auto">
                <form action="" method="post">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      value={username}
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group  mt-3 last mb-2">
                    <span className="eye-icons"></span>
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i class="fa-solid fa-lock"></i>
                    </span>
                    <input
                      placeholder="Password"
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      autoComplete="new-Password"
                      value={password}

                      onChange={(e) => {
                        setPassword(e.target.value)
                        // showPassEncrypt()
                      }}
                      
                      // onChange={(e) => 
                      //   setPassword(e.target.value)
                        
                        
                      // }
                    />
                    <span class="input-group-text">
                      {" "}

                      <i
                      onClick={toggleShowPassword}
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} // Change icon based on visibility
                      style={{ cursor: "pointer" }}
                    ></i>


                    
                    </span>
                  </div>
                  <div className=" mb-2 text-start">
                    <span className="">
                      <a
                        href="#"
                        className="forgot-pass text-decoration-none"
                        style={{ color: "rgb(96 124 7)" }}
                      >
                        Forgot Password
                      </a>
                    </span>
                  </div>
                  <span
                    style={{ textDecoration: "none" }}
                    onClick={handleLogin}
                  >
                    <input
                      type="button"
                      value="Log In"
                      className="btn btn-block btn_submit form-control fw-bold"
                    />
                  </span>
                </form>

                
                <ToastContainer />


              </div>
              <div
                className="col-12 text-center pb-1 pt-4 mb-5  pt-lg-3"
                style={{ alignSelf: "center" }}
              >
                {/* 
                                <div className='mb-1'>
                                    <h6 className='text-dark f7'> <i className="fa-solid fa-circle-info "></i> Help Desk</h6>
                                </div>

                                <div className="">
                                    <h6 className='text-danger f7'>Customer Support</h6>
                                </div> */}

                {/* <div className='pt-1 '>
                                    <h6 className="text-dark f7"><i className="fa-solid fa-phone  pe-1"></i>

                                        <a
                                            href="tel:91726 50917" /><span className="text-dark ml-2">  +91 91726 50917</span> </h6>
                                </div> */}

                {/* <div className='pt-1'>
                                    <h6 className="text-dark pb-2 f7"><i className="fa-solid fa-envelope  pe-1"></i>

                                        <a
                                            href="mailto:info@cdat.co.in" /><span className="text-dark ml-2">  info@cdat.co.in</span> </h6>
                                </div> */}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-7 col-lg-5 px-5 wardha_background mx-auto   d-none d-lg-block"></div>
        </div>
        {/* 
                <div className='row g-0'>
                    <div className='col-12 px-3 px-lg-0 text-center  mt-md-0 d-flex align-items-center justify-content-center  nmmc_blue_bg py-4' >
                        <span className="text-white text-center "
                        >
                            &copy;

                            <span className="silver text-dark  ">{new Date().getFullYear()} Copyright Daccess. All Rights Reserved.
                            </span>
                        </span>
                    </div>
                </div> */}
      </div>
    </>
  );
};