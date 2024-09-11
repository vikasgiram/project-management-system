
import { useNavigate } from "react-router-dom"
import { CompanyInfoPieChart } from "./CompanyInfoPieChart"


export const CompanyInfo = ({category}) => {
  const navigate = useNavigate()
  const total= category ? (category.total.inprocess+category.total.upcoming+category.total.finished):0;
  console.log(category?category:"category is not loaded");
  return (
    <div className="row  bg-white p-2 m-1 border rounded" >
      <div className="col-12 col-lg-8 py-1 " >

        <span className="text-dark  py-4 heading_fontsize_first">Total Projects <span className="count_fontsize" style={{ color: '#4FB4FE' }}> |
           </span> <span className="count_fontsize">{total}</span></span>
        <div className="row pt-3">

          <div className="col-12 col-md-4 pb-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="p-4 background_style PurpleColor" >
              <div className="row">
                <div className="col-9">
                  <h6 className=" text-dark card_heading">
                    Finish Projects
                  </h6>
                  <h2 className="pt-2 fw-bold card_count">{0}</h2>
                  
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center ">
                  <img src="./static/assets/img/check.png" className="img_opacity all_card_img_size" alt="img not found" srcset="" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 pb-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="p-4 background_style pinkcolor">
              <div className="row">
                <div className="col-9">
                  <h6 className=" text-dark card_heading">
                    Inprocess Projects
                  </h6>
                  <h2 className="pt-2 fw-bold card_count">{0}</h2>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center ">
                  <img src="./static/assets/img/agile.png" className="img_opacity all_card_img_size" alt="img not found" srcset="" />
                </div>
              </div>
            </div>
          </div>


          <div className="col-12 col-md-4 pb-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="p-4 background_style bg_sky">
              <div className="row">
                <div className="col-9">
                  <h6 className=" text-dark card_heading">
                    Upcoming Projects
                  </h6>
                  <h2 className="pt-2 fw-bold card_count">{0}</h2>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center ">
                  <img src="./static/assets/img/upcoming.png" className="img_opacity all_card_img_size" alt="" srcset="" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      <CompanyInfoPieChart categorywise={0}/>
    </div>
  )
}