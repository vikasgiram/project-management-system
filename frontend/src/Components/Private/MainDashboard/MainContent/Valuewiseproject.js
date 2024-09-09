import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

// Customize chart legend (if needed)
Chart.Legend.prototype.afterFit = function () {
  this.height = this.height + 40;
};


export const Valuewiseproject = ({forBarData}) => {

  
  
 
//   useEffect(() => {
//     fetchValuewise();
//   }, []); 

//   const fetchValuewise=async()=>{          
//     const data =await fetch("api/company/dashboard");
                            
//     const json =await data.json();
//     // console.log("valueWiseProjectData",json.valueWiseProjectData);
//     setForBarData(json.valueWiseProjectData);   
// }
//     // console.log("chart",forBarData);
  
const rangeData=forBarData.map((data) => data.range);
const inProcessData=forBarData.map((data) => data.inprocess);
const completedData=forBarData.map((data) => data.finished);
const upcomingData=forBarData.map((data) => data.upcoming);

// console.log("rangeData",rangeData,"inProcess", inProcessData, "completed",completedData,"upcoming", upcomingData);

  const FirstCompdata = {
    labels: rangeData,
    datasets: [
      {
        label: 'Inprocess',
        data: inProcessData,
        fill: true,
        backgroundColor: '#4791FF',
      },
      {
        label: 'Completed',
        data: completedData,
        fill: true,
        backgroundColor: '#02BC77',
      },
      {
        label: 'Upcoming',
        data: upcomingData,
        fill: true,
        backgroundColor: '#FF9123',
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
      },
    },
    legend: {
      display: true,
      position: 'top',
      align: 'start',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        rotation: -90, // Rotate the labels to be vertical
        color: 'black',
      },
      labels: {
        render: 'value',
        fontColor: 'black',
      },
      outlabels: {
        color: "black",
        stretch: 25,
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 16,
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          drawOnChartArea: false,
          color: '#1b4b7b',
          zeroLineColor: '#1b4b7b',
        },
        barThickness: 15,
        barPercentage: 0.9,
        categoryPercentage: 0.9,
        ticks: {
          autoSkip: false,
          font: {
            size: 13,
            color: '#1b4b7b',
          },
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        stacked: false,
        grid: {
          drawOnChartArea: false,
          color: '#1b4b7b',
          zeroLineColor: '#1b4b7b',
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 12,
            color: '#1b4b7b',
          },
        },
      },
    },
  };

  // Render the component
  return (
    <div className="row bg-white p-2 m-1 border">
      <div className="col-12 col-lg-8 py-1">
        <span className="text-dark py-4 heading_fontsize_first">Value wise project</span>
      </div>
      <div className="col-12 col-lg-12 p-2 mx-auto" style={{ overflowX: 'auto' }}>
        <Bar
          options={FirstCompBar}
          data={FirstCompdata}
          height={'200px'}
        />
      </div>
    </div>
  );
};