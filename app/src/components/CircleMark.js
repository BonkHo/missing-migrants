import React from "react";
import { line } from "d3";

const CircleMark = ({
	binnedData,
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
					.y((d) => yScale(yValue(d)))}
			/>
			{binnedData.map((d) => (
				<circle cx={xScale(d.x0)} cy={yScale(d.y)} r={markRadius}>
					<title>{toolTipFormat(d.y)}</title>
				</circle>
			))}
		</g>
	);
};

export default CircleMark;
