import React from "react";
import LineChart from "../../widgets/graphs/LineChart";
import DataSet from "../../widgets/DataSet";
import Colors from "../../Colors";
import Paper from "@material-ui/core/Paper";
import MaterialDivider from "../../widgets/MaterialDivider";
import MaterialTextView from "../../widgets/MaterialTextView";
import Row from "../../widgets/Row";
import Grid from "@material-ui/core/Grid";
import MaterialSelect from "../../widgets/MaterialSelect";
import MaterialIcon from "../../widgets/MaterialIcon";
import Checkbox from "@material-ui/core/Checkbox";
import TabsLayout from "../../widgets/TabsLayout";
import MaterialIconBtn from "../../widgets/MaterialIconBtn";
import Calendar from "../../utils/Calendar";
import Column from "../../widgets/Column";
import Flex from "../../widgets/Flex";
import Settings from "../../utils/Settings";

export default class AppsSalesInsights extends React.Component {



    static defaultProps = {
        accounts: {}
    };

    state = {
        downloadsChangePercent: 10,
        totalDownloads: 10000,
        grossSales: 1000,
        currentYearIndex: 0,
        currentApp: 0,
        currentMonth: 0,
        insightGroupingStart: 0,
        insightGroupingSpacing: 6,
        currentSoftwareTypeTab: 10,
        softwareInsightsCurrent: 5,
        appStatsDays: [],
        appsInsightsDownloads: [],
        appsInsightsPurchases: [],
        insightYears: [2020, 2021],
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
                    }, {
                        id: 7,
                        name: "Covid-19 Tracker"
                    }, {
                        id: 8,
                        name: "Covid-19 Tracker"
                    }, {
                        id: 9,
                        name: "Covid-19 Tracker"
                    }
                ]
            },
            {
                id: 1,
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
            key: AppsSalesInsights.INSIGHTS_DAYS,
            value: "Days"
        }, {
            key: AppsSalesInsights.INSIGHTS_WEEKS,
            value: "Weeks"
        },
        {
            key: AppsSalesInsights.INSIGHTS_MONTHS,
            value: "Months"
        },
        {
            key: AppsSalesInsights.INSIGHTS_YEARS,
            value: "Years"
        }
    ];


    insights = {
        yAxisStepSize: 1000,
        yAxisLabelFormatter(value) {
            let m = "";

            let stepSize = this.insights.yAxisStepSize;

            if (stepSize === 1000) {
                m = "k";
            } else if (stepSize === 100) {
                m = "h";
            }

            return `${value / this.insights.yAxisStepSize}${m}`;
        },
        xAxisLabelFormatter(value) {
            return `${value.getDate()}/${value.toLocaleString("default", {month: "short"})}`;
        },
        tooltipTitleCallBack(tooltipItem, data) {

            let item = tooltipItem[0];


            let date = item.xLabel;

            let m = date.toLocaleString("default", {month: "short"});
            let d = date.getDay();
            let y = date.getFullYear();
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

    constructor(props) {
        super(props);

        this.updateAppsInsights();
    }

    updateAppsInsights() {

        this.dummyDaysField = undefined;
        this.dummyDownloadsField = undefined;
        this.dummySalesField = undefined;

        this.getDays().then(
            days => {
                this.setState({appStatsDays: days});

                this.getYears(days).then(years => {
                    this.setState({insightYears: years});
                });
            }
        );


        this.getDownloads().then(
            downloads => {
                this.setState(prevState => {

                    prevState.appInsightValues.Downloads = downloads;

                    return prevState;
                });
            }
        );
        this.getPurchases().then(
            purchases => {
                this.setState(prevState => {

                    prevState.appInsightValues.Purchases = purchases;

                    return prevState;
                });
            }
        );

    }

    get projectTypes() {
        if (this.projectTypesField === undefined) {
            this.projectTypesField = this.state.projects.map(({type}) => type);
        }

        return this.projectTypesField;
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

    async getDays() {
        return this.dummyDays;
    }

    async getPurchases() {
        return this.dummyPurchases;
    }

    async getDownloads() {
        return this.dummyDownloads;
    }

    async getYears(days) {

        let l = days.length;

        let sDay = days[0] || new Date();
        let eDay = days[l - 1] || new Date();
        let sY = sDay.getFullYear();
        let eY = eDay.getFullYear();

        let insightYears = [];

        while (sY <= eY) {
            insightYears.push(sY);
            sY++;
        }

        return insightYears;
    }


    get dummyDays() {

        if (this.dummyDaysField === undefined) {
            this.dummyDaysField = (() => {
                let today = new Date();

                let back = 1000;

                let dates = [];

                while (back >= 0) {
                    dates[back--] = new Date(today.setDate(today.getDate() - 1));
                }

                return dates;
            })();
        }


        return this.dummyDaysField;
    }


    get dummyDownloads() {
        let maxDailyDownloads = 200;

        if (this.dummyDownloadsField === undefined) {
            this.dummyDownloadsField = this.dummyDays.map(() => Math.floor(Math.random() * maxDailyDownloads));
        }

        return this.dummyDownloadsField;
    }


    randomWholeNum(max) {
        return Math.floor(Math.random() * max);
    }


    /*
     get increase today from here
    */
    get dummyPurchases() {
        if (this.dummySalesField === undefined) {

            this.dummySalesField = this.dummyDownloads.map((d) => {
                return this.randomWholeNum(d) * this.state.appInsightsAppPrice;
            });

        }

        return this.dummySalesField;
    }


    get chart() {

        let slice = [this.state.insightGroupingStart, this.state.insightGroupingStart + this.state.insightGroupingSpacing + 1];

        return (
            <>
                <LineChart
                    yAxisStepSize={this.insights.yAxisStepSize}
                    labels={this.state.appStatsDays.slice(...slice)}
                    showLegends={false}
                    showGridLines={false}
                    showXAxisLabel={false}
                    xAxisStepSize={31}
                    yAxisLabelFormatter={this.insights.yAxisLabelFormatter.bind(this)}
                    xAxisLabelFormatter={this.insights.xAxisLabelFormatter.bind(this)}
                    tooltipTitleCallBack={this.insights.tooltipTitleCallBack.bind(this)}
                    tooltipLabelCallBack={this.insights.tooltipLabelCallBack.bind(this)}
                    xAxisLabel={"Dates"}
                    autoSkip={true}>
                    {
                        this.state.appInsightKeys.map((insightKey) => {


                            let insight = this.state.appInsightValues[insightKey].slice(...slice);

                            let color = this.state.appInsightColors[insightKey];

                            return (
                                <DataSet
                                    label={insightKey}
                                    borderColor={color}
                                    backgroundColor={color}
                                    borderWidth={4}
                                    pointRadius={1}
                                    data={insight || []}
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

    get currentProjectsType() {
        return this.state.currentProjectsTypeField || this.state.projects.keys()[0] || 0;
    }

    get currentApp() {
        let {
            currentApp,
            projects
        } = this.state;

        if (currentApp === 0) return {
            id: 0,
            name: "All"
        };

        return projects[this.currentProjectsType].list[currentApp - 1] || {
            id: 0,
            name: "All"
        };
    }

    set currentApp(value) {
        this.setState({currentApp: value});
    }

    get appInsightsAppsTabs() {

        let tabs = [
            {
                key: 0,
                label: <Row><MaterialTextView text={"All"} fontSize={12}/></Row>
            },
            ...this.state.projects[this.currentProjectsType].list.map(({id, name}, i) => (
                {
                    key: i + 1,
                    label: <MaterialIcon icon={"Apps"} iconSize={24}/>
                }
            ))
        ];

        return (
            <TabsLayout
                value={this.state.currentApp}
                variant={TabsLayout.VARIANT.SCROLLABLE}
                orientation={TabsLayout.ORIENTATION.VERTICAL}
                tabStyle={{margin: 0, height: 46}}
                onChange={(e, v) => this.currentApp = v}
                tabs={
                    tabs
                }
            />
        );
    }

    set currentProjectsType(value) {
        this.setState({
            currentProjectsTypeField: value
        });
    }

    get appInsightsBody() {
        return (
            <Grid container>

                <Grid item xs={11}>
                    <Row justify={Flex.CENTER} alignContent={Flex.CENTER} alignItems={Flex.CENTER}>
                        {
                            this.state.appInsightKeys.map((option, k) => (
                                <>
                                    <Checkbox
                                        key={k}
                                        style={{padding: 0}}
                                        checked={this.state.appInsightsOptionsVisibility[option]}
                                        onChange={
                                            (e, chkd) => {
                                                this.setState(prevState => {
                                                    prevState.appInsightsOptionsVisibility[option] = !prevState.appInsightsOptionsVisibility[option];

                                                    return prevState;
                                                });
                                            }}
                                    />
                                    <MaterialTextView fontSize={11} text={option}/>
                                </>
                            ))
                        }
                    </Row>
                    {this.chart}
                </Grid>
                <Column item xs={1} style={{
                    display: "flex",
                    height: 44 * 6
                }}>
                    {this.appInsightsAppsTabs}
                </Column>
            </Grid>
        );
    }

    get insightGroupingStart() {
        return this.state.insightGroupingStart;
    }

    set insightGroupingStart(value) {
        let {appStatsDays} = this.state;

        this.setState(({insightGroupingStart, ...prevState}) => {

            let startDate = appStatsDays[value];

            if (startDate === undefined) {
                value = insightGroupingStart;
                // revert values
                startDate = appStatsDays[value];

            }

            prevState.currentMonth = startDate.getMonth();
            prevState.insightGroupingStart = value;

            return prevState;
        });
    }

    getDatePostFix(date) {
        let value = "";
        let rem = date % 10;

        if (date === 12 || date === 13) return "th";

        switch (rem) {
            case 1:
                value = "st";
                break;
            case 2:
                value = "nd";
                break;
            case 3:
                value = "rd";
                break;
            default:
                value = "th";
        }

        return value;

    }

    get currentStartDate() {
        return this.state.appStatsDays[this.insightGroupingStart];
    }

    get currentEndDate() {

        let {currentStartDate} = this.state;


        return new Date(currentStartDate.getDate() + this.state.insightGroupingSpacing);
    }

    get insightsWeeksGrouping() {

        let date = this.currentStartDate;

        let monthsPassed = date.getMonth();

        return (
            <>
                <MaterialSelect

                />
                {this.insightsMonthSelect}
            </>
        );
    }

    get insightGrouping() {
        let {
            insightGroupingStart,
            insightGroupingSpacing,
            appsInsightsDays,
            appStatsDays
        } = this.state;

        let view;

        switch (appsInsightsDays) {
            case AppsSalesInsights.INSIGHTS_WEEKS:
                view = (
                    this.insightsWeeksGrouping
                );
                break;
            case AppsSalesInsights.INSIGHTS_MONTHS:
                view = this.insightsMonthSelect;
                break;
            case AppsSalesInsights.INSIGHTS_YEARS:
                view = (
                    <>
                        {insightGroupingStart}-{insightGroupingSpacing}
                    </>
                );
                break;
            default:
                let startDate = (appStatsDays[insightGroupingStart] || new Date()).getDate();
                let endDate = (appStatsDays[insightGroupingStart + insightGroupingSpacing] || new Date()).getDate();

                view = (
                    <>
                        <MaterialIcon icon={"ChevronLeft"} iconSize={18} onClick={() => {
                            this.insightGroupingStart -= insightGroupingSpacing;
                        }}/>
                        {startDate}{this.getDatePostFix(startDate)}-{endDate}{this.getDatePostFix(endDate)}
                        <MaterialIcon icon={"ChevronRight"} iconSize={18} onClick={() => {
                            this.insightGroupingStart += insightGroupingSpacing;
                        }}/>
                        {this.insightsMonthSelect}
                    </>
                );
        }

        return view;
    }

    get insightsMonthSelectItems() {
        if (this.insightsMonthSelectItemsField === undefined) {
            this.insightsMonthSelectItemsField = Calendar.MONTHS_LIST_SHORT.map((month, i) => (
                {
                    key: i,
                    value: month
                }
            ));
        }

        return this.insightsMonthSelectItemsField;
    }


    get insightYears() {
        return this.state.insightYears;
    }


    set insightYears(years) {
        this.setState({insightYears: years});
    }

    set currentYearIndex(currentYearIndex) {
        this.setState({currentYearIndex: currentYearIndex});
    }

    get currentYearIndex() {
        return this.state.currentYearIndex;
    }

    get insightsYearsSelect() {


        return (
            <MaterialSelect
                value={this.state.currentYearIndex}
                onChange={(e, component) => {
                    this.setState({
                        currentYearIndex: component.props.value
                    }, () => {

                    });
                }}

                selectionItems={this.state.insightYears.map((year, i) => ({
                    key: i,
                    value: year
                }))}/>

        );
    }

    get insightsMonthSelect() {

        //TODO get nearest march to set as the current start

        return (
            <MaterialSelect
                value={this.state.currentMonth}
                onChange={(e, component) => {
                    this.setState({
                        currentMonth: component.props.value
                    }, () => {

                        this.updateAppsInsights();
                    });
                }}
                defaultValue={0}
                selectionItems={this.insightsMonthSelectItems}/>
        );
    }

    get insightGroupBy() {
        return (
            <MaterialSelect
                value={this.state.appsInsightsDays}
                onChange={(e, newValue) => {
                    this.setState({
                        appsInsightsDays: newValue.props.value
                    }, () => {
                        this.updateAppsInsights();
                    });
                }}
                defaultValue={AppsSalesInsights.INSIGHTS_DAYS}
                selectionItems={this.selectionStates}/>
        );
    }

    get appInsightsHeader() {

        let headerItemsAlignment = Flex.CENTER;

        let headerCommonProps = {
            alignItems: headerItemsAlignment
        };

        return (
            <Row>
                <Column xs={6} lg={3}>
                    <Row style={{height: 32}} alignContent={Flex.CENTER} justify={Flex.CENTER} alignItems={Flex.CENTER}>
                        <MaterialTextView text={this.currentApp.name}/>
                    </Row>
                </Column>
                <Column xs={6} lg={7} container>
                    <Row justify={Flex.END} {...headerCommonProps}>
                        {this.insightGrouping}
                        {this.insightGroupBy}
                        {this.insightsYearsSelect}
                    </Row>
                </Column>
                <Column xs={12} lg={2}>
                    <Row justify={Flex.END} {...headerCommonProps}>
                        {this.appInsightsSort}
                        {this.appInsightsMenu}
                    </Row>
                </Column>
            </Row>
        );
    }

    //Bind event
    updateInsightsTab(e, newValue) {

    }

    get appInsightsTabs() {
        return (
            <TabsLayout
                defaultTabIndex={0}
                tabs={this.projectTypes.map((type, i) => ({
                    key: i,
                    label: type
                }))}
                onChange={(e, value) => {
                    this.currentProjectsType = value;
                }}

            />
        );
    }


    get totalDownloads() {
        return this.state.totalDownloads;
    }

    get grossSales() {
        return this.state.grossSales;
    }

    set grossSales(value) {
        this.setState({grossSales: value});
    }

    get downloadsChangePercent() {
        return this.state.downloadsChangePercent;
    }

    render() {
        return (
            <>
                {this.appInsightsTabs}
                <Paper style={{padding: 4}}>
                    {this.appInsightsHeader}
                    <MaterialDivider spacing={2} orientation={"horizontal"}/>
                    {this.appInsightsBody}
                    <MaterialDivider spacing={2} orientation={"horizontal"}/>
                    <MaterialTextView text={"Software Insights"}/>
                    <Row alignItems={Flex.END}>
                        <MaterialTextView text={"Total Sales:"} variant={"body2"}/>
                        <MaterialTextView text={`$${this.grossSales}`} variant={"body2"}/>
                    </Row>
                    <Row alignItems={Flex.END}>
                        <MaterialTextView text={"Downloads Sales:"} variant={"body2"}/>
                        <MaterialTextView text={`${this.totalDownloads}`}/>
                        <MaterialIcon icon={"ExpandLess"} color={Settings.colorSuccess}/>
                        <MaterialTextView text={`${this.downloadsChangePercent}%`}/>
                    </Row>
                </Paper>
            </>
        );
    }

}

