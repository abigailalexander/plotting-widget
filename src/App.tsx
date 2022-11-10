import React from 'react';
import './App.css';
import { LineChartComponent } from "./widgets/Recharts/LinePlot";
import { PlotlyLineChartComponent } from './widgets/Plotly/LinePlot';
import {inputData, moreData} from "./data"

function App() {
  return (
    <div className="App">
      <LineChartComponent 
      data= {[inputData, moreData]}
      width= {600}
      height = {300}
      dataKey= "x"
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 20000]}
      />
      <PlotlyLineChartComponent
      data= {[inputData, moreData]}
      width= {1600}
      height = {750}
      yLabel= "KWh"
      xLabel= "hours"
      yLimit= {[0, 10000]}
      />
    </div>
  );
}

export default App;
