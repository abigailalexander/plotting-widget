import React from "react";
import { TimeSeriesChartComponent } from '../widgets/Recharts/TImeSeriesPlot';
import { PlotlyTimeSeriesChartComponent } from '../widgets/Plotly/TimeSeriesPlot';
import {dateOne, dateTwo, dateThree, dateFour, dateFive} from "../data/datetimeData"

const TimeSeriesPlots = () => {
  return (
    <>
      <TimeSeriesChartComponent 
      mode="cycle"
      data= {[dateOne, dateTwo]}
      width= {600}
      height = {300}
      dataKey= "x"
      xName="date"
      yName="rats"
      yLabel= "Number of rats"
      xLabel= "Date"
      />
      <TimeSeriesChartComponent 
      mode="cycle"
      data= {[dateThree, dateFour, dateFive]}
      width= {600}
      height = {300}
      dataKey= "x"
      xName="date"
      yName="plagueVictims"
      yLabel= "Number of plague victims"
      xLabel= "Time"
      />
      <PlotlyTimeSeriesChartComponent
      mode="cycle"
      data= {[dateOne, dateTwo]}
      width= {1600}
      height = {750}
      xName="date"
      yName="rats"
      yLabel= "Number of rats"
      xLabel= "Date"
      />
      <PlotlyTimeSeriesChartComponent
      mode="cycle"
      data= {[dateThree, dateFour, dateFive]}
      width= {1600}
      height = {750}
      xName="date"
      yName="plagueVictims"
      yLabel= "Number of plague victims"
      xLabel= "Time"
      />
    </>
  );
};

export default TimeSeriesPlots;