import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "././login.css";
import toast from "react-hot-toast";
import { forgetPassword } from "../../hooks/useAuth";

export const ForgotPassword = () => {
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  

  const handelEmailSubmit= async (e) =>{
    e.preventDefault();
    if(email === ""){
      return toast.error("Email is Required...  ");
    }
    await forgetPassword(email);
    setEmail('');
  }

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
                <form >
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      value={email}
                      placeholder="Enter Your Registered Email"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group  mt-3 last mb-2">
                    <span className="eye-icons"></span>
                  </div>

              
                  <span
                    style={{ textDecoration: "none" }}
                  >
                    <input
                      type="submit"
                      value="Forgot"
                      // onClick={handelEmailSubmit}
                      onClick={() => navigation('/Mailsentsuccessfully')}
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
