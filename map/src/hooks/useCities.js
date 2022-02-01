import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
	"https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const row = (d) => {
	d.lat = +d.lat;
	d.lng = +d.lng;
	d.population = +d.population;
	return d;
};

export const useCities = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		csv(csvUrl, row).then(setData);
	}, []);
	console.log(data);

	return data;
};
