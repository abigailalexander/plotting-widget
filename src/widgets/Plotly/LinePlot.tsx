import React, {useState} from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";
import { DataSet } from "../types";

export const PlotlyLineChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
    const { //get props
      width,
      height,
      data,
      xName,
      yName,
      xLabel,
      yLabel,
      yLimit
    } = props;
  
    // here we return the actual chart
    return (
        <Plot
          data={createLines(data, xName, yName)}
          layout={
            {width: width, 
            height: height, 
            title: 'Line Chart Using Plotly',
            xaxis: {
                title: xLabel
            },
            yaxis: {
                title: yLabel,
                range: yLimit
            }}
          }
        />
      );
  }

function createLines(dataSets: DataSet[], xName: string, yName: string): any[] {
    let traces: any[] = [];
    dataSets.map(dataSet => (
        traces.push({
            name: dataSet.label.key,
            x: dataSet.values.map(point => point[xName as keyof typeof point]), 
            y: dataSet.values.map(point => point[yName as keyof typeof point]),
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: dataSet.label.color, 
              symbol: "circle-open-dot" 
            },
        })
    ))
    return traces
}