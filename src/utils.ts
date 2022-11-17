import {useEffect, useRef} from "react"
/**
 * rounds value down to nearest value given
 * @param nearestNum nearest number to round to
 */
function roundUpToNearest(nearestNum: number, value: number) {
    return Math.ceil(value / nearestNum) * nearestNum;
}

/**
 * rounds value up to nearest value given 
 * @param nearestNum nearest number to round to
 */
function roundDownToNearest(nearestNum: number, value: number) {
    return Math.floor(value / nearestNum) * nearestNum;
}

/**
 * Finds x axis lower and upper limits
 * @param data trace data plotted
 */
export function findXAxisLimit(data: any[], interval: number){
    let lowest = data.at(0).x;
    let highest = data.at(-1).x;
    return [roundDownToNearest(interval, lowest), roundUpToNearest(interval, highest)];
}

// second attempt at setting proper tick intervals for recharts
export function setTickIntervals(data: any[], interval: number){
    let limits: number[] = findXAxisLimit(data, interval)
    let tickIntervals: number[] = []
    // want to find all 50 integer intervals between limits
    for (let i: number = limits[0]+interval; i <= limits[1]-interval; i+=interval){
        tickIntervals.push(i)
    }
    return tickIntervals
}

/**
 * Finds x axis lower and upper limits for victory data
 * @param data trace data plotted
 */
 export function findXAxisLimitVictory(data: any[], interval: number){
    let lowest = data[0].at(0).x;
    let highest = data[0].at(-1).x;
    //console.log(lowest)
    return [roundDownToNearest(interval, lowest), roundUpToNearest(interval, highest)];
}

//setting proper tick intervals for victory
export function setTickIntervalsVictory(data: any[], interval: number){
    let limits: number[] = findXAxisLimitVictory(data, interval)
    let tickIntervals: number[] = []
    // want to find all 50 integer intervals between limits
    for (let i: number = limits[0]+interval; i <= limits[1]-interval; i+=interval){
        tickIntervals.push(i)
    }
    return tickIntervals
}

// find min and max y values for plotly
/**
 * find min and max y axis values for plotly
 * messsy way of doing it but who cares
 * @param data array of traces
 */
export function findYAxisLimit(data: any[], interval: number){
    let allTraceData: number[] = []
    data.map(trace => (
        allTraceData.push(trace.y)
    ))
    const min = Math.min.apply(null, allTraceData)
    const max = Math.max.apply(null, allTraceData)
    return [0, roundUpToNearest(max, interval)]
}

// find min and max y values for plotly
/**
 * find min and max y axis values for plotly
 * messsy way of doing it but who cares
 * @param data array of traces
 */
 export function findYAxisLimitVictory(data: any[], interval: number){
    let allLineData: number[] = []
    for(let i=0; i < data.length; i++){
        let line = data[i]
        let yData = line.map((yData: any, i: number) => yData.y)
        allLineData.push(...yData)
    }
    const min = Math.min.apply(null, allLineData)
    const max = Math.max.apply(null, allLineData)
    return [0, roundUpToNearest(max, interval)]
}

export function findYAxisLimitChartjs(data: any[], interval: number){
    let allTraceData: number[] = []
    data.map(trace => (
        allTraceData.push(trace)
    ))
    const min = Math.min.apply(null, allTraceData)
    const max = Math.max.apply(null, allTraceData)
    return [0, roundUpToNearest(max, interval)]
}

export function useInterval(callback: any, delay: number) {
    const savedCallback: any = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }