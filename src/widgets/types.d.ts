type DataPoint = {
    x: number | string;
    y: number;
};

type RatDataPoint = {
    date: string;
    rats: number;
    plagueVictims: number;
}

type LineLabel = {
    key: string;
    color: string;
};

// Dataset type
export type DataSet = {
    label: LineLabel;
    values: DataPoint[] | RatDataPoint[];
};

// Component can accept multiple datasets
type LineComponentProps = {
    mode: string;
    dataAmount: number; //amount of data points to display
    intervalSize: number; //tick interval size
    width: number;
    height: number;
    data: DataSet[]; 
    xName: string; //name of property that is x data
    yName: string; //name of property that is y data
    xLabel: string; //name for x axis
    yLabel: string; // name for y axis
    dataKey: string; //which variable to use as key
    yLimit?: number[]; //limits of axis
};

type PlotlyLineComponentProps = {
    mode: string; //determines if cycling or adding new data
    dataAmount: number; //amount of data points to display
    symbol?: string; //symbol to display (if any)
    type: string; //type of plot
    width: number;
    height: number;
    data: DataSet[]; 
    xName: string;
    yName: string;
    xLabel: string; //name for x axis
    yLabel: string; // name for y axis
    yInterval: number; //unit to round y interval to
}

type ChartjsLineComponentProps = {
    mode: string; //determines if cycling or adding new data
    dataAmount: number; //amount of data points to display
    symbol?: string; //symbol to display (if any)
    width: number;
    height: number;
    data: DataSet[]; 
    xName: string;
    yName: string;
    xLabel: string; //name for x axis
    yLabel: string; // name for y axis
    yInterval: number; //unit to round y interval to
}

type VictoryLineComponentProps = {
    mode: string; //determines if cycling or adding new data
    dataAmount: number; //amount of data points to display
    symbol?: string; //symbol to display (if any)
    width: number;
    height: number;
    data: DataSet[]; 
    xName: string;
    yName: string;
    xLabel: string; //name for x axis
    yLabel: string; // name for y axis
    yInterval: number; //unit to round y interval to
}

type VisxLineComponentProps = {
    mode: string; //determines if cycling or adding new data
    dataAmount: number; //amount of data points to display
    symbol?: string; //symbol to display (if any)
    width: number;
    height: number;
    data: DataSet[]; 
    xName: string;
    yName: string;
    xLabel: string; //name for x axis
    yLabel: string; // name for y axis
    yInterval: number; //unit to round y interval to
}