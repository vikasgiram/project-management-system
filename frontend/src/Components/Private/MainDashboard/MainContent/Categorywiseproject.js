import { Bar } from "react-chartjs-2";

export const Categorywiseproject = ({ categorywise }) => {
  // Extract category data directly from props
  const categories = Object.keys(categorywise);
  const inprocessData = categories.map(category => categorywise[category].inprocess);
  const completedData = categories.map(category => categorywise[category].finished);
  const upcomingData = categories.map(category => categorywise[category].upcoming);

  console.log(categories,"categories", inprocessData,"inprocessData", completedData,"completedData", upcomingData,"upcomingData");
  

  const FirstCompdata = {
    labels: categories,
    datasets: [
      {
        label: 'Inprocess',
        data: inprocessData,
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
    scales: {
      x: {
        stacked: false,
        grid: {
          drawOnChartArea: false,
        },
        barThickness: 10,
        ticks: {
          autoSkip: false,
          fontSize: 13,
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        stacked: false,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="row bg-white p-2 m-1 border">
      <div className="col-12 col-lg-6 py-1">
        <span className="text-dark py-4 heading_fontsize_first">Category wise project</span>
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
};
