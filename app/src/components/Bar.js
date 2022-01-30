import React from "react";
import { line } from "d3";

const Bar = ({
	binnedData,
	yScale,
	xScale,
	yValue,
	xValue,
	toolTipFormat,
	innerHeight,
}) => {
	return (
		<g className="bars">
			<path
				stroke="black"
				fill="none"
				d={line()
					.x((d) => xScale(xValue(d)))
					.y((d) => yScale(yValue(d)))}
			/>
			{binnedData.map((d) => (
				<rect
					x={xScale(d.x0)}
					y={yScale(d.y)}
					width={xScale(d.x1) - xScale(d.x0)}
					height={innerHeight - yScale(d.y)}
				>
					<title>{toolTipFormat(d.y)}</title>
				</rect>
			))}
		</g>
	);
};

export default Bar;
