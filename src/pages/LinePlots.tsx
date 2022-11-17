import React from "react";
import { LineChartComponent } from "../widgets/Recharts/LinePlot";
import { PlotlyLineChartComponent } from '../widgets/Plotly/LinePlot';
import { ChartjsLineChartComponent } from "../widgets/React-chartjs-2/LinePlot";
import { VictoryLineChartComponent } from "../widgets/Victory/LinePlot";
import {firstData, secondData, thirdData, fourthData, fifthData} from "../data/basicData"

const LinePlots = () => {
  return (
    <>
      <LineChartComponent 
      mode="cycle"
      dataAmount={500} 
      intervalSize={50}
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {600}
      height = {300}
      dataKey= "x"
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 10000]}
      />
      <PlotlyLineChartComponent
      mode="cycle"
      dataAmount={500}
      symbol="circle"
      type="lines"
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yInterval= {100}
      />
      <ChartjsLineChartComponent
      mode="cycle"
      dataAmount={500}
      symbol="circle"
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yInterval={100}
      />
      <VictoryLineChartComponent
      mode="cycle"
      dataAmount={500}
      symbol="circle"
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yInterval={100}/>
      <LineChartComponent 
      mode="add"
      dataAmount={500} 
      intervalSize={50}
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {600}
      height = {300}
      dataKey= "x"
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 10000]}
      />
      <PlotlyLineChartComponent
      mode="add"
      dataAmount={500}
      symbol="circle"
      type="lines"
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yInterval={100}
      />
      <VictoryLineChartComponent
      mode="add"
      dataAmount={500}
      symbol="circle"
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yInterval={100}/>
    </>
  );
};

export default LinePlots;