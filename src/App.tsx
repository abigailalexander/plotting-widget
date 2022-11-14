import React from 'react';
import './App.css';
import { LineChartComponent } from "./widgets/Recharts/LinePlot";
import { PlotlyLineChartComponent } from './widgets/Plotly/LinePlot';
import { PlotlyTimeSeriesChartComponent } from './widgets/Plotly/TimeSeriesPlot';
import { TimeSeriesChartComponent } from './widgets/Recharts/TImeSeriesPlot';
import { ScatterChartComponent } from './widgets/Recharts/ScatterPlot';
import {firstData, secondData, thirdData, fourthData, fifthData} from "./data/basicData"
import {dateOne, dateTwo, dateThree, dateFour, dateFive} from "./data/datetimeData"

function App() {
  return (
    <div className="App">
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
      <ScatterChartComponent 
      mode="cycle"
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
