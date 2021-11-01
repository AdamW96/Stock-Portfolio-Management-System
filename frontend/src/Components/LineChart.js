import React from 'react';
import { Line } from 'react-chartjs-2';
const data = {
  labels: Array(36).fill(1).map((v,k)=>k+1),
  datasets: [
    {
      label: 'Historical price',
      data: [12, 14, 3, 5, 8, 3,12, 19, 3, 5, 2, 3,12, 17, 3, 15, 2, 3,1, 9, 3, 5, 2, 3,2, 9, 3, 5, 2, 13,12, 9, 13, 5, 12, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
export default function LineChart() {
  return (
    <>
    <Line data={data} options={options}/>
  </>
  )
}
