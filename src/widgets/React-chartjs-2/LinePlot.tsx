import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import type {ChartData, ChartOptions, ScatterDataPoint} from "chart.js"
import {Chart, registerables} from "chart.js"
import { ChartjsLineComponentProps } from "../types";
import { DataSet } from "../types";
import { findYAxisLimit } from "../../utils";
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
  console.log(allData)

  // here we return the actual chart
  return (
      <Line
        data={allData}
      />
    );
}

function createDataset(dataSets: DataSet[], xName: string, yName: string, symbol?: string): ChartData<"line"> {
    // create correct data format for react-chartjs-2
    let newDataSets: ChartData<"line"> = {datasets: []}
    newDataSets.labels = dataSets[0].values.map(point => point[xName as keyof typeof point])
    dataSets.map(dataSet => (
        newDataSets.datasets.push({
            label: dataSet.label.key,
            data: dataSet.values.map(point => point[yName as keyof typeof point]), 
            fill: false,
            borderColor: dataSet.label.color,
            pointStyle: symbol,
            showLine: true,
            xAxisID: xName,
            yAxisID: yName,
        })
    ))
    return newDataSets;
}
