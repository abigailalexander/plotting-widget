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