const axios = require("axios");
const HTTPError = require("../models/http-error");

const getCoordsForAddress = async address => {
	const params = {
		locate: address,
		json: 1,
	};
	const res = await axios.get("https://geocode.xyz", { params });

	const { data } = res;
	if (!data || data.error) {
		const error = new HTTPError(422, "Could not find location for specified address.");
		throw error;
	}

	return {
		lat: data.latt,
		lng: data.longt,
	};
};

exports.getCoordsForAddress = getCoordsForAddress;
