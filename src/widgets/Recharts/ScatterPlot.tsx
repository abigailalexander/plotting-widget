import React, {useState} from "react";
import {
    ScatterChart,
    Scatter,
    Label,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { LineComponentProps, DataSet } from "../types";
import { setTickIntervals } from "../../utils";
  
export const ScatterChartComponent = (props: LineComponentProps): JSX.Element => {
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
  // want single label for combined dataset
  let labels = [{
    key: "plagueVictims",
    color: "green"
  }]
  // create our combined data
  let allData = combineData(data, xName, yName)
  // this sets up state for showing/hiding traces
  const [scatterProps, setScatterProps] = useState(
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
    if (!scatterProps[e.dataKey]) {
      setScatterProps({ ...scatterProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e: any) => {
    setScatterProps({ ...scatterProps, hover: null });
  };

  const selectLine = (e: any) => {
    setScatterProps({
      ...scatterProps,
      [e.dataKey]: !scatterProps[e.dataKey],
      hover: null
    });
  };

  // here we return the actual chart
  return (
      <>
      <h1 className="text-heading">
          Scatter Chart Using Rechart (combining 2 datasets)
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
              <ScatterChart data={allData} //set up data that goes into plot
                  width={width} //was 600
                  height={height} // was 300
                  margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid />
                  <XAxis dataKey={dataKey} interval={'preserveStartEnd'} type="number"
                  ticks={setTickIntervals(allData, intervalSize)}
                  tickCount={setTickIntervals(allData, intervalSize).length}
                  domain={[allData.at(0).x, allData.at(-1).x]}>
                    <Label value={xLabel}/>
                  </XAxis>
                  <YAxis>type="number"
                    <Label
                      value={yLabel}
                      angle={-90}
                    />
                  </YAxis>
                  <Legend 
                    // handles show/hide traces
                    onClick={selectLine}
                    onMouseOver={handleLegendMouseEnter}
                    onMouseOut={handleLegendMouseLeave}
                  />
                  <Tooltip />
                  {labels.map((label: any, index: number) => (
                    <Scatter
                      key={index}
                      dataKey={label.key}
                      fill={label.color}
                      stroke={label.color}
                      hide={scatterProps[label.key] === true}
                      fillOpacity={Number(
                        scatterProps.hover === label.key || !scatterProps.hover ? 1 : 0.6
                      )}
                    />
                  ))}
              </ScatterChart>
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
  // extract the values we actually need into arrays
  let xArray = _dataSets[0].values.map(a => a[xName as keyof typeof a])
  let yArray = _dataSets[1].values.map(a => a[yName as keyof typeof a])
  // create object with our new data
  for (let i: number = 0; i < xArray.length; i++){
    let dataObj = {
        x: xArray[i],
        [yName]: yArray[i]
    }
    combinedDataSet.push(dataObj)
  }
  return combinedDataSet
}
