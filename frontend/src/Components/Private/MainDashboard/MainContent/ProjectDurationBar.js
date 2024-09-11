import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

Chart.Legend.prototype.afterFit = function () {
  this.height = this.height + 40;
};

export const ProjectDurationBar = ({duration}) => {


    const rangeData = duration.map(data => data.range);
    const delayData = duration.map(data => data.delayedProjects);

    const FirstCompdata = {
        labels: rangeData,  
        datasets: [
            {
                label: 'Days',
                data: delayData,  
                fill: true,
                backgroundColor: ['#7F7FD5', '#A3A3D8', '#B7B7CE'],
                borderWidth: 1,
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
                rotation: -90,
                color: 'black',
            },
        },
        scales: {
            xAxes: [{
                stacked: false,
                gridLines: {
                    drawOnChartArea: false,
                    color: '#1b4b7b',
                },
                barThickness: 25,
                barPercentage: 9.0,
                categoryPercentage: 9.0,
                ticks: {
                    autoSkip: false,
                    fontSize: '13',
                    fontColor: '#1b4b7b',
                    maxRotation: 90,
                    minRotation: 90,
                }
            }],
            yAxes: [{
                stacked: false,
                gridLines: {
                    drawOnChartArea: false,
                    color: '#1b4b7b',
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: '12',
                    fontColor: '#1b4b7b',
                }
            }]
        }
    };

    return (
        <div className="row  bg-white p-2 m-1 border">
            <div className="col-12 col-lg-6 py-1">
                <span className="text-dark  py-4 heading_fontsize_first">Project Duration</span>
            </div>
            <div className="col-12 col-lg-12 p-2 mx-auto" style={{ overflowX: 'auto' }}>
                <Bar
                    options={FirstCompBar}
                    data={FirstCompdata}
                    height={'120px'}
                />
            </div>
        </div>
    );
}
