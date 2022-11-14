import React, {useEffect, useState, useRef} from "react";
import Plot from 'react-plotly.js';
import { PlotlyLineComponentProps } from "../types";
import { DataSet } from "../types";

export const PlotlyLineChartComponent = (props: PlotlyLineComponentProps): JSX.Element => {
  const { //get props
    mode,
    width,
    height,
    data,
    xName,
    yName,
    xLabel,
    yLabel,
    yLimit
  } = props;

  let firstData = createLines(data, xName, yName)
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
        newData[i].x.push(newData[i].x.length)
        newData[i].y.push(newData[i].y[newData[i].y.length -1] + 20)
      }
    }
    setAllData(newData);
    console.log(allData)
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
              range: yLimit
          },
        datarevision: revision}
        }
        revision={revision}
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
            mode: 'lines',
            marker: {
              color: dataSet.label.color, 
              symbol: "circle" 
            },
        })
    ))
    return traces
}


function useInterval(callback: any, delay: number) {
  const savedCallback: any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}