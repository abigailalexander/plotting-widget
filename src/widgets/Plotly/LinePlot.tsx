import React, {useState} from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";
import { DataSet } from "../types";
import { findYAxisLimit, useInterval } from "../../utils";

export const PlotlyLineChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
  const { //get props
    mode,
    dataAmount,
    symbol,
    type,
    width,
    height,
    data,
    xName,
    yName,
    xLabel,
    yLabel,
    yInterval
  } = props;
  let firstData = createLines(data, xName, yName, type, symbol)
  let [allData, setAllData] = useState(firstData)
  let [revision, setRevision] = useState(0)


  // setInterval and react hooks don't work normally together,
  // so this is a necessary workaround
  useInterval(() => {    
    // we want to cycle the data around but ONLY for y values
    let newData = [...allData];
    if (mode === "cycle"){
      newData.forEach((trace) => 
        // cycle the y values around
        trace.y.push.apply(trace.y, trace.y.splice(0,1))
      ) 
    }
    else{
      // add data instead of cycling
      for (let i: number = 0; i < newData.length; i++){
        newData[i].x.push(newData[i].x.at(-1) + 1)
        newData[i].y.push(newData[i].y.at(-1) + 20)
        // ensure max 500 points plotted
        newData[i].x = newData[i].x.slice(-dataAmount)
        newData[i].y = newData[i].y.slice(-dataAmount)
      }
    }
    setAllData(newData);
    setRevision(revision + 1)
    }, 100);

  // here we return the actual chart
  return (
      <Plot
        data={allData}
        layout={
          {width: width, 
          height: height, 
          title: 'Line Chart Using Plotly',
          xaxis: {
              title: xLabel
          },
          yaxis: {
              title: yLabel,
              range: findYAxisLimit(allData, yInterval)
          },
        datarevision: revision}
        }
        revision={revision}
      />
    );
}

function createLines(dataSets: DataSet[], xName: string, yName: string, type: string, symbol?: string): any[] {
  let _dataSets = [...dataSets]
    let traces: any[] = [];
    _dataSets.map(dataSet => (
        traces.push({
            name: dataSet.label.key,
            x: dataSet.values.map(point => point[xName as keyof typeof point]), 
            y: dataSet.values.map(point => point[yName as keyof typeof point]),
            type: 'scatter',
            mode: type,
            marker: {
              color: dataSet.label.color, 
              symbol: symbol 
            },
        })
    ))
    return traces
}