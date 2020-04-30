/*eslint no-console: 0*/
"use strict";
// OData-Service http://13.228.26.173:50000/sap/opu/odata/sap/ZI340544_ODATA_TEST01_SRV/$metadata

const express = require("express");
const http = require("http");

const app = express();

const s4params = {
	hostname: "13.228.26.173",
	port: 50000,
	path: "",
	method: ""
};

app.get("/", (req, res) => {
	res.send("You have reached the root.");
});

app.get("/sap/opu/odata/sap/ZI340544_ODATA_TEST01_SRV/*", (req, res) => {
	s4params.path = req.originalUrl;
	s4params.method = "GET";
	let data = "";
 
	const httpReq = http.request(s4params, httpRes => {
		httpRes.setEncoding("utf8");
		httpRes.on("data", d => {
			data += d;
		});
		httpRes.on("end", () => {
			console.log("End reached.");
			res.set("Content-Type", "image/svg+xml");
			res.send(data);
			//console.log(data);
		});
	});
	httpReq.end();
});

// Check if an environment variable was set
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port %d", port));