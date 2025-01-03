import { useState } from "react";
import { updateTicket } from "../../../../../hooks/useTicket";

import toast from "react-hot-toast";

import { RequiredStar } from "../../../RequiredStar/RequiredStar";

const EmployeeUpdateFeedbackPopUp = ({ handleUpdate, selectedFeedback }) => {
  const [feedback, setFeedback] = useState(selectedFeedback);
  console.log(feedback);
  
    const [formData, setFormData] = useState({
      // name: "",
      // email: "",
      rating: 0,
      message: "",
      // service: id,
    });
  
    const messages = ["Terrible", "Bad", "Ok", "Good", "Amazing"];
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const handleFeedbackUpdate = async (event) => {
    event.preventDefault();
    try {
      // console.log(formData);
      
      // await updateTicket(ticket._id,ticket);
      handleUpdate();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRating = (newRating) => {
    setFormData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };


  const containerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f0f4ff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const textStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const textAreaStyle = {
    ...inputStyle,
    height: "80px",
    resize: "none",
  };

  const starsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };

  const starStyle = (full) => ({
    fontSize: "30px",
    cursor: "pointer",
    color: full ? "#fcc419" : "#ccc",
    transition: "color 0.3s",
  });

  const ratingMessageStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fcc419",
    marginTop: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#5a5af2",
    backgroundColor: "transparent",
    border: "2px solid #5a5af2",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
  };


  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#00000090",
        }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <form onSubmit={handleFeedbackUpdate}>
              <div className="modal-header pt-0">
                <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                  Update Feedback
                </h5>
                <button
                  onClick={() => handleUpdate()}
                  type="button"
                  className="close px-3"
                  style={{ marginLeft: "auto" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row modal_body_height">
                  {/* <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label label_text">
                        Full Name <RequiredStar />
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={ticket.name}
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="name"
                        required
                      />
                    </div>
                  </div> */}


<div style={formGroupStyle}>
          <label style={labelStyle}>Rating</label>
          <div style={starsContainerStyle}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                style={starStyle(formData.rating >= i + 1)}
                onClick={() => handleRating(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <p style={ratingMessageStyle}>
            {messages[formData.rating - 1] || "Select a rating"}
          </p>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            style={textAreaStyle}
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>

                

                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type="submit"
                        onClick={handleFeedbackUpdate}
                        className="w-80 btn addbtn rounded-0 add_button m-2 px-4"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-80 btn addbtn rounded-0 Cancel_button m-2 px-4"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeUpdateFeedbackPopUp;
