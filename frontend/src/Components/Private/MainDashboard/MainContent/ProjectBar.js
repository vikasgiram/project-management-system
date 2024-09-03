
import { Bar } from "react-chartjs-2";
import { Categorywiseproject } from "./Categorywiseproject";
import { Valuewiseproject } from "./Valuewiseproject";


export const ProjectBar = () => {

 

  return (
    <div className="row  bg-white p-2 mx-1 mt-4 border rounded" >

      <div className="col-12 col-md-6">
         <Categorywiseproject />
      </div>

      <div className="col-12 col-md-6">

         <Valuewiseproject />
      </div>
    

    </div>
  )
}