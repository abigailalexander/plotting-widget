import { DataSet } from "../widgets/types"

// Sample chart data
export const firstData: DataSet = {
    label: {
      key: "first",
      color: "green"
    },
    values: generateData(5.4)};
  
export const secondData: DataSet = {
    label: {
      key: "second",
      color: "red"
    },
    values: generateData(11.2)};

export const thirdData: DataSet = {
    label: {
        key: "third",
        color: "blue"
    },
    values: generateData(6.2)};

export const fourthData: DataSet = {
    label: {
        key: "fourth",
        color: "yellow"
    },
    values: generateData(9.7)};

export const fifthData: DataSet = {
    label: {
        key: "fifth",
        color: "black"
    },
    values: generateData(1.3)};


function generateData(interval: number): any[] {
    let k: number = Math.random() * 10000
    const dataArray = []
    for(let i: number = 0; i < 200; i++){
        let dataObj = {x: 0, y: 0}
        dataObj.x = i
        dataObj.y = k
        dataArray.push(dataObj)
        k += interval
    }
    return dataArray
}

function generateRandomData(): any[] {
    const dataArray = []
    // want to iterate over and 
    for(let i: number = 0; i < 500; i++){
        let dataObj = {x: 0, y: 0}
        dataObj.x = i
        dataObj.y = Math.random() * 10000
        dataArray.push(dataObj)
    }
    return dataArray
}