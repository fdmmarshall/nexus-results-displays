export default async function fetchQuery() {
  const query = {
    select: ["(count ?dinosaur)"],
    where: [
      ["?dinosaur", "dinos/dinoType", "?type"],
      ["?type", "type/dinosaurType", "?dinosaurType"],
    ],
    opts: { groupBy: "?dinosaurType" },
  };
  const networkName = "fluree";
  const datasetID = `387028092977386`;
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
    })
      .then((resp) => resp.json())
      .then((data) => data);

    console.log(resp);
  } catch (error) {
    console.error(error);
  }
}
