import { useState, useEffect } from "react";
import { updateCustomer } from "../../../../../hooks/useCustomer";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";

const UpdateCustomerPopUp = ({ handleUpdate, selectedCust }) => {
  const [customer, setCustomer] = useState(selectedCust);

  const [billingAddress, setBillingAddress] = useState({
    add: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  // const [deliveryAddress, setDeliveryAddress] = useState({
  //   add: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   pincode: "",
  // });

  // const [sameAsBilling, setSameAsBilling] = useState(false);

  // Load existing customer data on component mount
  useEffect(() => {
    if (customer) {
      setBillingAddress(customer.billingAddress);
      // setDeliveryAddress(customer.deliveryAddress);
    }
  }, [customer]);

  // Function to handle the checkbox toggle
  // const handleCheckboxChange = (e) => {
  //   setSameAsBilling(e.target.checked);
  //   if (e.target.checked) {
  //     setDeliveryAddress(billingAddress); // Copy billing to delivery
  //   }
  // };

  // Function to handle changes in billing address fields
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
    // if (sameAsBilling) {
    //   setDeliveryAddress({ ...billingAddress, [name]: value });
    // }
  };

  // Function to handle changes in delivery address fields
  // const handleDeliveryChange = (e) => {
  //   const { name, value } = e.target;
  //   setDeliveryAddress({ ...deliveryAddress, [name]: value });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,

    }))
  };

  const handleCustUpdate = async () => {
    const updatedCustomer = {
      ...customer,
      billingAddress,
      // deliveryAddress
    }
    await updateCustomer(updatedCustomer);
    handleUpdate();
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
            <form onSubmit={handleCustUpdate}>
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
                    <div className="">
                      <label for="FullName" className="form-label label_text">
                        Full Name <RequiredStar />
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="FullName"
                        name="custName"
                        value={customer.custName}
                        onChange={handleChange}
                        aria-describedby="nameHelp"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="mb-3">
                      <label for="Email" className="form-label label_text">
                        Email <RequiredStar />
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-0"
                        id="Email"
                        value={customer.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                        required
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
                            for="ContactPerson1"
                            className="form-label label_text"
                          >
                            Contact Person 1 <RequiredStar />
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="ContactPerson1"
                            name="customerContactPersonName1"
                            onChange={handleChange}
                            value={customer.customerContactPersonName1}
                            aria-describedby="mobileNoHelp"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="phoneNumber1"
                            className="form-label label_text"
                          >
                            Contact no <RequiredStar />
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="phoneNumber1"
                            name="phoneNumber1"
                            onChange={handleChange}
                            value={customer.phoneNumber1}
                            aria-describedby="secemailHelp"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="ContactPerson2"
                            className="form-label label_text"
                          >
                            Contact Person 2 <RequiredStar />
                          </label>
                          <input
                            type="text"

                            className="form-control rounded-0"
                            id="ContactPerson2"
                            name="customerContactPersonName2"
                            onChange={handleChange}
                            value={customer.customerContactPersonName2}
                            aria-describedby="mobileNoHelp"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <label
                            for="phoneNumber2"
                            className="form-label label_text"
                          >
                            Contact no 2 <RequiredStar />
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="phoneNumber2"
                            onChange={handleChange}
                            name="phoneNumber2"
                            value={customer.phoneNumber2}
                            aria-describedby="secemailHelp"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12  mt-2">
                    <div className="row border mt-4 bg-gray mx-auto">
                      <div className="col-12 mb-3">
                        <span className="AddressInfo">Address <RequiredStar /></span>
                      </div>

                      <div className="col-12 col-lg-6 mt-2">
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Pincode"
                            id="Pincode"
                            name="pincode"
                            onChange={handleBillingChange}
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
                            id="State"
                            onChange={handleBillingChange}
                            name="state"
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
                            id="city"
                            onChange={handleBillingChange}
                            name="city"
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
                            id="country"
                            name="country"
                            onChange={handleBillingChange}
                            value={billingAddress.country}
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-12 mt-2">
                        <div className="mb-3">
                          <textarea
                            className="textarea_edit col-12"
                            id="add"
                            name="add"
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={handleBillingChange}
                            value={billingAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                  <span className=" ms-lg-6 AddressInfo">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={handleCheckboxChange}
                    />
                    Deliver at Same Address
                  </span>
                </div>

                {!sameAsBilling&&<div className="col-12  mt-2">
                  <div className="row border mt-4 bg-gray mx-auto">
                    <div className="col-12 mb-4">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <span className="AddressInfo">Delivery Address</span>
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
                            id="Pincode"
                            name="pincode"
                            onChange={handleDeliveryChange}
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
                            id="State"
                            onChange={handleDeliveryChange}
                            name="state"
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
                            id="city"
                            onChange={handleDeliveryChange}
                            name="city"
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
                            placeholder="Country"
                            id="country"
                            name="deliveryAddress.country"
                            onChange={handleDeliveryChange}
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
                            id="add"
                            name="deliveryAddress.add"
                            placeholder="House NO., Building Name, Road Name, Area, Colony"
                            onChange={handleDeliveryChange}
                            value={deliveryAddress.add}
                            rows="2"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>} */}

                  <div className="col-12 col-lg-6 mt-2">
                    <div className="">
                      <label for="GSTNo" className="form-label label_text">
                        GST Number <RequiredStar />
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="GSTNo"
                        name="GSTNo"
                        onChange={handleChange}
                        value={customer.GSTNo}
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 pt-3 mt-2">
                      <button
                        type="submit"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCustomerPopUp;
