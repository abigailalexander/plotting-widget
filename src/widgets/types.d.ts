type DataPoint = {
    x: number;
    y: number
};

type LineLabel = {
    key: string;
    color: string;
};

// Dataset type
export type DataSet = {
    label: LineLabel;
    values: DataPoint[];
};

// Component can accept multiple datasets
type LineComponentProps = {
    width: number;
    height: number;
    data: DataSet[]; 
    oxLabel: string; //name for x axis
    oyLabel: string; // name for y axis
    dataKey: string; //which variable to use as key
    yLimit: number[]; //limits of axis
};

type PlotlyLineComponentProps = {
    name: string
}