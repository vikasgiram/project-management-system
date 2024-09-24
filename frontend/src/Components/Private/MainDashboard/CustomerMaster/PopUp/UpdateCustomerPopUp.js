import { useState } from "react";
import { updateCustomer } from "../../../../../hooks/useCustomer";
import toast from "react-hot-toast";

const UpdateCustomerPopUp = ({ handleUpdate, selectedCust }) => {
    const [customer, setCustomer] = useState(selectedCust);
    console.log(selectedCust);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.includes("billingAddress.") || name.includes("deliveryAddress.")) {
            const [addressType, field] = name.split(".");
        
            setCustomer((prevCustomer) => ({
              ...prevCustomer,
              [addressType]: {
                ...prevCustomer[addressType],
                [field]: value,
              },
            }));
          } else {
            setCustomer((prevCustomer) => ({
              ...prevCustomer,
              [name]: value,
            }));
          }
    };

  const handleCustUpdate = async () => {
    try {
      await updateCustomer(customer);
      handleUpdate();
    } catch (error) {
      toast.error(error);
    }
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
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Update Customer
                {/* Forward */}
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
                <div className="col-12">
                  <form>
                    <div className="">
                      <label
                        for="exampleInputEmail1"
                        className="form-label label_text"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="exampleInputEmail1"
                        name="custName"
                        value={customer.custName}
                        onChange={handleChange}
                        aria-describedby="nameHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12">
                  <form>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label label_text"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-0"
                        id="exampleInputEmail1"
                        value={customer.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="col-12  mt-2">
                  <div className="row border bg-gray mx-auto">
                    <div className="col-10 mb-3">
                      <span className="SecondaryInfo">Secondary Info</span>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label label_text"
                          >
                            Contact Person 1
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="exampleInputEmail1"
                            name="customerContactPersonName1"
                            onChange={handleChange}
                            value={customer.customerContactPersonName1}
                            aria-describedby="mobileNoHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label label_text"
                          >
                            Contact no
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="exampleInputEmail1"
                            name="phoneNumber1"
                            onChange={handleChange}
                            value={customer.phoneNumber1}
                            aria-describedby="secemailHelp"
                          />
                        </div>
                      </form>
                    </div>


                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label label_text"
                          >
                            Contact Person 2
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="exampleInputEmail1"
                            name="customerContactPersonName2"
                            onChange={handleChange}
                            value={customer.customerContactPersonName2}
                            aria-describedby="mobileNoHelp"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label label_text"
                          >
                            Contact no 2
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="exampleInputEmail1"
                            onChange={handleChange}
                            name="phoneNumber2"
                            value={customer.phoneNumber2}
                            aria-describedby="secemailHelp"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-12  mt-2">
                  <div className="row border mt-4 bg-gray mx-auto">
                    <div className="col-12 mb-3">
                      <span className="AddressInfo">Address</span>
                    </div>

                    <div className="col-12 col-lg-6 mt-2">
                      <form>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Pincode"
                            id="exampleInputEmail1"
                            name="billingAddress.pincode"
                            onChange={handleChange}
                            value={customer.billingAddress.pincode}
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
                            onChange={handleChange}
                            name="billingAddress.state"
                            value={customer.billingAddress.state}
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
                            onChange={handleChange}
                            name="billingAddress.city"
                            value={customer.billingAddress.city}
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
                            placeholder="Country"
                            id="exampleInputEmail1"
                            onChange={handleChange}
                            value={customer.billingAddress.country}
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
                            name="billingAddress.add"
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={handleChange}
                            value={customer.billingAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-12  mt-2">
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
                            name="deliveryAddress.pincode"
                            onChange={handleChange}
                            value={customer.deliveryAddress.pincode}
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
                            onChange={handleChange}
                            name="deliveryAddress.state"
                            value={customer.deliveryAddress.state}
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
                            onChange={handleChange}
                            name="deliveryAddress.city"
                            value={customer.deliveryAddress.city}
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
                            placeholder="Country"
                            id="exampleInputEmail1"
                            name="deliveryAddress.country"
                            onChange={handleChange}
                            value={customer.deliveryAddress.country}
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
                            name="deliveryAddress.add"
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={handleChange}
                            value={customer.deliveryAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6 mt-2">
                  <form>
                    <div className="">
                      <label
                        for="exampleInputEmail1"
                        className="form-label label_text"
                      >
                        GST Number
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-0"
                        id="exampleInputEmail1"
                        name="GSTNo"
                        onChange={handleChange}
                        value={customer.GSTNo}
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </form>
                </div>

                <div className="row">
                  <div className="col-12 pt-3 mt-2">
                    <button
                      type="button"
                      onClick={handleCustUpdate}
                      className="w-80 btn addbtn rounded-0 add_button   m-2 px-4"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="w-80  btn addbtn rounded-0 Cancel_button m-2 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCustomerPopUp;
