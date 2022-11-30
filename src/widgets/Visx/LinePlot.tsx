import {useState} from 'react'
import styled from "styled-components";
import { format } from "date-fns";
import { Axis, Grid, LineSeries, Tooltip, XYChart } from "@visx/xychart";
import * as d3 from "d3";
import { VisxLineComponentProps, DataSet, DataPoint } from "../types";
import { useInterval } from "../../utils";

const ChartContainer = styled.div`
  text {
    font-family: "Untitled Sans", sans-serif;
  }

  .visx-axis-tick {
    text {
      font-size: 12px;
      font-weight: 400;
      fill: #666666;
    }
  }
`;

const ColoredSquare = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 8px;
  background: ${({ color }: any) => color};
  border-radius: 4px;
`;

const TooltipContainer = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;

  .row {
    margin-bottom: 8px;
  }
  .row:last-child {
    margin-bottom: 0;
  }
  .date {
    font-size: 12px;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000000;
  }
`;

const accessors = {
  xAccessor: (d: DataPoint) => d.x,
  yAccessor: (d: DataPoint) => d.y
};

export const VisxLineChartComponent = (props: VisxLineComponentProps): JSX.Element =>  {
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
    let labels = data.map(a => a.label)
    console.log("how many times am i called")
    let firstData = createLines(data, xName, yName)
    let [allData, setAllData] = useState(firstData)
    console.log("stopping point")

    // setInterval and react hooks don't work normally together,
    // so this is a necessary workaround
    useInterval(() => {    
        // we want to cycle the data around but ONLY for y values
        let newData = [...allData];
        if (mode === "cycle"){
            newData.forEach(line => {
                line.push.apply(line, line.splice(0, 1))
                for(let i: number = 0; i < line.length; i++){
                    //reset numbers to correct order
                    line.x = i
                }   
            })
        }
        else{
            // add data instead of cycling
            for (let i: number = 0; i < newData.length; i++){
                newData[i].x.push(newData[i].x.at(-1) + 1)
                newData[i].y.push(newData[i].y.at(-1) + 20)
                // ensure max 500 points plotted
                newData[i].x = newData[i].x.slice(-dataAmount)
                newData[i].y = newData[i].y.slice(-dataAmount)
            }
        }
    setAllData(newData);
    }, 100);
    console.log(allData)


    return (
        <ChartContainer>
        <XYChart
            height={height}
            margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
            xScale={{ type: "linear" }}
            yScale={{ type: "linear" }}
        >
            <Grid
            columns={true}
            lineStyle={{
                stroke: "#e1e1e1",
                strokeLinecap: "round",
                strokeWidth: 1
            }}
            strokeDasharray="4"
            />
            <Axis 
            orientation="bottom" 
            tickLabelProps={() => ({ dy: 0 })} 
            label={xLabel}/>
            <Axis
            orientation="left"
            tickLabelProps={() => ({ dx: -0 })}
            label={yLabel}
            />
            {labels.map((label: any, index: number) => (
                <LineSeries
                    stroke={label.color}
                    dataKey={label.key}
                    data={allData[index]}
                    {...accessors}
                />
            ))}
            <Tooltip<DataPoint>
            snapTooltipToDatumX
            snapTooltipToDatumY
            showSeriesGlyphs
            glyphStyle={{
                fill: "black",
                strokeWidth: 0
            }}
            renderTooltip={({ tooltipData }) => {
                return (
                tooltipData && (
                    <TooltipContainer>
                    {Object.entries(tooltipData.datumByKey).map(
                        (lineDataArray, i) => {
                        const [key, value] = lineDataArray;
                        const color = labels.find(obj => obj.key === key)?.color;
                        console.log(color)
                        return (
                            <div className="row" key={key}>
                            {i === 0 && (
                                <div className="x">
                                    {accessors.xAccessor(value.datum)}
                                </div>
                            )}
                            <div className="value">
                                <ColoredSquare color={color} />
                                {accessors.yAccessor(value.datum).toFixed(2)}
                            </div>
                            </div>
                        );
                        }
                    )}
                    </TooltipContainer>
                )
                );
            }}
            />
        </XYChart>
        </ChartContainer>
    );
    }

function createLines(dataSets: DataSet[], xName: string, yName: string): any[] {
    let _dataSets = [...dataSets]
    let lines: any[] = [];
    for (let i = 0; i < _dataSets.length; i++){
        let line: any[] = []
         for(let j=0; j < _dataSets[i].values.length; j++){
            let newData: any = _dataSets[i].values[j]
            line.push(newData)
        }
        line = line.sort((a, b) => (a.x < b.x ? -1: 1))
        console.log(line)
        lines.push(line)
    }
    return lines
}