import { useState } from "react";
import { formatDateforupdate } from "../../../../../utils/formatDate";


const ViewServicePopUp = ({ closePopUp, selectedService }) => {
  const [service, setService] = useState(selectedService);
    console.log("service", service);

  // const formattedPurchaseOrderDate = formatDateforupdate(projects?.purchaseOrderDate);
  // const formattedStartDate = formatDateforupdate(projects?.startDate);
  const formattedDate = formatDateforupdate(service?.allotmentDate);

  return (
    <>
        
        <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
        
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                      <div className="modal-header pt-0">
        
                        <h5 className="card-title fw-bold" id="exampleModalLongTitle">
        
                        Service Details
                          {/* Forward */}
                        </h5>
                        <button onClick={() => closePopUp()} type="button" className="close px-3" style={{ marginLeft: "auto" }}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="row modal_body_height">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm- col-md col-lg">
                                    <h6> Complaint: {service.ticket.details}</h6>
                                    <h6> Client: {service.ticket.client.custName}</h6>
                                    <h6> Product: {service.ticket.product}</h6>
                                </div>
                                <div class="col-sm- col-md col-lg">
                                    <p> Allotment Date: {service.allotmentDate}</p>
                                </div>
                               
                            </div>
                        </div>
                          
        
                        </div>
                      </div>
                </div>
        </div>
    </div>
    </>);
}

export default ViewServicePopUp;