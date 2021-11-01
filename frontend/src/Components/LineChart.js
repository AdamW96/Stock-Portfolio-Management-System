// import React from 'react';
// import { Line } from 'react-chartjs-2';
// const data = {
//   labels: Array(36).fill(1).map((v,k)=>k+1),
//   datasets: [
//     {
//       label: 'Historical price',
//       data: [12, 14, 3, 5, 8, 3,12, 19, 3, 5, 2, 3,12, 17, 3, 15, 2, 3,1, 9, 3, 5, 2, 3,2, 9, 3, 5, 2, 13,12, 9, 13, 5, 12, 3],
//       fill: false,
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgba(255, 99, 132, 0.2)',
//     },
//   ],
// };

// const options = {
//   scales: {
//     y: {
//       beginAtZero: true
//     }
//   }
// };
// export default function LineChart() {
//   return (
//     <>
//     <Line data={data} options={options}/>
//   </>
//   )
// }


import React from 'react';
import { Area } from '@ant-design/charts';


const DemoLine = () => {
  const data = [
    { Date: '2019Q2', HistoricailPrice: 2.9 },
    { Date: '2019Q3', HistoricailPrice: 29.9 },
    { Date: '2019Q4', HistoricailPrice: 2.9 },
    { Date: '2020Q1', HistoricailPrice: 29.9 },
    { Date: '2020Q2E', HistoricailPrice: 17.9 },
    { Date: '2020Q3E', HistoricailPrice: 29.9 },
    { Date: '2020Q4E', HistoricailPrice: 7.9 },
    { Date: '2021Q1E', HistoricailPrice: 29.9 },
  ];

  var config = {
    data: data,
    xField: 'Date',
    yField: 'HistoricailPrice',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    color: '#009e4e',
    areaStyle: function areaStyle() {
      return { fill: 'l(270) 0.3:#ffffff 0.7:#a6dab9 1:#009e4e' };
    },
    slider: {
      start: 0.2,
      end: 1,
      trendCfg: { isArea: true },
    },
  };
  return <Area {...config} />;
};


function LineChart() {

  return (
    <div className="" style={{ height: '12rem', maxWidth:'40rem', marginTop: '1rem' }}>
      <DemoLine />
    </div>

  )
}

export default LineChart

