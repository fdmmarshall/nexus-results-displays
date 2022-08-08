export default async function fetchVBQuery() {

    const userQuery = {
        "select": [
            "?dinosaur",
            "?dinosaurName",
            "?translation"
        ],
        "where": [
            [
                "?dinosaur",
                "dinos/dinosaurName",
                "?dinosaurName"
            ],
            [
                "?dinosaur",
                "dinos/englishTranslation",
                "?translation"
            ]
        ],
        "opts": {
            "orderBy": [
                "ASC",
                "?dinosaur"
            ]
        }
    };
    const networkName = "fluree";
    const datasetID = `387028092977386`;
    const APIKey = `cd18b04cbd5874e8dcf6fd5b84d44aef349307720c2e2df9e1fa03c3f3623027`;

    const url = `https://api.dev.flur.ee/fdb/${networkName}/${datasetID}`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIKey}`,
    };

    let variableColumns: string[] = [];

    if (userQuery.select.length > 1 && userQuery.select.every(x => x.includes('?'))) {
        variableColumns = userQuery.select.map(x => x.slice(1))
    }

    try {

        const resp = await fetch(`${url}/query`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(userQuery)
        })

        const queryResults = await resp.json()

        return [queryResults, variableColumns]

    } catch (error) {
        console.error(error);
    }

}
