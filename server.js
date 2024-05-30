const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");

const app = express();

// Define absolute paths for the key and certificate
const keyPath = path.resolve(__dirname, "key.pem");
const certPath = path.resolve(__dirname, "cert.pem");

console.log("Key path:", keyPath);
console.log("Cert path:", certPath);

app.get("/", (req, res) => {
  res.send("Hello, HTTPS world!");
});

let key, cert;

try {
  key = fs.readFileSync(keyPath, "utf8");
  cert = fs.readFileSync(certPath, "utf8");
} catch (err) {
  console.error("Error reading SSL/TLS files:", err);
  process.exit(1); // Exit the process with an error code
}

const options = { key, cert };

https.createServer(options, app).listen(3000, () => {
  console.log("HTTPS Server is running on https://localhost:3000");
});
