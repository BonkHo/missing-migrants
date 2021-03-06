import React from "react";
import {
	extent,
	scaleLinear,
	scaleTime,
	bin,
	timeFormat,
	timeMonths,
	sum,
	max,
} from "d3";
import { useData } from "./hooks/useData";
import "./App.css";

// Components
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Bar from "./components/Bar";

const App = () => {
	const width = 1200;
	const height = 500;
	const margin = { top: 30, right: 30, bottom: 80, left: 250 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const data = useData();
	const xAxisLabelOffset = 70;
	const yAxisLabelOffset = -70;

	const xAxisLabel = "Time";
	const yAxisLabel = "Total Dead and Missing";
	const xValue = (d) => d["Reported Date"];
	const yValue = (d) => d["Total Dead and Missing"];

	const xAxisTickFormat = timeFormat("%m/%d/%y");

	if (!data) {
		return <pre>"Loading"</pre>;
	}

	const xScale = scaleTime()
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();

	const [start, stop] = xScale.domain();

	const binnedData = bin()
		.value(xValue)
		.domain(xScale.domain())
		.thresholds(timeMonths(start, stop))(data)
		.map((array) => ({
			y: sum(array, yValue),
			x0: array.x0,
			x1: array.x1,
		}));

	const yScale = scaleLinear()
		.domain([0, max(binnedData, (d) => d.y)])
		.range([innerHeight, 0]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					tickFormat={xAxisTickFormat}
				/>
				<text
					className="axis-label"
					x={yAxisLabelOffset}
					y={innerHeight / 2}
					style={{ textAnchor: "middle" }}
					transform={`rotate(-90, ${yAxisLabelOffset}, ${innerHeight / 2})`}
				>
					{yAxisLabel}
				</text>
				<AxisLeft yScale={yScale} innerWidth={innerWidth} />
				<Bar
					binnedData={binnedData}
					xScale={xScale}
					yScale={yScale}
					toolTipFormat={xAxisTickFormat}
					innerHeight={innerHeight}
				/>
				<text
					className="axis-label"
					x={innerWidth / 2}
					y={innerHeight + xAxisLabelOffset}
					style={{ textAnchor: "middle" }}
				>
					{xAxisLabel}
				</text>
			</g>
		</svg>
	);
};

export default App;
