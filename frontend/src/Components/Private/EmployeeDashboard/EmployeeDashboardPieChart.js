
import Chart from "react-google-charts"



export const CompanyInfEmployeeDashboardPieChartoPieChart = () => {

  const data = [
    ["Projects", "Hours per Day"],
    ["Finish", "30"],
    ["Inprocess", "20" ],
    ["Upcoming", "10"],
  ];

  const options = {
    pieSliceText: "label",
    is3D: true,
    pieSliceText: 'percentage',
    chartArea: {
      height: "100%",
      width: "100%",
      backgroundColor: {
        opacity: 0
      },
    },
    slices: { 0: { color: '#80C783' }, 1: { color: '#56AFFE' }, 2: { color: '#F0BC5E' } } //56AFFE


  };


  return (
    <>
      <div className="col-12 col-lg-4 p-2 mx-auto" >
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
        />
      </div>

    </>
  )
}