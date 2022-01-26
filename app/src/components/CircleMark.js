import React from "react";
import { curveNatural, line } from "d3";

const CircleMark = ({
	data,
	yScale,
	xScale,
	yValue,
	xValue,
	toolTipFormat,
	markRadius = 3,
}) => {
	return (
		<g className="marks">
			<path
				stroke="black"
				fill="none"
				d={line()
					.x((d) => xScale(xValue(d)))
					.y((d) => yScale(yValue(d)))
					.curve(curveNatural)(data)}
			/>
			{data.map((d) => (
				<circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={markRadius}>
					<title>{toolTipFormat(xValue(d))}</title>
				</circle>
			))}
		</g>
	);
};

export default CircleMark;
