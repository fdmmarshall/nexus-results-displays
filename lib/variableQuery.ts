export default async function fetchVBQuery() {

    const userQuery = {
        "select": [
            "?period",
            "?periodName",
            "?years",
            "?location"
        ],
        "where": [
            [
                "?period",
                "period/periodName",
                "?periodName"
            ],
            [
                "?period",
                "period/years",
                "?years"
            ],
            ["?period",
                "period/location",
                "?location"]
        ]
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
        console.log([queryResults, variableColumns])

        return [queryResults, variableColumns]



    } catch (error) {
        console.error(error);
    }

}
