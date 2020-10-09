import React from "react";
import PropTypes from "prop-types";
import Row from "../../../widgets/Row";
import PlatformTabs from "./PlatformTabs";
import Column from "../../../widgets/Column";
import Paper from "@material-ui/core/Paper";
import TabsLayout from "../../../widgets/TabsLayout";
import MaterialIcon from "../../../widgets/MaterialIcon";
import Flex from "../../../widgets/Flex";
import LineChart from "../../../widgets/graphs/LineChart";
import Colors from "../../../Colors";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialTextView from "../../../widgets/MaterialTextView";
import CheckBox from "@material-ui/core/Checkbox";
import DataSet from "../../../widgets/DataSet";


let consolidatePlatformInsights = function (insightName, platform, insights) {
    // Dose data combination for all insights
    this[insightName].forEach(
        (value, i) => {
            let v = insights.all.all[insightName][i] || 0;
            let c = insights.all[platform][insightName][i] || 0;
            c += value;
            v += value;
            insights.all[platform][insightName][i] = c;
            insights.all.all[insightName][i] = v;
        }
    );

    return insights;
};

function getTotals(arr, key) {
    let t = 0;

    arr.forEach(
        app => {
            (app[key] || []).forEach(
                v => {
                    t += v;
                }
            );
        }
    );

    return t;
}


const colors = [
    "material_red",
    "pink",
    "yellow",
    "amber",
    "red",
    "orange",
    "lime",
    "brown",
    "blue_grey",
    "grey",
    "cyan",
    "purple",
    "black",
    "white",
    "deepPurple",
    "indigo",
    "blue",
    "light_blue",
    "deep_orange",
    "teal",
    "green",
    "light_green",
    "grey",
    "black",
    "white"
].sort(() => Math.random() - 0.5)




export default class AppsIssuesInsights extends React.Component {

    static defaultProps = {
        platforms: ["Default 1", "Default 2", "Default 3", "Default 4"]
    };

    static propTypes = {
        platforms: PropTypes.array.isRequired
    };

    state = {
        currentApp: 0,
        showAssignedIssues: true,
        showOpenIssues: true,
        showClosedIssues: false,
        currentPlatformId: 0,
        currentPlatform: "all",
        allInsights: [],
        appNames: [],
        appNamesPerPlatform: {
            pc: [],
            mobile: []
        },
        apps: {
            all: [],
            pc: []
        },
        dates: [],
        combined: {}
    };

    static colors = colors;

    constructor(props) {
        super(props);

        this.bindEvents();
    }

    fetchData() {
        this.fetchAppsInsights()
            .then(
                response => {

                    let {
                        combined,
                        ...insights
                    } = response.insights;

                    this.setState({
                        appNames: response.appNames,
                        appNamesPerPlatform: response.appNamesPerPlatform,
                        apps: insights,
                        dates: response.dates,
                        combined: combined
                    });
                }
            );
    }

    get dates() {
        let dates = [];
        let maxDate = 100;

        let today = new Date();

        while (maxDate >= 0) dates[maxDate--] = new Date(today.setDate(today.getDate() - 1));

        return dates;
    }

    getRandomDaysInsights(dates) {
        return dates.map(() => Math.floor((Math.random() * 100) + 10));
    }

    getRandomAssignedInsights(dates) {
        return dates.map(() => Math.floor((Math.random() * 10) + 10));
    }

    getClosedIssues(dates) {
        return dates.map(() => Math.floor((Math.random() * 100) + 5));
    }

    getAppNames(apps) {
        return apps.map(app => app.name);
    }

    fetchAppsInsights() {
        return new Promise(resolve => {
            setTimeout(() => {

                let dates = this.dates;

                let response = {
                    response: {
                        status: "Ok",
                        code: 200
                    },
                    data: {
                        dates: this.dates,
                        pc: [
                            {
                                id: 1,
                                name: "Libetal",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            },
                            {
                                id: 2,
                                name: "Ide",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            },
                            {
                                id: 3,
                                name: "Linux",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            }
                        ],
                        mobile: [
                            {
                                id: 4,
                                name: "Android",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            }, {
                                id: 5,
                                name: "Ubuntu Mobile",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            }, {
                                id: 6,
                                name: "Dukto",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            }
                        ],
                        embedded: [
                            {
                                id: 7,
                                name: "Luro",
                                openIssues: this.getRandomDaysInsights(dates),
                                assignedIssues: this.getRandomAssignedInsights(dates),
                                closedIssues: this.getClosedIssues(dates)
                            }
                        ]
                    }
                };


                let {
                    dates: ds,
                    ...fData
                } = response.data;

                let apps = {
                    pc: fData.pc,
                    mobile: fData.mobile,
                    embedded: fData.embedded
                };

                let insights = {
                    all: {
                        all: {
                            openIssues: [],
                            closedIssues: [],
                            assignedIssues: []
                        },
                        pc: {
                            openIssues: [],
                            closedIssues: [],
                            assignedIssues: []
                        },
                        mobile: {
                            openIssues: [],
                            closedIssues: [],
                            assignedIssues: []
                        },
                        embedded: {
                            openIssues: [],
                            closedIssues: [],
                            assignedIssues: []
                        }
                    },
                    combined: {},
                    pc: fData.pc,
                    mobile: fData.mobile,
                    embedded: fData.embedded
                };


                let appNamesPerPlatform = {};

                Object.keys(apps).forEach(
                    platform => {
                        let aS = apps[platform];

                        aS.forEach(
                            app => {

                                consolidatePlatformInsights = consolidatePlatformInsights.bind(app);

                                insights = consolidatePlatformInsights("openIssues", platform, insights);
                                insights = consolidatePlatformInsights("assignedIssues", platform, insights);
                                insights = consolidatePlatformInsights("closedIssues", platform, insights);
                            }
                        );

                        insights.combined[platform] = {
                            openIssues: getTotals(aS, "openIssues"),
                            assignedIssues: getTotals(aS, "assignedIssues"),
                            closedIssues: getTotals(aS, "closedIssues")
                        };

                        appNamesPerPlatform[platform] = this.getAppNames(apps[platform]);

                    }
                );

                let appNames = [];

                let allInsights = {
                    openIssues: 0,
                    assignedIssues: 0,
                    closedIssues: 0
                };

                let addInsights = function (appNames, v) {
                    appNames.push(v.name);
                    this.openIssues += v.openIssues;
                    this.assignedIssues += v.assignedIssues;
                    this.closedIssues += v.closedIssues;
                    return appNames;
                };

                addInsights = addInsights.bind(allInsights);

                apps.pc.forEach(v => {
                    appNames = addInsights(appNames, v);
                });

                apps.mobile.forEach(v => {
                    appNames = addInsights(appNames, v);
                });

                apps.embedded.forEach(v => {
                    appNames = addInsights(appNames, v);
                });


                resolve({
                    appNames: appNames,
                    dates: dates,
                    appNamesPerPlatform: appNamesPerPlatform,
                    insights: insights
                });

            }, 2000);
        });
    }

    bindEvents() {
        this.onPlatformTabsChange = this.onPlatformTabsChange.bind(this);
        this.onAppsTabsChange = this.onAppsTabsChange.bind(this);
        this.toolTipsTitleCallback = this.toolTipsTitleCallback.bind(this);
        this.toolTipsLabelCallback = this.toolTipsLabelCallback.bind(this);
    }

    onPlatformTabsChange(event, newTab) {
        this.currentPlatformId = newTab;
    }

    onAppsTabsChange(event, newTab) {

    }

    toolTipsTitleCallback(toolTips, data) {

        switch (this.currentPlatform.toLowerCase()) {
            case "all":
                return this.currentPlatformNames[this.currentApp] + " Projects";
                break;
        }

        return toolTips.map(
            toolTip => {
                let label = data.datasets[toolTip.datasetIndex].label

                return label.appName
            }
        );
    }

    toolTipsLabelCallback(toolTip, data) {

        let k = toolTip.value;

        if(this.currentPlatformKey === "all"){

            let l = data.datasets[toolTip.datasetIndex].label;

            return `${k} ${l}`;
        }

        let label =  data.datasets[toolTip.datasetIndex].label;


        return `${k} ${label.issue}`
    }

    componentDidMount() {
        this.fetchData();
    }


    get currentApp() {
        return this.state.currentApp;
    }

    set currentApp(value) {
        this.setState({currentApp: value});
    }

    set currentPlatformId(value) {


        this.setState({currentPlatformId: value, currentApp: 0}, (state) => {

        });
    }

    get currentPlatformId() {
        return this.state.currentPlatformId;
    }

    get currentApps() {
        return this.currentAppsField;
    }

    set currentApps(value) {
        this.currentAppsField = value;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    get currentPlatformKey() {
        return this.currentPlatform.toLowerCase();
    }


    get allAppsDataset() {
        return this.extractDatasets(this.currentApps.all);
    }

    extractDatasets(apps = {}) {
        let appKeys = Object.keys(apps);


        let keys = {
            openIssues: "Open",
            closedIssues: "Closed",
            assignedIssues: "Assigned"
        };

        return appKeys.map(
            (key, i) => {


                let issueKey = keys[key];
                let issueTitle = `${issueKey} Issues`;
                let issueName = `${issueKey.toLowerCase()}Issues`;

                let dSet = apps[issueName];

                let colorName = AppsIssuesInsights.colors[i];

                return (
                    <DataSet
                        label={issueTitle}
                        pointRadius={2}
                        backgroundColor={Colors.alpha(colorName, .4)}
                        borderColor={colorName}
                        fillArea={true}
                        borderWidth={2}
                        data={dSet}
                        type={key === "assignedIssues" ? "bar" : "line"}
                        hidden={!this.state[`show${issueKey}Issues`]}
                    />
                );
            }
        );
    }

    get allCollapsedDatasets() {
        let {
            currentApp,
            currentApps
        } = this;
        return this.extractDatasets(currentApps[Object.keys(currentApps)[currentApp]]);
    }

    get datasets() {

        switch (this.currentPlatform.toLowerCase()) {
            case "all":
                if (this.currentApp === 0) {
                    return this.allAppsDataset;
                }

                return this.allCollapsedDatasets;

            default:

        }

        let dataset = [];

        this.currentApps.forEach(
            (app, i) => {

                let hideCurrent = this.currentApp !== i;

                let colorName = AppsIssuesInsights.colors[i];

                let color = Colors[colorName];

                dataset.push(
                    <DataSet
                        borderWidth={2}
                        borderColor={color}
                        backgroundColor={Colors.alpha(colorName,.8)}
                        pointRadius={2}
                        label={{appName:app.name,issue:"Assigned Issues"}}
                        data={app.assignedIssues}
                        type={"bar"}
                        hidden={!this.state.showAssignedIssues || hideCurrent}
                    />
                );

                colorName = AppsIssuesInsights.colors[i + 1];
                color = Colors[colorName];

                dataset.push(
                    <DataSet
                        borderWidth={2}
                        borderColor={color}
                        pointRadius={2}
                        label={{appName:app.name,issue:"Closed Issues"}}
                        data={app.closedIssues}
                        hidden={!this.state.showClosedIssues || hideCurrent}
                    />
                );

                colorName = AppsIssuesInsights.colors[i + 1];
                color = Colors[colorName];

                dataset.push(
                    <DataSet
                        borderWidth={2}
                        borderColor={color}
                        pointRadius={2}
                        label={{appName:app.name,issue:"Open Issues"}}
                        data={app.openIssues}
                        hidden={!this.state.showOpenIssues || hideCurrent}
                    />
                );
            }
        );

        return dataset;
    }

    get stepSize() {

        let {
            combined
        } = this.state;

        let max = 10;

        let yAxisRows = 1;


        Object.keys(combined).forEach(
            platform => {
                Object.keys(combined[platform]).forEach(
                    insight => {
                        max = Math.max(max, combined[platform][insight]);
                    }
                );
            }
        );

        return max / yAxisRows;
    }


    get chart() {

        let {
            dates
        } = this.state;


        return (
            <LineChart
                showLegends={false}
                showXAxisLabel={false}
                yAxisStepSize={100}
                tooltipLabelCallBack={this.toolTipsLabelCallback}
                tooltipTitleCallBack={this.toolTipsTitleCallback}
                xAxisLabelFormatter={(date) => {
                    return `${date.getDate()}/${date.getMonth()}`;
                }}

                labels={dates.slice(0, 7)}
                children={this.datasets}
            />
        );
    }

    get currentAppsTabs() {

        let tabs;

        if (this.currentPlatform.toLowerCase() === "all") {
            tabs = this.currentPlatformNames.map(
                name => {
                    return (
                        <Row alignItems={Flex.CENTER}>
                            <MaterialIcon icon={"Apps"} iconSize={16}/>
                            {name}
                        </Row>
                    );
                }
            );
        } else {
            tabs = this.currentApps.map(app => {
                let name = app.name;

                if (name.length > 7) {
                    let ns = name.split(" ");
                    if (ns.length > 1) {
                        name = ns.map(v => (v[0] || "").toUpperCase()).join(".");
                    }
                }

                return (
                    <Row alignItems={Flex.CENTER}>
                        <MaterialIcon icon={"Apps"} iconSize={16}/>
                        {name}
                    </Row>
                );
            });
        }


        return tabs;
    }

    get currentPlatformNames() {
        return Object.keys(this.state.apps).map(plat => `${plat[0].toUpperCase()}${plat.slice(1, plat.length)}`);
    }

    get currentPlatform() {
        return this.currentPlatformNames[this.state.currentPlatformId];
    }

    get currentAppsTabsLayout() {

        return (
            <TabsLayout
                defaultTabIndex={0}
                minTabHeight={24}
                variant={TabsLayout.VARIANT.SCROLLABLE}
                orientation={TabsLayout.ORIENTATION.VERTICAL}
                onChange={(e, v) => this.currentApp = v}
                tabs={this.currentAppsTabs}
            />
        );
    }

    render() {
        let {
            platforms
        } = this.props;

        this.currentApps = this.state.apps[this.currentPlatform.toLowerCase()];

        platforms = [{id: 0, name: "All"}, ...platforms];

        let insightsOptions = ["Open", "Closed", "Assigned"];

        return (
            <>
                <Row>
                    <PlatformTabs platforms={platforms}
                                  onChange={(e, platformId) => this.currentPlatformId = platformId}/>
                </Row>
                <Paper style={{flexGrow: 1, display: "flex", flexDirection: "column", padding: 4}}>
                    <Row justify={Flex.CENTER} alignItems={Flex.CENTER}>
                        {
                            insightsOptions.map((insight, i) => {
                                let stateKey = `show${insight}Issues`;

                                return (
                                    <>
                                        <CheckBox
                                            checked={this.state[stateKey]}
                                            onClick={(e) => {
                                                this.setState(prevState => ({[stateKey]: !prevState[stateKey]}));
                                            }}
                                        />
                                        <MaterialTextView text={insight}/>
                                    </>
                                );
                            })
                        }
                    </Row>
                    <Row>
                        <Column lg={2} style={{height: 286, display: "flex"}}>
                            {this.currentAppsTabsLayout}
                        </Column>
                        <Column lg={10}>
                            {this.chart}
                        </Column>
                    </Row>
                    <Column xs={12}>
                        <MaterialDivider spacing={1}/>
                        <Row justify={Flex.SPACE_AROUND}>
                            <Column xs={6} xm={4} lg={3}>
                                <Row>
                                    <MaterialIcon icon={"ExpandLess"} color={Colors.green}/>
                                    <MaterialTextView text={"10% Closed Issues"}/>
                                </Row>
                            </Column>
                            <Column xs={6} xm={4} lg={3}>
                                <Row>
                                    <MaterialIcon icon={"ExpandMore"} color={Colors.red}/>

                                    <MaterialTextView text={"12% Open Issues"}/>
                                </Row>
                            </Column>
                            <Column xs={6} xm={4} lg={3}>
                                <Row>
                                    <MaterialIcon icon={"ExpandLess"} color={Colors.green}/>
                                    <MaterialTextView text={"10% Assigned Issues"}/>
                                </Row>
                            </Column>
                            <Column xs={6} xm={4} lg={3}>
                                <Row>
                                    <MaterialIcon icon={"ExpandLess"} color={Colors.green}/>
                                    <MaterialTextView text={"10% New Issues"}/>
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </Paper>

            </>
        );
    }
}