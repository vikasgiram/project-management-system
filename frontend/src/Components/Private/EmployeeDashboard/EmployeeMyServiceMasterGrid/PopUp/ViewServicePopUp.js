import { useState } from "react";
import { formatDateforupdate } from "../../../../../utils/formatDate";

const ViewServicePopUp = ({ closePopUp, selectedService }) => {
  const [service, setService] = useState(selectedService);
  // console.log("service", service);

  // const formattedPurchaseOrderDate = formatDateforupdate(projects?.purchaseOrderDate);
  // const formattedStartDate = formatDateforupdate(projects?.startDate);
  const hasRemarks =
  selectedService &&
  selectedService.remarks &&
  selectedService.remarks.length > 0;
  const formattedDate = formatDateforupdate(service?.allotmentDate);

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
        <div className="modal-dialog modal_widthhh_details modal-xl">
          <div className="modal-content p-3">
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Service Details
                {/* Forward */}
              </h5>
              <button
                onClick={() => closePopUp()}
                type="button"
                className="close px-3"
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row modal_body_height_details">
                <div class="row">
                  <div class="col-sm- col-md col-lg">
                    <h6>
                      {" "}
                      <p className="fw-bold ">Complaint:</p>{" "}
                      {/* {service?.ticket?.details || "-" } */}
                    </h6>
                    <h6>
                      {" "}
                      <p className="fw-bold mt-3 ">Client:</p>{" "}
                      {service?.ticket?.client?.custName}
                    </h6>
                    <h6>
                      {" "}
                      <p className="fw-bold mt-3">Product:</p>{" "}
                      {service.ticket.product}
                    </h6>
                    <h6>
                      {" "}
                      <p className="fw-bold mt-3">Zone:</p> {service.zone}
                    </h6>
                    <h6>
                      {" "}
                      <p className="fw-bold mt-3">Service Type:</p>{" "}
                      {service.serviceType}
                    </h6>
                  </div>
                  <div class="col-sm- col-md col-lg">
                    <p className="fw-bold"> Allotment Date: </p>
                    {formatDateforupdate(service.allotmentDate)}
                    <p className="fw-bold mt-3"> Allocated to: </p>
                    {service.allotTo[0].name}
                    <p className="fw-bold mt-3"> Status: </p>
                    {service.status}
                    <p className="fw-bold mt-3"> Priority: </p>
                    {service.priority}
                    <p className="fw-bold mt-3"> Work Mode: </p>
                    {service.workMode}
                    <p className="fw-bold mt-3"> Created At: </p>
                    {formatDateforupdate(service.ticket.date)}
                  </div>
                </div>
              </div>
              {hasRemarks ? (<>
                    <h6 className="mt-3"> Past Actions</h6>
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Sr. No</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedService.remarks.map((remark, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{remark}</td>{" "}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </>
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      No remarks available.
                    </div>
                  ) }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewServicePopUp;
