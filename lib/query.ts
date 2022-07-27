export default async function fetchQuery() {
  const schemaQuery = {
    "select": {
      "?predicate": [
        "name",
        "type",
        "restrictCollection"
      ]
    },
    "where": [
      [
        "?predicate",
        "_predicate/name",
        "#(re-find (re-pattern \"^[^_]\") ?name)"
      ]
    ]
  }

  const userQuery = {
    select: {
      "?dinosaur": ["*"],
    },
    where: [["?dinosaur", "dinos/dinoType", "?type"]],
    opts: {
      compact: true,
    },
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
      body: JSON.stringify(schemaQuery),
    });

    if (resp.status === 200) {

      const respTwo = await fetch(`${url}/query`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userQuery)
      })

      const schemaResults = await resp.json()

      const queryResults = await respTwo.json()

      return [schemaResults, queryResults]
    }

  } catch (error) {
    console.error(error);
  }
}
