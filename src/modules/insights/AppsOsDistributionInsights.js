import React from "react";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import MaterialIcon from "../../widgets/MaterialIcon";
import MaterialDivider from "../../widgets/MaterialDivider";
import Colors from "../../Colors";
import Paper from "@material-ui/core/Paper";
import TabsLayout from "../../widgets/TabsLayout";
import Os from "./Os";
import MaterialTextView from "../../widgets/MaterialTextView";
import Doughnut from "../../widgets/graphs/Doughnut";
import BarGraph from "../../widgets/graphs/Bar";
import Radar from "../../widgets/graphs/Radar";
import ChartJs from "chart.js";

let color = ChartJs.helpers.color;

let randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};

export default class AppsOsDistributionInsights extends React.Component {


    state = {
        currentInsight: 0,
        currentInsightTab: 0,
        currentInsightIndex: 0,
        insightSizeValues: [
            "Days", "Weeks", "Months", "Years"
        ],
        insightDatasets: [],
        dataset: {
            // Web also
            keys: ["pc", "mobile", "embedded"],
            values: {
                pc: {
                    downloads: {},
                    purchases: {},
                    users: {}
                }
            },
            labels: {
                pc: [],
                mobile: [],
                embedded: []
            }
        },
        apps: {
            pc: [],
            mobile: [],
            embedded: []
        },
        deviceTypes: []
    };

    static DATASET_SIZE = 100;

    constructor(props) {
        super(props);

        this.bindEvents();
    }


    bindEvents() {
        this.toolTipsTitleHandler = this.toolTipsTitleHandler.bind(this);
        this.toolTipsLabelHandler = this.toolTipsLabelHandler.bind(this);

    }

    componentDidMount() {

        this.fetchData().then(dataset => {
            this.setState({dataset});
        }).catch(e => console.log(e.message()));

        this.fetchDeviceTypes().then(deviceTypes => {
            this.setState({deviceTypes});
        }).catch(e => console.log(e.message()));


        this.fetchUserApps().then(apps => {
            this.setState({apps});
        }).catch(e => console.log(e.message()));
    }


    async fetchUserApps() {
        return {
            pc: ["Dukto", "Libetal"],
            mobile: ["Cryon"],
            embedded: ["Unify"]
        };
    }

    async fetchDeviceTypes() {
        return [
            {
                id: 1,
                name: "PC"
            }, {
                id: 2,
                name: "Mobile"
            }, {
                id: 3,
                name: "Embedded"
            }
        ];
    }

    async fetchData() {

        let dummyData = {
            downloads: {
                data: [
                    60,
                    20,
                    30,
                    40,
                    12
                ],
                backgroundColor: [
                    Colors.pink,
                    Colors.purple,
                    Colors.indigo,
                    Colors.green,
                    Colors.orange
                ],
                label: "Downloads"
            },
            purchases: {
                data: [
                    12,
                    60,
                    20
                ],
                backgroundColor: [
                    Colors.pink,
                    Colors.purple,
                    Colors.indigo
                ],
                label: "Purchases"
            },
            users: {
                data: [
                    12,
                    20,
                    30,
                    40,
                    60
                ],
                backgroundColor: [
                    Colors.pink,
                    Colors.purple,
                    Colors.indigo,
                    Colors.green,
                    Colors.orange
                ],
                label: "Users"
            }
        };

        let mobileColors = [
            Colors.green,
            Colors.blue,
            Colors.brown
        ];

        let mobileDummy = {
            downloads: {
                data: [
                    30,
                    40,
                    12
                ],
                backgroundColor: mobileColors,
                label: "Downloads"
            },
            purchases: {
                data: [
                    12,
                    60,
                    20
                ],
                backgroundColor: mobileColors,
                label: "Purchases"
            },
            users: {
                data: [
                    12,
                    20,
                    60
                ],
                backgroundColor: mobileColors,
                label: "Users"
            }
        };

        let embeddedDummy = {
            downloads: {
                data: [
                    60
                ],
                backgroundColor: [
                    Colors.orange
                ],
                label: "Downloads"
            },
            purchases: {
                data: [
                    12
                ],
                backgroundColor: [
                    Colors.indigo
                ],
                label: "Purchases"
            },
            users: {
                /*    data: [
                        12
                    ],
                    backgroundColor: [
                        Colors.purple
                    ],
                    label: "Users"*/
            }
        };

        return {
            keys: ["pc", "mobile", "embedded"],
            values: {
                pc: dummyData,
                mobile: mobileDummy,
                embedded: embeddedDummy
            },
            labels: {
                pc: Os.TYPES.desktop,
                mobile: Os.TYPES.mobile,
                embedded: Os.TYPES.embeddedSystems
            }
        };

    }

    toolTipsTitleHandler(tooltips, data) {
        let datum = data.datasets[tooltips[0].datasetIndex];

        return datum.label;
    }


    toolTipsLabelHandler(tooltips, data) {
        console.log(tooltips);
        console.log(data);

        return "Label";
    }

    // TODO variant not stable could do with a bit more thinking over
    get osDistributionInsightsRadarVariant() {
        let {
            dataset: {
                keys,
                values,
                labels
            },
            currentInsightTab
        } = this.state;

        let os = keys[currentInsightTab];

        let {downloads, purchases, users} = values[os];


        let lS = [...Os.TYPES.desktop];

        return (
            <Column xs={10}>
                <Radar
                    showLegends={false}
                    datasets={
                        [
                            downloads
                        ]
                    }
                    labels={lS}
                />
            </Column>
        );
    }


    get osDistributionInsights() {

        let {
            dataset: {
                keys,
                values,
                labels
            },
            currentInsight
        } = this.state;

        let os = keys[currentInsight];

        let {downloads, purchases, users} = values[os];

        return (
            <Column xs={10}>
                <Doughnut
                    tooltipTitleCallBack={this.toolTipsTitleHandler}
                    showLegends={false}
                    datasets={[downloads, purchases, users]} labels={labels[os]}
                />
            </Column>
        );
    }

    get insightBody() {

        return (
            <Row justify={Row.JUSTIFY.START}>
                <Column xs={2}>
                    {this.userAppsTabs}
                </Column>
                {this.osDistributionInsights}
            </Row>
        );
    }

    get insightFooter() {

        let {
            dataset: {
                keys,
                values,
                labels
            },
            currentInsightTab
        } = this.state;

        let os = keys[currentInsightTab];

        let {downloads, purchases, users} = values[os];

        return (
            <Column xs={12}>
                <MaterialTextView text={"Distribution by platform"}/>
                <BarGraph
                    showXAxisLabel={false}
                    height={80}
                    responsive={false}
                    yAxisStepSize={100000}
                    showLegends={false}
                    datasets={[downloads, purchases, users]}
                    labels={labels[os]}/>
            </Column>
        );
    }


    set currentInsight(value) {
        this.setState({currentInsight: value});
    }

    get insightTabs() {
        return (
            <TabsLayout
                defaultTabIndex={0}
                tabs={
                    this.state.deviceTypes.map(({id, name: type}, i) => ({
                        key: i,
                        label: type
                    }))
                }
                onChange={(e, tabId) => (this.currentInsight = tabId)}
            />
        );
    }

    get insightHeader() {

        return (
            <Row>
                <Column xs={8}>
                    {/*  <MaterialSelect
                        value={this.state.currentInsightIndex}
                        selectionItems={this.state.insightSizeValues.map((v, i) => ({
                            key: i,
                            value: v
                        }))}
                    />*/}
                </Column>
                <Column xs={4}>
                    <Row justify={Row.END}>
                        <MaterialIcon icon={"Sort"} iconSize={24}/>
                        <MaterialIcon icon={"Settings"} iconSize={24}/>
                    </Row>
                </Column>
            </Row>
        );
    }

    get userAppsTabs() {

        let {apps, currentInsightTab, dataset: {keys}} = this.state;

        let appsList = apps[keys[currentInsightTab]];

        //
        return (
            <TabsLayout
                variant="scrollable"
                orientation={TabsLayout.ORIENTATION.VERTICAL}
                tabs={
                    appsList.map((name, i) => (
                        {
                            key: i,
                            label: (
                                <Row justify={Row.JUSTIFY.SPACE_AROUND}>
                                    <MaterialIcon icon={"Apps"} iconSize={18}/>
                                    <MaterialTextView text={name} fontSize={12}/>
                                </Row>
                            )
                        }
                    ))
                }
            />
        );
    }

    /**TODO
     * Display downloads in terms of OS
     * Purchases in terms of Os
     *
     * */
    render() {

        return (
            <>
                {this.insightTabs}
                <Paper style={{padding: 2, backgroundColor: Colors["white"]}}>
                    <Row>
                        {this.insightHeader}
                        {this.insightBody}
                    </Row>
                    <MaterialDivider color={Colors.white} spacing={2} orientation={"horizontal"}/>
                    <Row height={45}>
                        {this.insightFooter}
                    </Row>
                </Paper>
            </>
        );
    }

}
