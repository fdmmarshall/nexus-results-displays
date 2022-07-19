import fetch from "node-fetch";

const query = { select: ["*"], from: "_collection" };
const networkName = "fluree";
const datasetID = 387028092977156;
const APIKey = `cd18b04cbd5874e8dcf6fd5b84d44aef349307720c2e2df9e1fa03c3f3623027`;

const url = `https://api.dev.flur.ee/fdb/${networkName}/${datasetID}`;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${APIKey}`,
};

try {
  const resp = await fetch(`${url}/query`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query),
  });
  const data = await resp.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
