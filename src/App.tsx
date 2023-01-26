import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import LinePlots from "./pages/LinePlots";
import TimeSeriesPlots from "./pages/TimeSeriesPlots";
import ScatterPlots from "./pages/ScatterPlots";
import Video from "./pages/Video";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Line" element={<LinePlots />} />
          <Route path="TimeSeries" element={<TimeSeriesPlots />} />
          <Route path="Scatter" element={<ScatterPlots />} />
          <Route path="Video" element={<Video />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

