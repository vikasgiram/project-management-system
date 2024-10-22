import { useState } from "react";
import toast from "react-hot-toast";
import { createCustomer } from "../../../../../hooks/useCustomer";

const EmployeeAddCustomerPopUp = ({ handleAdd }) => {
  const [custName, setCustName] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [email, setEmail] = useState("");
  const [customerContactPersonName2, setCustomerContactPersonName2] =
    useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [GSTNo, setGSTNo] = useState("");
  const [customerContactPersonName1, setCustomerContactPersonName1] =
    useState("");
  const [sameAsAbove, setSameAsAbove] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    pincode: "",
    state: "",
    city: "",
    add: "",
    country: "",
  });
  // const [deliveryAddress, setDeliveryAddress] = useState({
  //   pincode: "",
  //   state: "",
  //   city: "",
  //   add: "",
  //   country: "",
  // });

  const handleCheckboxChange = (e) => {
    setSameAsAbove(e.target.checked);
    // if (e.target.checked) {
    //   setDeliveryAddress({ ...billingAddress });
    // } else {
    //   setDeliveryAddress({
    //     pincode: "",
    //     state: "",
    //     city: "",
    //     add: "",
    //     country:""
    //   });
    // }
  };

  const handleCustomerAdd = async (event) => {
    event.preventDefault();

    const data = {
      custName,
      phoneNumber1,
      email,
      customerContactPersonName2,
      customerContactPersonName1,
      phoneNumber2,
      billingAddress,
      // deliveryAddress,
      GSTNo,
    };

    if (
      !custName ||
      !phoneNumber1 ||
      !email ||
      !customerContactPersonName2 ||
      !phoneNumber2 ||
      !billingAddress.pincode ||
      !billingAddress.state ||
      !billingAddress.city ||
      !billingAddress.add ||
      // !deliveryAddress.pincode ||
      // !deliveryAddress.state ||
      // !deliveryAddress.city ||
      // !deliveryAddress.add ||
      !GSTNo
    ) {
      return toast.error("Please fill all fields");
    }
    console.log(data);

    await createCustomer(data);
    //   console.log(data);
    handleAdd();
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
            <form onSubmit={handleCustomerAdd}>
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Create New Customer
                {/* Forward */}
              </h5>
              <button
                onClick={() => handleAdd()}
                type="button"
                className="close px-3"
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row modal_body_height">
                <div className="col-12">
                    <div className="">
                      <label for="FullName" className="form-label label_text">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="FullName"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        aria-describedby="nameHelp"
                        required 
                      />
                    </div>
                </div>

                <div className="col-12">
                    <div className="mb-3">
                      <label for="email" className="form-label label_text">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-0"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                      />
                    </div>
                </div>

                <div className="col-12  mt-2">
                  <div className="row border bg-gray mx-auto">
                    <div className="col-10 mb-3">
                      <span className="SecondaryInfo">Secondary Info</span>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="SecondaryPersonName"
                            className="form-label label_text"
                          >
                            Customer Contact Person Name 1
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="SecondaryPersonName"
                            value={customerContactPersonName1}
                            onChange={(e) =>
                              setCustomerContactPersonName1(e.target.value)
                            }
                            aria-describedby="emailHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="SecondaryPersonName2"
                            className="form-label label_text"
                          >
                            Customer Contact Person Name 2
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="SecondaryPersonName2"
                            value={customerContactPersonName2}
                            onChange={(e) =>
                              setCustomerContactPersonName2(e.target.value)
                            }
                            aria-describedby="emailHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="MobileNumber"
                            className="form-label label_text"
                          >
                            Mobile Number
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="MobileNumber"
                            value={phoneNumber1}
                            onChange={(e) => setPhoneNumber1(e.target.value)}
                            aria-describedby="mobileNoHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="mobileNo"
                            className="form-label label_text"
                          >
                            Mobile No
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="mobileNo"
                            value={phoneNumber2}
                            onChange={(e) => setPhoneNumber2(e.target.value)}
                            aria-describedby="MobileNoHelp"
                          />
                        </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  mt-2">
                  <div className="row border mt-4 bg-gray mx-auto">
                    <div className="col-12 mb-3">
                      <span className="AddressInfo">Address</span>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Pincode"
                            id="exampleInputEmail1"
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                pincode: e.target.value,
                              })
                            }
                            value={billingAddress.pincode}
                            aria-describedby="emailHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="State"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                            value={billingAddress.state}
                            aria-describedby="emailHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="City"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                            value={billingAddress.city}
                            aria-describedby="emailHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="Country"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                            value={billingAddress.country}
                            aria-describedby="emailHelp"
                          />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12 mt-2">
                        <div className="mb-3">
                          <textarea
                            className="textarea_edit col-12"
                            id=""
                            name=""
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={(e) => setBillingAddress({ ...billingAddress, add: e.target.value })}
                            value={billingAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-12  mt-2">
                  <div className="row border mt-4 bg-gray mx-auto">
                    <div className="col-12 mb-4">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <span className="AddressInfo">Delivery Address</span>
                        </div>

                        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                          <span className=" ms-lg-4 AddressInfo">
                            <input
                              type="checkbox"
                              className="me-3 bg-white"
                              id=""
                              name=""
                              value=""
                              checked={sameAsAbove}
                              onChange={handleCheckboxChange}
                            />
                            Same as above
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Pincode"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...deliveryAddress, pincode: e.target.value })}
                            value={deliveryAddress.pincode}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="State"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...deliveryAddress, state: e.target.value })}
                            value={deliveryAddress.state}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="City"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...deliveryAddress, city: e.target.value })}
                            value={deliveryAddress.city}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder="Contry"
                            id="exampleInputEmail1"
                            onChange={(e) => setBillingAddress({ ...deliveryAddress, country: e.target.value })}
                            value={deliveryAddress.country}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-12 mt-2">
                      <form>
                        <div className="mb-3">
                          <textarea
                            className="textarea_edit col-12"
                            id=""
                            name=""
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={(e) => setBillingAddress({ ...deliveryAddress, add: e.target.value })}
                            value={billingAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div> */}

                <div className="col-12 col-lg-6 mt-2">
                    <div className="">
                      <label for="GSTNumber" className="form-label label_text">
                        GST Number
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-0"
                        id="GSTNumber"
                        onChange={(e) => setGSTNo(e.target.value)}
                        value={GSTNo}
                        aria-describedby="emailHelp"
                      />
                    </div>
                </div>

                <div className="row">
                  <div className="col-12 pt-3 mt-2">
                    <button
                      type="submit"
                      onClick={handleCustomerAdd}
                      className="w-80 btn addbtn rounded-0 add_button   m-2 px-4"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="w-80  btn addbtn rounded-0 Cancel_button m-2 px-4"
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

export default EmployeeAddCustomerPopUp;
