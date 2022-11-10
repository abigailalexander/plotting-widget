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
  
export const LineChartComponent = (props: LineComponentProps): JSX.Element => {
  const { //get props
    width,
    height,
    data,
    oxLabel,
    oyLabel,
    dataKey,
    yLimit
  } = props;
  // want to extract all labels
  let labels = data.map(a => a.label)
  // want to change all "y" to "label"
  let allData = combineData(data)
  console.log(allData)
  // want to compile all data into single array? with label name as y
  // so ta
  // what does this do?
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
          Line Chart Using Rechart
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={allData} //set up data that goes into plot
                  width={width} //was 600
                  height={height} // was 300
                  margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid />
                  <XAxis dataKey={dataKey} dy={10} dx={20}>
                    <Label value={oxLabel}/>
                  </XAxis>
                  <YAxis>type="number" domain={yLimit}
                    <Label
                      value={oyLabel}
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
function combineData(dataSets: DataSet[]): any[] {
  let combinedDataSet: any[] = [];
  dataSets.forEach((dataSet) => {
    // so for each dataset, want to check if x exists in
    // combined dataset, if yes then append label for y
    // if not, then create new object in array that has x
    // and label y
    dataSet.values.forEach((data) => {
      let updatedData = {x: data.x, [dataSet.label.key]: data.y}
      // find index of x if it exists already in combined dataset
      let i = combinedDataSet.findIndex(e => e.x === data.x)
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

