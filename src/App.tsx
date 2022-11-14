import React from 'react';
import './App.css';
import { LineChartComponent } from "./widgets/Recharts/LinePlot";
import { PlotlyLineChartComponent } from './widgets/Plotly/LinePlot';
import { PlotlyTimeSeriesChartComponent } from './widgets/Plotly/TimeSeriesPlot';
import { TimeSeriesChartComponent } from './widgets/Recharts/TImeSeriesPlot';
import { ScatterChartComponent } from './widgets/Recharts/ScatterPlot';
import {firstData, secondData} from "./data/basicData"
import {dateOne, dateTwo, dateThree, dateFour, dateFive} from "./data/datetimeData"

function App() {
  return (
    <div className="App">
      <LineChartComponent 
      data= {[firstData, secondData]}
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
      data= {[firstData, secondData]}
      width= {1600}
      height = {750}
      xName="x"
      yName="y"
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 15000]}
      />
      <TimeSeriesChartComponent 
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
      data= {[dateOne, dateTwo]}
      width= {1600}
      height = {750}
      xName="date"
      yName="rats"
      yLabel= "Number of rats"
      xLabel= "Date"
      />
      <PlotlyTimeSeriesChartComponent
      data= {[dateThree, dateFour, dateFive]}
      width= {1600}
      height = {750}
      xName="date"
      yName="plagueVictims"
      yLabel= "Number of plague victims"
      xLabel= "Time"
      />
      <ScatterChartComponent 
      data= {[firstData, dateFour]}
      width= {600}
      height = {300}
      dataKey= "x"
      xName="x"
      yName="plagueVictims"
      yLabel= "Number of plague victims"
      xLabel= "KWh"
      />
    </div>
  );
}

export default App;
