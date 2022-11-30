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
import { setTickIntervals, useInterval } from "../../utils";
  
export const LineChartComponent = (props: LineComponentProps): JSX.Element => {
  const { //get props
    dataAmount,
    intervalSize,
    mode,
    width,
    height,
    data,
    xName,
    yName,
    xLabel,
    yLabel,
    dataKey,
    yLimit
  } = props;
  // want to extract all labels
  let labels = data.map(a => a.label)
  // want to change all "y" to "label"
  let combinedData = combineData(data, xName, yName)
  let [allData, setAllData] = useState(combinedData)

  // setInterval and react hooks don't work normally together,
  // so this is a necessary workaround
  useInterval(() => {    
    // we want to cycle the data around but ONLY for y values
    let newData = [...allData];
    if (mode === "cycle"){
      newData.push.apply(newData, newData.splice(0, 1));
      for(let i: number = 0; i < newData.length; i++){
        //reset numbers to correct order
        newData[i].x = i
      }   
    }
    else{
      // add data instead of cycling
      // copy last point to create new one
      let newPoint = {...newData.at(-1)}
      // remove first element to keep at 500 points
      newData.shift()
      newPoint.x += 1
      labels.forEach((label, i) => newPoint[label.key as keyof typeof newPoint] += 20)
      newData.push(newPoint)
    }
    setAllData(newData);
    }, 100); // rate of 0.1hz

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
          Line Chart Using Rechart
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={allData} //set up data that goes into plot
                  width={width} //was 600
                  height={height} // was 300
                  margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid /> 
                  <XAxis dataKey={dataKey} 
                  type="number"
                  dy={10} dx={20} //config below shows every 50 ticks, incrementing graph along
                  ticks={setTickIntervals(allData, intervalSize)}
                  tickCount={setTickIntervals(allData, intervalSize).length}
                  domain={[allData.at(0).x, allData.at(-1).x]}>
                    allowDataOverflow={true}
                    <Label value={xLabel}/>
                  </XAxis>
                  <YAxis interval="preserveStartEnd">type="number" domain={yLimit}
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
                      dot={false} //doesnt render dots - useful if refresh rate low
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