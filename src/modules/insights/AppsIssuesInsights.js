import React from "react";
import PropTypes from "prop-types";
import Row from "../../widgets/Row";
import PlatformTabs from "./PlatformTabs";
import Column from "../../widgets/Column";
import Paper from "@material-ui/core/Paper";
import TabsLayout from "../../widgets/TabsLayout";
import MaterialIcon from "../../widgets/MaterialIcon";
import Flex from "../../widgets/Flex";
import LineChart from "../../widgets/graphs/LineChart";
import DataSet from "../../widgets/DataSet";
import Colors from "../../Colors";
import MaterialDivider from "../../widgets/MaterialDivider";
import MaterialTextView from "../../widgets/MaterialTextView";
import CheckBox from "@material-ui/core/Checkbox";


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


export default class AppsIssuesInsights extends React.Component {

    static defaultProps = {
        platforms: ["Default 1", "Default 2", "Default 3", "Default 4"]
    };

    static propTypes = {
        platforms: PropTypes.array.isRequired
    };

    state = {
        currentApp: 1,
        showAssignedIssues: true,
        showOpenIssues: true,
        showClosedIssues: false,
        currentPlatform: 0,
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

    static colors = [
        "material_red",
        "red",
        "pink",
        "purple",
        "deepPurple",
        "indigo",
        "blue",
        "light_blue",
        "cyan",
        "teal",
        "green",
        "light_green",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deep_orange",
        "brown",
        "blue_grey",
        "grey",
        "black",
        "white"
    ];

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


                let appKeys = Object.keys(apps);


                appKeys.forEach(
                    (k, i) => {
                        if (i !== 0) {
                            apps[k].forEach(
                                app => {
                                    insights.all.push(app);
                                }
                            );
                        }
                    }
                );

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
        this.currentPlatform = newTab;
    }

    onAppsTabsChange(event, newTab) {

    }

    toolTipsTitleCallback(toolTips, data) {

        return toolTips.map(
            (tooltip, i) => this.currentApps[this.currentApp].name
        );
    }

    toolTipsLabelCallback(toolTip, data) {

        let l = data.datasets[toolTip.datasetIndex].label;
        let k = toolTip.value;
        return `${l} ${k}`;
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

    set currentPlatform(value) {
        this.setState({currentPlatform: value, currentApp: 0});
    }

    get currentPlatform() {
        return this.state.currentPlatform;
    }

    get currentApps() {
        return this.currentAppsField;
    }

    set currentApps(value) {
        this.currentAppsField = value;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {
            currentPlatform,
            apps
        } = this.state;

        let appKeys = Object.keys(apps);

        let platform = appKeys[currentPlatform];

        if (platform === "all") {

        } else {
            this.currentApps = apps[platform];
        }
    }

    render() {
        let {
            platforms
        } = this.props;

        let {
            combined,
            currentApp,
            currentPlatform,
            apps = [],
            dates,
            showAssignedIssues,
            showOpenIssues,
            showClosedIssues
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

        let stepSize = max / yAxisRows;


        let appKeys = Object.keys(apps);

        platforms = [{id: 0, name: "All"}, ...platforms];

        let platform = appKeys[currentPlatform];

        let currentApps = apps[platform];

        let tabs = [{name: "All"}, ...currentApps].map(app => {
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


        let dS = [];

        currentApps = this.currentApps;

        currentApps.forEach(
            (app, i) => {

                let hide = false;

                if (currentApp !== 0) {
                    hide = currentApp !== i;
                }

                let colorName = AppsIssuesInsights.colors[i] || "black";
                let color = Colors[colorName];

                dS.push(
                    <DataSet
                        label={"Assigned Issues"}
                        borderColor={color}
                        backgroundColor={color}
                        borderWidth={4}
                        pointRadius={1}
                        data={app.assignedIssues}
                        fillArea={true}
                        type={"bar"}
                        hidden={(!showAssignedIssues) || hide}
                    />
                );

                dS.push(
                    <DataSet
                        label={"Open Issues"}
                        borderColor={color}
                        backgroundColor={color}
                        borderWidth={4}
                        pointRadius={1}
                        data={app.openIssues}
                        fillArea={false}
                        hidden={!showOpenIssues || hide}
                    />
                );

                dS.push(
                    <DataSet
                        label={"Closed Issues"}
                        borderColor={color}
                        backgroundColor={color}
                        borderWidth={4}
                        pointRadius={1}
                        data={app.closedIssues}
                        fillArea={false}
                        hidden={!showClosedIssues || hide}
                    />
                );
            }
        );


        let insightsOptions = ["Open", "Closed", "Assigned"];

        return (
            <>
                <Row>
                    <PlatformTabs platforms={platforms} onChange={this.onPlatformTabsChange}/>
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
                            <TabsLayout
                                defaultTabIndex={0}
                                minTabHeight={24}
                                variant={TabsLayout.VARIANT.SCROLLABLE}
                                orientation={TabsLayout.ORIENTATION.VERTICAL}
                                onChange={(e, v) => this.currentApp = v}
                                tabs={tabs}
                            />
                        </Column>
                        <Column lg={10}>
                            <LineChart
                                showLegends={false}
                                showXAxisLabel={false}
                                tooltipLabelCallBack={this.toolTipsLabelCallback}

                                yAxisStepSize={stepSize}
                                tooltipTitleCallBack={this.toolTipsTitleCallback}
                                xAxisLabelFormatter={(date) => {
                                    return `${date.getDate()}/${date.getMonth()}`;
                                }}

                                labels={dates.slice(0, 7)}
                                children={dS}
                            />

                        </Column>
                    </Row>
                    <Column xs={12}>
                        <MaterialDivider spacing={1}/>
                        <Row justify={Flex.SPACE_AROUND}>
                            <Column xs={6} xm={4} lg={4}>
                                <Row>
                                    <MaterialIcon icon={"ExpandLess"} color={Colors.green}/>

                                    <MaterialTextView text={"10% Closed Issues"}/>
                                </Row>
                            </Column>
                            <Column xs={6} xm={4} lg={4}>
                                <Row>
                                    <MaterialIcon icon={"ExpandMore"} color={Colors.red}/>

                                    <MaterialTextView text={"12% Open Issues"}/>
                                </Row>
                            </Column>

                            <Column xs={6} xm={4} lg={4}>
                                <Row>
                                    <MaterialIcon icon={"ExpandMore"} color={Colors.green}/>

                                    <MaterialTextView text={"10% Assigned Issues"}/>
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </Paper>

            </>
        );
    }
}