import React from "react";
import { LineChartComponent } from "../widgets/Recharts/LinePlot";
import { PlotlyLineChartComponent } from '../widgets/Plotly/LinePlot';
import {firstData, secondData, thirdData, fourthData, fifthData} from "../data/basicData"

const LinePlots = () => {
  return (
    <>
      <LineChartComponent 
      mode="cycle"
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
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 15000]}
      />
      <LineChartComponent 
      mode="add"
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
      data= {[firstData, secondData, thirdData, fourthData, fifthData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 15000]}
      />
    </>
  );
};

export default LinePlots;