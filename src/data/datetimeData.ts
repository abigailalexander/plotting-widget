import { DataSet, DataPoint } from "../widgets/types"

// Sample data - day interva;s
export const dateOne: DataSet = {
    label: {
      key: "first",
      color: "green"
    },
    values: generateDateData(86400000)};
  
export const dateTwo: DataSet = {
    label: {
      key: "second",
      color: "red"
    },
    values: generateDateData(86400000)};

// 5 minute intervals 

export const dateThree: DataSet = {
    label: {
        key: "third",
        color: "blue"
    },
    values: generateTimeData(300000)};

export const dateFour: DataSet = {
    label: {
        key: "fourth",
        color: "yellow"
    },
    values: generateTimeData(300000)};

export const dateFive: DataSet = {
    label: {
        key: "fifth",
        color: "black"
    },
    values: generateTimeData(300000)};

/**
 * Generates dataset dates
 * @param interval time interval between data in milliseconds
 * @returns 
 */
function generateDateData(interval: number): any[] {
    let date_ms: number = Date.now()
    console.log(date_ms)
    const dataArray = []
    for(let i: number = 0; i < 50; i++){
        let dataObj: DataPoint = {x: 0, y: 0}
        let _date = new Date(date_ms).toDateString()
        dataObj.x = _date
        dataObj.y = Math.random() * 1000
        dataArray.push(dataObj)
        date_ms += interval
    };
    return dataArray
}


/**
 * Generates dataset times
 * @param interval time interval between data in milliseconds
 * @returns 
 */
 function generateTimeData(interval: number): any[] {
    let date_ms: number = Date.now()
    console.log(date_ms)
    const dataArray = []
    for(let i: number = 0; i < 50; i++){
        let dataObj: DataPoint = {x: 0, y: 0}
        let _date = new Date(date_ms).toLocaleTimeString()
        dataObj.x = _date
        dataObj.y = Math.random() * 1000
        dataArray.push(dataObj)
        date_ms += interval
    };
    return dataArray
}