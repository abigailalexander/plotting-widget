import React, {useState} from "react";
import {VictoryLine, 
    VictoryChart, 
    VictoryAxis, 
    VictoryLegend,
    VictoryZoomContainerProps,
    VictoryVoronoiContainerProps,
    createContainer
} from 'victory';
import { VictoryLineComponentProps, DataSet } from "../types";
import { findXAxisLimitVictory, findYAxisLimitVictory, useInterval, setTickIntervalsVictory } from "../../utils";

export const VictoryLineChartComponent = (props: VictoryLineComponentProps): JSX.Element => {
  const { //get props
    mode,
    dataAmount,
    symbol,
    width,
    height,
    data,
    xName,
    yName,
    xLabel,
    yLabel,
    yInterval
  } = props;
  //console.log(data)
  let labels = data.map(a => a.label)
  let firstData = createLines(data, labels)
  let [allData, setAllData] = useState(firstData)


  // setInterval and react hooks don't work normally together,
  // so this is a necessary workaround
  useInterval(() => {    
    // we want to cycle the data around but ONLY for y values
    // so since we have an array of x y objects
    let newData = [...allData];
    if (mode === "cycle"){
      newData.forEach((line) => {
        line.push.apply(line, line.splice(0, 1));
        for(let i: number = 0; i < line.length; i++){
            //reset numbers to correct order
            line[i].x = i
        }   
      })
    }
    else{
        for (let i=0; i < newData.length; i++){
            let newPoint = {...newData[i].at(-1)}
            //console.log(newData[i].at(0))
            newData[i] = newData[i].shift()
            newPoint.x += 1
            newPoint.y += 20
            newData[i].push(newPoint)
        }
        /*
      // add data instead of cycling
      for (let i=0; i < newData.length; i++){
        // line is array of {x, y, l} objects
        let newPoint = {
            x: newData[i].at(-1).x + 1, 
            y: newData[i].at(-1).y + 20,
            l: labels[i].key
        }
        //console.log(newData[i].at(0))
        newData[i].push(newPoint)
        // ensure max 500 points plotted
        //newData[i] = newData[i].slice(-dataAmount)
        //console.log(newData[i].length)
        
      }*/
    }
    setAllData(newData);

    }, 10000);

  let yAxisLimits = findYAxisLimitVictory(allData, yInterval)
  let xAxisLimits = findXAxisLimitVictory(allData, 50)
  // here we return the actual chart
  let legendData: any[] = labels.map((label, i) => (
    {name: label.key, symbol: { fill: label.color, type: symbol}}
  ))
  // create custom component that has zoom and hover tooltip
  const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>('zoom', 'voronoi');
  return (
    <div>
      <h1 className="text-heading">
          Line Chart Using Victory
      </h1>
      <VictoryChart 
        width={width} 
        height={height} 
        title={"Line Chart using Victory"} // not sure what values to set for zoom domain?
        containerComponent={<VictoryZoomVoronoiContainer 
            zoomDomain={{x: [xAxisLimits[0], xAxisLimits[1]], y: [yAxisLimits[0], yAxisLimits[1]]}}
            responsive={false}
            mouseFollowTooltips
            voronoiDimension="x"
            labels={(point: any) => `${point.datum.l}: ${point.datum[yName as keyof typeof point.datum]}`}
        />
        }
      >
      <VictoryAxis
          label={xLabel}
          tickValues={setTickIntervalsVictory(allData, 50)} //
          domain={{x: [xAxisLimits[0], xAxisLimits[1]]}}
          //tickLabelComponent={<VictoryLabel angle={315} />}
          style={{
            grid: { stroke: "lightgray",},
            tickLabels: { fontSize: 15},
            axisLabel: {fontSize: 15},
          }}
      />
      <VictoryAxis 
          dependentAxis //denotes that this is y axis
          label={yLabel}
          domain={{y: [yAxisLimits[0], yAxisLimits[1]]}}
          //tickLabelComponent={<VictoryLabel angle={315} />}
          style={{
            grid: { stroke: "lightgray",},
            tickLabels: { fontSize: 15},
            axisLabel: {fontSize: 15},
          }} 
        />
        <VictoryLegend x={125} y={50}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            height={10}
            style={{ border: { stroke: "white" }, title: {fontSize: 15 }, labels: {fontSize: 15} }}
            data={legendData}
        />
        {allData.map((line: any, index: number) => (
            <VictoryLine
            name={labels[index].key}
            style={
                {
                    data: {stroke: labels[index].color}
                }
            }
            key={labels[index].key}
            data={line}
            x={xName}
            y={yName}
            />
            ))}
      </VictoryChart>
    </div>
    );
}

function createLines(dataSets: DataSet[], labels: any[]): any[] {
    let lines: any[] = [];
    for (let i=0; i < dataSets.length; i++){
        let data: any[] = [...dataSets[i].values]
        // add label for zoronoi container tooltip
        let labelledData = data.map((data) => {
            data.l = labels[i].key
            return data
        })
        lines.push(labelledData)
    }
    return lines
}