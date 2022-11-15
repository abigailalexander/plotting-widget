import React from "react";
import { ScatterChartComponent } from '../widgets/Recharts/ScatterPlot';
import {firstData, secondData, thirdData, fourthData, fifthData} from "../data/basicData"
import {dateOne, dateTwo, dateThree, dateFour, dateFive} from "../data/datetimeData"

const ScatterPlots = () => {
  return (
    <>
      <ScatterChartComponent 
      mode="cycle"
      data= {[firstData, dateFour]}
      width= {600}
      height = {300}
      dataKey= "x"
      xName="y"
      yName="plagueVictims"
      yLabel= "Number of plague victims"
      xLabel= "KWh"
      />
    </>
  );
};

export default ScatterPlots;