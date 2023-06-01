// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
	const { username } = req.query;
	try {
		const call = await axios(`https://bio.torre.co/api/bios/${username}`);
		const profile = call.data;
		res.status(200).json({ profile });
	} catch (error) {
		res
			.status(error.response.status)
			.json({ message: error.response.statusText });
	}
}
