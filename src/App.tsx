import React from 'react';
import './App.css';
import { LineChartComponent } from "./widgets/Recharts/Chart";
import { PlotlyLineChartComponent } from './widgets/Plotly/Plot';
import {inputData, moreData} from "./data"

function App() {
  return (
    <div className="App">
      <LineChartComponent 
      data= {[inputData, moreData]}
      width= {600}
      height = {300}
      dataKey= "x"
      oyLabel= "KWh"
      oxLabel= "hours"
      yLimit= {[0, 20000]}
      />
      <PlotlyLineChartComponent
      name= "a thing"
      />
    </div>
  );
}

export default App;
