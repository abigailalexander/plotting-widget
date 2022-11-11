import React from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";
import { DataSet } from "../types";

export const PlotlyTimeSeriesChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
    const { //get props
      width,
      height,
      data,
      xName,
      yName,
      xLabel,
      yLabel,
    } = props;
    console.log(data)
    // here we return the actual chart
    // plotly is able to parse datetimes from strings
    return (
        <Plot
          data={createLines(data, xName, yName)}
          layout={
            {width: width, 
            height: height, 
            title: 'Time Series Chart Using Plotly',
            xaxis: {
                title: xLabel
            },
            yaxis: {
                title: yLabel,
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
              symbol: "diamond" 
            },
        })
    ))
    return traces
}