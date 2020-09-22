/**@Description
 * json
 * url api.root/users/userName/insights/projects?start=startData&end=endDate
 * */
const sampleProjectsStatsResponse = {
    "response": {
        "status": "ok",
        "code": 200
    },
    "data": {
        // from and to date
        "days": [],
        "pc": [
            {
                "id": 0,
                "name": "Libetal"
            }
        ],
        "mobile": [
            {
                "id": 1,
                "name": "Chama",
                issues: [],
                commits: []
            }
        ]
    }
};