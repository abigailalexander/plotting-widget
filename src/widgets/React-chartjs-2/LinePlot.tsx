import React, {useState} from "react";
import { Line } from "react-chartjs-2";
import type {ChartData, ChartOptions, ScatterDataPoint} from "chart.js"
import {Chart, registerables} from "chart.js"
import { ChartjsLineComponentProps } from "../types";
import { DataSet } from "../types";
import { findYAxisLimitChartjs, useInterval } from "../../utils";
Chart.register(...registerables);


export const ChartjsLineChartComponent = (props: ChartjsLineComponentProps): JSX.Element => {
  const { //get props
    mode,
    dataAmount,
    symbol,
    width,
    height,
    data,
    xName,
    yName,
    xLabel,
    yLabel,
    yInterval
  } = props;

  let firstData = createDataset(data, xName, yName, symbol)
  let [allData, setAllData] = useState(firstData)

  // setInterval and react hooks don't work normally together,
  // so this is a necessary workaround
  useInterval(() => {    
    // we want to cycle the data around but ONLY for y values
    let newData: ChartData<"line"> = {...allData};
    if (mode === "cycle"){
        // so to cycle around here we want to iterate over
        //datasets and move y values
      newData.datasets.forEach((dataset) => 
        // cycle the y values around
        dataset.data.push.apply(dataset.data, dataset.data.splice(0,1))
      ) 
    }
    else{
      // didn't bother with this since can't get plot right anyway
      /*
      for (let i: number = 0; i < newData.length; i++){
        newData[i].x.push(newData[i].x.at(-1) + 1)
        newData[i].y.push(newData[i].y.at(-1) + 20)
        // ensure max 500 points plotted
        newData[i].x = newData[i].x.slice(-dataAmount)
        newData[i].y = newData[i].y.slice(-dataAmount)
      }*/
    }
    setAllData(newData);
    }, 100);


  let labels = allData.labels
  // here we return the actual chart
  return (
      <Line
        data={allData}
        options={{
            plugins: {
                title: {
                    display: true,
                    align: "center",
                    text: "Line Chart for Chartjs"
                },
                legend: {
                    display: true,
                    position: "top",
                },
            },
            scales: {
                y: {
                  //min: findYAxisLimitChartjs(allData.datasets, yInterval)[0],
                  //max: findYAxisLimitChartjs(allData.datasets,yInterval)[1],
                  title: {
                    display: true,
                    text: yLabel
                  },
                  min: 0,
                  max: 15000,
                  beginAtZero: false,
                  // I couldn't get this to work at all...
                  /*
                  ticks: {
                    callback: (t, i) => i % yInterval ? "": labels[i]
                  }*/
                },
                x: {
                    title: {
                        display: true,
                        text: xLabel
                    },
                    min: 0,
                    max: 500,
                    beginAtZero: false,
                    // Doesn't work, can't seem to set tick spacing
                    /*
                    grid: {
                        tickColor: labels.map((l, i) => i % 3 ? null : 'lightgray')
                    },
                    ticks: {
                        display: true,
                        callback: (t, i) => i % 50 ? "": labels[i]
                    }*/
                }
            }
        }}
      />
    );
}

// split y data into .datasets[] and x data into .labels...
function createDataset(dataSets: DataSet[], xName: string, yName: string, symbol?: string): ChartData<"line"> {
    let _dataSets = [...dataSets]
    // create correct data format for react-chartjs-2
    let newDataSets: ChartData<"line"> = {datasets: []}
    newDataSets.labels = _dataSets[0].values.map(point => point[xName as keyof typeof point])
    _dataSets.map(dataSet => (
        newDataSets.datasets.push({
            label: dataSet.label.key,
            data: dataSet.values.map(point => point[yName as keyof typeof point]), 
            fill: false,
            borderColor: dataSet.label.color,
            pointStyle: symbol,
            showLine: true,
            //xAxisID: xName,
            //yAxisID: yName,
        })
    ))
    return newDataSets;
}
