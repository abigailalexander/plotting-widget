import React from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";
import { DataSet } from "../types";

export const PlotlyTimeSeriesChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
    const { //get props
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
    } = props;
    //console.log(data)
    // here we return the actual chart
    // plotly is able to parse datetimes from strings
    return (
        <Plot
          data={createLines(data, xName, yName, type, symbol)}
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