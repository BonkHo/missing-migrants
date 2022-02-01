import React from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const Mark = ({
	worldAtlas: { land, interiors },
	cities,
	sizeScale,
	sizeValue,
}) => {
	return (
		<g className="marks">
			<path className="sphere" d={path({ type: "Sphere" })}></path>
			<path className="graticule" d={path(graticule())}></path>
			{land.features.map((feature) => (
				<path className="land" d={path(feature)} />
			))}
			<path className="interiors" d={path(interiors)}></path>
			{cities.map((d) => {
				const [x, y] = projection([d.lng, d.lat]);
				return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
			})}
		</g>
	);
};

export default Mark;
