import React from "react";
import TabsLayout from "../../widgets/TabsLayout";
import DataSet from "../../widgets/DataSet";
import Colors from "../../Colors";
import LineChart from "../../widgets/LineChart";
import Grid from "@material-ui/core/Grid";
import MaterialSelect from "../../widgets/MaterialSelect";
import MaterialDivider from "../../widgets/MaterialDivider";
import MaterialTextView from "../../widgets/MaterialTextView";
import Paper from "@material-ui/core/Paper";
import MaterialIconBtn from "../../widgets/MaterialIconBtn";
import MaterialIcon from "../../widgets/MaterialIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountProductivity from "./AccountProductivity";
import Row from "../../widgets/Row";
import Checkbox from "@material-ui/core/Checkbox";


export default class AccountInsights extends React.Component {

    props = {
        accounts: {}
    };

    state = {
        currentSoftwareTypeTab: 10,
        softwareInsightsCurrent: 5,
        appStatsDays: [],
        appsInsightsDownloads: [],
        appsInsightsPurchases: [],
        appInsightsAppPrice: 100,
        appsInsightsDays: 6,
        currency: "ksh",
        currentProjectsTypeField: undefined,
        appInsightsOptionsVisibility: {
            Downloads: true,
            Purchases: true,
            Likes: true,
            Ratings: true
        },
        appInsightColors: {
            Downloads: Colors.green,
            Purchases: Colors.blue,
            Likes: Colors.pink,
            Ratings: Colors.red
        },
        appInsightValues: {
            Downloads: [],
            Purchases: [],
            Likes: [],
            Ratings: []
        },
        appInsightKeys: [
            "Downloads",
            "Purchases",
            "Likes",
            "Ratings"
        ],
        projects: [
            {
                id: 0,
                type: "apps",
                list: [
                    {
                        id: 1,
                        name: "Libetal"
                    }, {
                        id: 2,
                        name: "Project Manger"
                    }, {
                        id: 3,
                        name: "Unify IDE"
                    }, {
                        id: 4,
                        name: "CRM"
                    }, {
                        id: 5,
                        name: "Duty Free"
                    }, {
                        id: 6,
                        name: "Covid-19 Tracker"
                    }
                ]
            }, {
                id: 0,
                type: "framework",
                list: [
                    {
                        id: 6,
                        name: "KotlinGUI"
                    }
                ]
            }

        ]
    };

    static INSIGHTS_DAYS = 6;
    static INSIGHTS_WEEKS = 14;
    static INSIGHTS_MONTHS = 7 * 4;
    static INSIGHTS_YEARS = 365;

    selectionStates = [
        {
            key: AccountInsights.INSIGHTS_DAYS,
            value: "Days"
        }, {
            key: AccountInsights.INSIGHTS_WEEKS,
            value: "Weeks"
        },
        {
            key: AccountInsights.INSIGHTS_MONTHS,
            value: "Months"
        },
        {
            key: AccountInsights.INSIGHTS_YEARS,
            value: "Years"
        }
    ];


    get currentProjectsType() {
        return this.state.currentProjectsTypeField || this.state.projects.keys()[0] || 0;
    }

    set currentProjectsType(value) {
        this.setState(prevState => ({
            currentProjectsTypeField: value
        }));
    }

    getSelectionState(key) {
        for (let [i, selection] in this.selectionStates) {
            if (selection !== undefined && selection.key === key) return selection.value;
        }
    }

    constructor({accounts, ...props}) {
        super(props);

        this.updateAppsInsights();
    }

    updateAppsInsights() {

        this.dummyDaysField = undefined;
        this.dummyDownloadsField = undefined;
        this.dummySalesField = undefined;

        this.getDays().then(
            days => {
                this.setState(state => ({appStatsDays: days}));
            }
        );

        this.getDownloads().then(
            downloads => {
                this.setState(state => ({appsInsightsDownloads: downloads}));
            }
        );
        this.getPurchases().then(
            purchases => {
                this.setState(state => ({appsInsightsPurchases: purchases}));
            }
        );
    }


    async getDays() {
        return this.dummyDays;
    }

    async getPurchases() {
        return this.dummyPurchases;
    }

    async getDownloads() {
        return this.dummyDownloads;
    }

    get dummyDays() {

        if (this.dummyDaysField === undefined) {
            this.dummyDaysField = (() => {
                let today = new Date();

                let back = this.state.appsInsightsDays;

                let dates = [];

                while (back >= 0) {

                    dates[back] = new Date(today.setDate(today.getDate() - 1));

                    back -= 1;
                }

                return dates;
            })();
        }


        return this.dummyDaysField;
    }

    randomWholeNum(max, min = 0) {
        return Math.floor(Math.random() * max);
    }


    get dummyDownloads() {
        let maxDailyDownloads = 200;

        if (this.dummyDownloadsField === undefined) {
            this.dummyDownloadsField = this.dummyDays.map(d => Math.floor(Math.random() * maxDailyDownloads));
        }

        return this.dummyDownloadsField;
    }

    /*
     get increase today from here
    */
    get dummyPurchases() {
        if (this.dummySalesField === undefined) {

            this.dummySalesField = this.dummyDownloads.map((d, i) => {
                return this.randomWholeNum(d) * this.state.appInsightsAppPrice;
            });


        }

        return this.dummySalesField;
    }

    insights = {
        yAxisStepSize: 1000,
        yAxisLabelFormatter(value) {
            return `${value / this.insights.yAxisStepSize}k`;
        },
        xAxisLabelFormatter(value) {
            return `${value.getDate()}/${value.toLocaleString("default", {month: "short"})}`;
        },
        tooltipTitleCallBack(tooltipItem, data) {

            let item = tooltipItem[0];


            let date = item.xLabel;

            let m = date.toLocaleString("default", {month: "short"});
            let d = date.getDay();
            let y = date.getFullYear()
            ;
            return `Date: ${d}/${m}/${y}`;
        },
        tooltipLabelCallBack(tooltip, data) {

            let labels = [];

            let {datasetIndex} = tooltip;

            let datum = data.datasets[datasetIndex];

            let label = datum.label;

            let value = datum.data[tooltip.index];

            switch (label) {
                case "Purchases":
                    value = `${this.state.currency} ${this.dummyPurchases[tooltip.index]}`;
                    break;
            }

            labels.push(`${label}: ${value}`);

            return labels;
        }
    };

    get currentSoftwareTypeTab() {

        return (
            <>
                <LineChart
                    yAxisStepSize={this.insights.yAxisStepSize}
                    labels={this.state.appStatsDays}
                    showLegends={false}
                    showGridLines={false}
                    xAxisSampleSize={31}
                    xAxisStepSize={31}
                    distribution={"linear"}
                    yAxisLabelFormatter={this.insights.yAxisLabelFormatter.bind(this)}
                    xAxisLabelFormatter={this.insights.xAxisLabelFormatter.bind(this)}
                    tooltipTitleCallBack={this.insights.tooltipTitleCallBack.bind(this)}
                    tooltipLabelCallBack={this.insights.tooltipLabelCallBack.bind(this)}
                    xAxisLabel={"Dates"}
                    autoSkip={true}>
                    {
                        this.state.appInsightKeys.map((insightKey, i) => {

                            let insight = this.state.appInsightValues[insightKey];

                            let color = this.state.appInsightColors[insightKey];

                            return (
                                <DataSet
                                    label={insightKey}
                                    borderColor={color}
                                    backgroundColor={color}
                                    borderWidth={4}
                                    pointRadius={1}
                                    data={this.state.appsInsightsDownloads}
                                    fillArea={false}
                                    hidden={!this.state.appInsightsOptionsVisibility[insightKey]}
                                />
                            );
                        })
                    }
                </LineChart>
            </>
        );
    }


    get appInsightsSort() {
        return (
            <>
                <MaterialIconBtn icon={"Sort"} iconPadding={6} iconSize={18}/>
            </>
        );
    }

    get appInsightsMenu() {
        return (
            <>
                <MaterialIconBtn icon={"Settings"} iconPadding={6} iconSize={18}/>
            </>
        );
    }

    get appInsightsAppsTabs() {

        let defaultIconSizeVertical = {height: 16, width: 16};

        return (
            <TabsLayout
                variant="scrollable"
                orientation={"vertical"}
                tabs={
                    this.state.projects[this.currentProjectsType].list.map(({id, name}) => (
                        {
                            key: id,
                            label: <MaterialIcon icon={"Apps"} iconSize={18}/>
                        }
                    ))
                }
            />
        );
    }

    updateInsightsTab(e, newValue) {
        alert(e);
        alert(newValue);
    }

    get appInsightsTabs() {
        return (
            <TabsLayout
                value={this.state.currentProjectsTypeField}
                tabs={this.state.projects.map(({id, list, type}, i) => ({
                    key: i,
                    label: type
                }))}
                onChange={(e, value) => {
                    this.currentProjectsType = value;
                }}

            />
        );
    }

    get appInsightsBody() {
        return (
            <Grid container>
                <Grid direction={"column"} item xs={1} style={{
                    display: "flex",
                    height: 5 * 40
                }} justify={"center"}>
                    {this.appInsightsAppsTabs}
                </Grid>
                <Grid item xs={11}>
                    <Row justify={"center"}>
                        {
                            this.state.appInsightKeys.map((option, k) => (
                                <FormControlLabel
                                    style={{paddingTop: 0}}
                                    control={
                                        <Checkbox
                                            style={{padding: 0}}
                                            checked={this.state.appInsightsOptionsVisibility[option]}
                                            onChange={
                                                (e, chkd) => {
                                                    this.setState(prevState => {
                                                        prevState.appInsightsOptionsVisibility[option] = !prevState.appInsightsOptionsVisibility[option];

                                                        return prevState;
                                                    });
                                                }}
                                        />}
                                    label={<MaterialTextView fontSize={11} text={option}/>}
                                />
                            ))
                        }
                    </Row>
                    {this.currentSoftwareTypeTab}
                </Grid>
            </Grid>
        );
    }

    get appInsightsHeader() {
        return <Grid container>
            <Grid xs={12} lg={9} container alignContent={"center"}
                  alignItems={"center"}>
                <MaterialSelect
                    value={this.state.appsInsightsDays}
                    onChange={(e, newValue) => {
                        this.setState({
                            appsInsightsDays: newValue.props.value
                        }, () => {
                            this.updateAppsInsights();
                        });
                    }}
                    defaultValue={AccountInsights.INSIGHTS_DAYS}
                    selectionItems={this.selectionStates}/>
                <MaterialIcon icon={"ChevronLeft"} iconSize={18}/>
                8th-15th
                <MaterialIcon icon={"ChevronRight"} iconSize={18}/>
            </Grid>
            <Grid xs={12} lg={3} container justify={"flex-end"} direction={"row"}>
                {this.appInsightsSort}
                {this.appInsightsMenu}
            </Grid>
        </Grid>;
    }

    /**TODO
     * Renders Insights in terms of
     * Financial Insights
     *  Product Sales
     *  My Investments
     * Productivity Insights
     *  My Commits
     *  My Fixes
     *  Total Work done
     *  Hours worked
     * Products Activity
     *  Total Issues
     *  New Issues
     *  Solved Issues
     *  Pending Issues
     *  Assigned to me
     *      New Issues
     *      Pending Issues
     *      Closed Issues
     *      Canceled Issues (Issues closed without fixes)
     * */
    render() {
        let xs = 10;
        let xm = 10;

        return (
            <Grid container style={{paddingRight: 0, paddingLeft: 48}}>
                <Grid item xs={xs} lg={5} style={{marginRight: 2}}>
                    {this.appInsightsTabs}
                    <Paper style={{padding: 4}}>
                        {this.appInsightsHeader}
                        <MaterialDivider spacing={2} orientation={"horizontal"}/>
                        {this.appInsightsBody}
                        <MaterialDivider spacing={2} orientation={"horizontal"}/>
                        <MaterialTextView text={"Software Insights"}/>
                        <Row>
                            <MaterialTextView text={"Total Sales:"} variant={"body2"}/>
                            <MaterialTextView text={"1000"} variant={"body2"}/>
                        </Row>
                        <Grid>
                            <MaterialTextView text={"Downloads Sales: $50"} variant={"body2"}/>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={xs} lg={3} style={{marginRight: 4}}>
                    <Paper style={{padding: 2}}>
                        <AccountProductivity/>
                    </Paper>
                </Grid>
                <Grid item xs={xs} lg={3}>
                    <Paper style={{padding: 2}}>
                        <AccountProductivity/>
                    </Paper>
                </Grid>
            </Grid>
        );
    }


}