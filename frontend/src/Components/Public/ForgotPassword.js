import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "././login.css";

export const ForgotPassword = () => {
  const navigation = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="pt-5 all_bg" style={{ height: "100vh" }}>
        <div className=" mx-auto row bg-img center">
          <div className="col-12  col-md-5  mt-md-0 col-lg-7 mx-auto    ">
            <div className="row px-lg-2">
              <h4 className="text-center pb-2 fw-bold login_text">Forgot Password</h4>

              <div className="col-lg-9 my-lg-4 mx-auto">
                <form action="" method="post">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                    //   value={username}
                      placeholder="Enter Your Registered Email"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group  mt-3 last mb-2">
                    <span className="eye-icons"></span>
                  </div>

              
                  <span
                    style={{ textDecoration: "none" }}
                    // onClick={handleLogin}
                    onClick={() => navigation('/')}
                  >
                    <input
                      type="button"
                      value="Forgot"
                      className="btn btn-block btn_submit form-control fw-bold"
                    />
                  </span>
                </form>


              </div>
            
            </div>
          </div>

          <div className="col-12 col-md-7 col-lg-5 px-5  mx-auto   d-none d-lg-block"></div>
        </div>
       
      </div>
    </>
  );
};
