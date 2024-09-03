
import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.Legend.prototype.afterFit = function () {
  this.height = this.height + 40;
};
export const Categorywiseproject = () => {

  const FirstCompdata = {

    labels: ['Project Name 1', 'Project Name 2', 'Project Name 3',  ],
    datasets: [
        // {
        //     label: 'Paddy',
        //     data: [500, 150, 105, 175, 100, 100, 185, 200],

        //     fill: true,
        //     backgroundColor: [
        //         '#990099',
        //         '#4067ae',
        //         '#4067ae',
        //         '#4067ae',
        //         '#4067ae',
        //         '#4067ae',
        //         '#4067ae',
        //         '#dc3912',


        //     ],
        //     borderWidth: 1,
        //     bevelWidth: 3,

        //     bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      
        //     bevelShadowColor: 'rgba(0, 0, 0, 0.5)',
        //     options: {

        //         tooplips: {
            
        //           bevelWidth: 3,
            
        //           bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            
        //           bevelShadowColor: 'rgba(0, 0, 0, 0.5)'
            
        //         }
            
        //       }

        // },

        {
            label: 'Inprocess ',
            data: [20, 20, 10, ],

            fill: true,
            backgroundColor: [
                '#4791FF',
                '#4791FF',
                '#4791FF',


            ],
        },
        {
            label: 'Complted',
            data: [30, 20, 10, ],

            fill: true,
            backgroundColor: [
                '#02BC77',
                '#02BC77',
                '#02BC77',


            ],


        },
        {
            label: 'Upcoming',
            data: [40, 20, 10,],

            fill: true,
            backgroundColor: [
                '#FF9123',
                '#FF9123',
                '#FF9123',


            ],
            // borderColor: [
            //     '#109618',
            //     '#109618',
            //     '#109618',
            //     '#109618',
            //     '#109618',
            //     '#109618',
            //     '#109618',
            //     '#109618',

            // ],
            // borderWidth: 1,


        },
      
        

    ],
};

const FirstCompBar = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
      padding: {
          top: 15,
          bottom: 0,
          // left: 20,
          // right: 20
      },
  },
  legend: {
      display: true,
      position: 'top',
      align: 'start',
      // fit: {
      //     height: 10
      // }
  },

  plugins: {
      datalabels: {
          anchor: 'end',
          align: 'end',
          rotation: -90, // Rotate the labels to be vertical
          color: 'black',
          // font: {
          //     // weight: 'bold'
          //     size: OutlabelsFontSize
          // }
      }
      ,
      labels: {
          render: 'value',
          fontColor: 'black',

      },
   
      outlabels: {
          color: "black",
          // text: "%l\n%v (%p)",
          stretch: 25,
          font: {
              resizable: true,
              minSize: 12,
              maxSize: 16
          }
      },
  },


  

  scales: {

      xAxes: [{
          stacked: false,
          gridLines: {
              drawOnChartArea: false,
              color: '#1b4b7b',
              zeroLineColors: '#1b4b7b',
              // borderDash : [5,5]
          },
          barThickness : 15,
          barPercentage: 9.0,
          categoryPercentage: 9.0,
          ticks: {
              autoSkip: false,
              // fontStyle: 'bold',
              fontSize: '13',
              fontColor: '#1b4b7b',
              maxRotation: 90,
              minRotation: 90
          }
      }],

      yAxes: [{
          stacked: false,
          gridLines: {
              drawOnChartArea: false,
              color: '#1b4b7b',
              zeroLineColors: '#1b4b7b',
              // borderDash : [5,5]
          },
          ticks: {
              beginAtZero: true,
              // fontStyle: 'bold',
              fontSize: '12',
              fontColor: '#1b4b7b',
              // stepSize: 100,
              // callback:(value, index, values)=>{
              //     return `${value} %`
              // }
          }
      }]
  }
}

  return (
    <div className="row  bg-white p-2 m-1 border "  >
      <div className="col-12 col-lg-6 py-1 " >

        <span className="text-dark  py-4 heading_fontsize_first">Category wise project</span>
      
      </div>
      
      <div className="col-12 col-lg-12 p-2 mx-auto" style={{overflowX:'auto'}}>
       <Bar
              options={FirstCompBar}
              data={FirstCompdata}
              height={'200px'}
            />
       </div>


    </div>
  )
}