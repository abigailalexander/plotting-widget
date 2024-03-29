import React, {useState} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ResponsiveContainer,
} from "recharts";
import { LineComponentProps, DataSet } from "../types";
import { setTickIntervals } from "../../utils";
  
export const TimeSeriesChartComponent = (props: LineComponentProps): JSX.Element => {
  const { //get props
    dataAmount,
    intervalSize,
    width,
    height,
    data,
    xName,
    yName,
    xLabel,
    yLabel,
    dataKey,
  } = props;
  // want to extract all labels
  let labels = data.map(a => a.label)
  // want to change all "y" to "label"
  let allData = combineData(data, xName, yName)
  //console.log(allData)
  // this sets up state for showing/hiding traces
  const [lineProps, setLineProps] = useState(
      labels.reduce(
        (a: any, { key }: any) => {
          a[key] = false;
          return a;
        },
        { hover: null }
      )
    );

  // 
  const handleLegendMouseEnter = (e: any) => {
    if (!lineProps[e.dataKey]) {
      setLineProps({ ...lineProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e: any) => {
    setLineProps({ ...lineProps, hover: null });
  };

  const selectLine = (e: any) => {
    setLineProps({
      ...lineProps,
      [e.dataKey]: !lineProps[e.dataKey],
      hover: null
    });
  };

  // here we return the actual chart
  return (
      <>
      <h1 className="text-heading">
          Time Series Chart Using Rechart
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={allData} //set up data that goes into plot
                  width={width} //was 600
                  height={height} // was 300
                  margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid />
                  <XAxis dataKey={dataKey} dy={10} dx={20}
                  ticks={setTickIntervals(allData, intervalSize)}
                  tickCount={setTickIntervals(allData, intervalSize).length}>
                    <Label value={xLabel}/>
                  </XAxis>
                  <YAxis>type="number"
                    <Label
                      value={yLabel}
                      position="left"
                      angle={-90}
                      dy={-20}
                      dx={-10}
                    />
                  </YAxis>
                  <Legend 
                    onClick={selectLine}
                    onMouseOver={handleLegendMouseEnter}
                    onMouseOut={handleLegendMouseLeave}
                  />
                  <Tooltip />
                  {labels.map((label: any, index: number) => (
                    <Line
                      key={index}
                      dataKey={label.key}
                      fill={label.color}
                      stroke={label.color}
                      hide={lineProps[label.key] === true}
                      fillOpacity={Number(
                        lineProps.hover === label.key || !lineProps.hover ? 1 : 0.6
                      )}
                    />
                  ))}
              </LineChart>
          </ResponsiveContainer>
      </>  
  );
}


/**
 * Mutate and combine individual datasets into one
 * dataset with x and dataset name as variables. This is
 * a more complex method that properly combines each datasets
 * data objects, might not be necessary?
 * @param dataSets array of datasets 
 */
function combineData(dataSets: DataSet[], xName: string, yName: string): any[] {
  let _dataSets = [...dataSets]
  let combinedDataSet: any[] = [];
  _dataSets.forEach((dataSet) => {
    // so for each dataset, want to check if x exists in
    // combined dataset, if yes then append label for y
    // if not, then create new object in array that has x
    // and label y
    dataSet.values.forEach((data) => {
      let updatedData = {x: data[xName as keyof typeof data], [dataSet.label.key]: data[yName as keyof typeof data]}
      // find index of x if it exists already in combined dataset
      let i = combinedDataSet.findIndex(e => e.x === data[xName as keyof typeof data])
      if (i > -1){
        // it exists, now we need to append to it
        let newData = {...combinedDataSet[i], ...updatedData}
        combinedDataSet[i] = newData
      }
      else {
        // doesn't exist, so we add it in
        combinedDataSet.push(updatedData)
      }
    })
  });
  return combinedDataSet
}

