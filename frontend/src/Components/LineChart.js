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

import React, {useEffect,useState} from "react";
import { Area } from "@ant-design/charts";
import stockService from "../services/stock-service";
import { useLocation } from "react-router";

const DemoLine = () => {
  // get one stock info
  let [sourceData,setsourceData] = useState([])
  const location = useLocation();
  useEffect(()=>{
    console.log("coming to linechart effect")
    let reg = /\b\d+\b$/;
    let stockId = reg.exec(location.pathname)[0];
    stockService.getOneStockById(stockId).then((res)=>{
      console.log(res.data.data)
      let historyData = res.data.data
      const showData = historyData.map((ele)=>{
        let date = new Date(ele.tradeDate);
        let changeDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        let newElement = {
          Date:changeDate,
          Price:ele.closedPrice
        }
        return newElement
      })
      console.log(showData)
      setsourceData(showData)
  
    })
  },[])
  useEffect(()=>{console.log(sourceData)},[sourceData])
  // stockService.getOneStockById()
  var config = {
    data: sourceData,
    xField: "Date",
    yField: "Price",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    color: "#009e4e",
    areaStyle: function areaStyle() {
      return { fill: "l(270) 0.3:#ffffff 0.7:#a6dab9 1:#009e4e" };
    },
    slider: {
      start: 0.2,
      end: 1,
      trendCfg: { isArea: true },
    },
  };
  return <Area {...config} />;
};

function LineChart(props) {
  return (
    <div
      className=''
      style={{ height: "12rem", maxWidth: "40rem", marginTop: "1rem" }}
    >
      <DemoLine />
    </div>
  );
}

export default LineChart;
