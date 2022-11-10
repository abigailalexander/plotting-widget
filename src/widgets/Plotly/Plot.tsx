import React, {useState} from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";

export const PlotlyLineChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
    const { //get props
      name
    } = props;
  
    // here we return the actual chart
    return (
        <>
        <h1 className="text-heading">
            Line Chart Using Plotly
        </h1>
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              marker: {color: 'red'},
            },
          ]}
          layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
        />
        </>
      );
  }