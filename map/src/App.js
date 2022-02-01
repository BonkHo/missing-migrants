import React from "react";
import { useWorldAtlas } from "./hooks/useWorldAtlas";
import { useCities } from "./hooks/useCities";
import { max, scaleSqrt } from "d3";
import "./App.css";

// Components
import Mark from "./components/Mark";

const App = () => {
	const width = 1200;
	const height = 500;
	const worldAtlas = useWorldAtlas();
	const cities = useCities();

	if (!worldAtlas || !cities) {
		return <pre>"Loading"</pre>;
	}

	const sizeValue = (d) => d.population;
	const maxRadius = 15;

	const sizeScale = scaleSqrt()
		.domain([0, max(cities, sizeValue)])
		.range([0, maxRadius]);

	return (
		<svg width={width} height={height}>
			<Mark
				worldAtlas={worldAtlas}
				cities={cities}
				sizeScale={sizeScale}
				sizeValue={sizeValue}
			/>
		</svg>
	);
};

export default App;
