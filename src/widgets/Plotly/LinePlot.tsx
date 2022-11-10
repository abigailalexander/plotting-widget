import React, {useState} from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";
import { DataSet } from "../types";

export const PlotlyLineChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
    const { //get props
      width,
      height,
      data,
      xLabel,
      yLabel,
      yLimit
    } = props;
  
    // here we return the actual chart
    return (
        <Plot
          data={createLines(data)}
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

function createLines(dataSets: DataSet[]): any[] {
    let traces: any[] = [];
    dataSets.map(dataSet => (
        traces.push({
            name: dataSet.label.key,
            x: dataSet.values.map(point => point.x), 
            y: dataSet.values.map(point => point.y),
            type: 'scatter',
            mode: 'lines',
            marker: {color: dataSet.label.color},
        })
    ))
    return traces
}