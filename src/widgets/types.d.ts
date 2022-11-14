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
    width: number;
    height: number;
    data: DataSet[]; 
    xName: string;
    yName: string;
    xLabel: string; //name for x axis
    yLabel: string; // name for y axis
    yLimit?: number[]; //limits of axis
}