import React, {Component} from "react";
import Settings from "../../../utils/Settings";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Paper from "@material-ui/core/Paper";
import AppBar from "./widgets/AppBar";
import Footer from "../../Footer";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import GridItem from "../../../widgets/grid/GridItem";
import Flex from "../../../widgets/Flex";
import Avatar from "@material-ui/core/Avatar";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialDivider from "../../../widgets/MaterialDivider";
import Colors from "../../../Colors";
import Separator from "../../../widgets/separator";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Chip from "@material-ui/core/Chip";
import Spacer from "../../../widgets/dividers/Spacer";
import TabsLayout from "../../../widgets/TabsLayout";
import LineChart from "../../../widgets/graphs/LineChart";
import DataSet from "../../../widgets/DataSet";
import Bar from "../../../widgets/graphs/Bar";
import MaterialIcon from "../../../widgets/MaterialIcon";
import Libetal from "../../../widgets/icons/Libetal";
import CommitBranch from "../../../widgets/icons/CommitBranch";
import ProjectsListView from "../../dashboard/projects/widgets/ProjectsListView";


/**
 * Display user profile details
 * - User descriptive details
 * - User account details
 *  - Commits done
 *  - Merged Commits
 *  - Discarded commits
 *  - Hours worked
 *  - Hours worked this week
 *  - Other details about hours worked
 *      - Hours worked per month
 *      - Hours worked a year
 *      - HOurs worked total
 *
 * - User performance details
 *
 *
 * */
export default class Profile extends Component {


    state = {
        projects: [],
        profileHomeTab: 0,
        hoursDoneThisWeek: [1, 2],
        commitsData: {
            merged: 0,
            commits: 0,
            pull_requests: 0
        },
        sampleSize: 0,
        // this could be dependant on totalHeight/ (fontSize + yS
        // pacing)
        visibleSteps: 4
    };


    toolTipsLabelCallback(toolTip, data) {
        return `${toolTip.xLabel} ${toolTip.yLabel}hrs`;
    }

    calculateDiv(f, v) {
        let k = 10;
        return [Math.floor(f * 10), v / k, f * k];
    }

    processYAxisStepSize(sampleSize, visibleSteps) {

        let vD = visibleSteps - 1;
        let f = sampleSize / (vD <= 0 ? 1 : vD);
        let l = `${sampleSize}`.length - 1;


        let v = "1";
        while (l--) {
            v += "0";
        }

        v = parseInt(v);

        let div = Math.floor(f /= v);

        let c = 5;

        // noinspection StatementWithEmptyBodyJS
        while (div === 0 && c--) {
            ([div, v, f] = this.calculateDiv(f, v));
        }

        if (c === 0) {
            // least objectionable option
            div = 10;
        }


        return div * v;
    }

    get yAxisStepSize() {
        let {sampleSize, visibleSteps} = this.state;
        return this.processYAxisStepSize(sampleSize, visibleSteps);
    }


    get weekHours() {
        let {
            state: {
                sampleSize,
                totalWorkedHrs,
                hoursDoneThisWeek,
                daysOfWeekForHours
            },
            toolTipsLabelCallback,
            yAxisStepSize
        } = this;

        let {
            blue,
            white,
            orange,
            green,
            blue_lighten_2: axisTextColor,
            alpha
        } = Colors;

        return (
            <Paper style={{padding: 6}}>
                <MaterialRow justify={Flex.CENTER}>Weeks' Hours</MaterialRow>
                <LineChart
                    labels={daysOfWeekForHours}
                    showLabels={false}
                    showLegends={false}
                    showGridLines={false}
                    tooltipLabelCallBack={toolTipsLabelCallback}
                    yAxisStepSize={yAxisStepSize}
                    yAxisSampleSize={(yAxisStepSize * this.state.visibleSteps) + yAxisStepSize}
                    onDidMount={
                        chart => {
                            this.weeksChart = chart;
                        }
                    }
                    children={[
                        <DataSet
                            data={hoursDoneThisWeek}
                            label={"This Week"}
                            borderColor={blue}
                            backgroundColor={alpha("blue", .4)}
                            borderWidth={2}
                            fillArea={true}
                            pointRadius={1}
                        />
                    ]}
                />
                <MaterialDivider spacing={2}/>
                <MaterialRow alignItems={Flex.CENTER} justify={Flex.SPACE_BETWEEN}>
                    {totalWorkedHrs}hrs
                    <GridItem>
                        <MaterialRow alignItems={Flex.CENTER}>
                            7hrs Today
                        </MaterialRow>
                    </GridItem>
                    <GridItem>
                        <MaterialRow alignItems={Flex.CENTER}>
                            <MaterialIcon icon={"ExpandLess"} color={Colors.green}/> 2%
                        </MaterialRow>
                    </GridItem>
                </MaterialRow>
            </Paper>
        );
    }


    get mergeDetails() {
        let {
            purple,
            green,
            indigo,
            orange,
            alpha
        } = Colors;
        let {
            commitsData
        } = this.state;

        let data = [commitsData.merged, commitsData.commits, commitsData.pull_requests];
        let yAxisSampleSize = data.reduce((a, b) => a + b);

        return (
            <Paper elevation={2} style={{padding: 6}}>
                <MaterialRow justify={Flex.CENTER}>
                    <MaterialTextView text={"Projects"}/>
                    <Bar
                        labels={["Jan", "Feb", "Mar"]}
                        showLabels={false}
                        showLegends={false}
                        showGridLines={false}
                        yAxisStepSize={this.processYAxisStepSize(yAxisSampleSize, 3)}
                        onDidMount={
                            chart => this.projectsChart = chart
                        }
                        children={[
                            <DataSet
                                data={[10, commitsData.merged, 11]}
                                label={"Merge"}
                                borderColor={orange}
                                backgroundColor={alpha("orange", .4)}
                                borderWidth={2}
                                fillArea={true}
                                pointRadius={1}
                            />,
                            <DataSet
                                data={[13, commitsData.commits, 20]}
                                label={"Commits"}
                                borderColor={green}
                                backgroundColor={alpha("green", .4)}
                                borderWidth={2}
                                fillArea={true}
                                pointRadius={1}
                            />,
                            <DataSet
                                data={[11, 10, commitsData.pull_requests]}
                                label={"Pull Requests"}
                                borderColor={Colors.indigo}
                                backgroundColor={alpha("indigo", .4)}
                                borderWidth={2}
                                fillArea={true}
                                pointRadius={1}
                                type={"bar"}
                            />,
                            <DataSet
                                data={[10, 20, 16]}
                                label={"Performance"}
                                borderColor={Colors.indigo}
                                backgroundColor={alpha("indigo", .4)}
                                borderWidth={1}
                                fillArea={true}
                                pointRadius={2}
                                type={"line"}
                            />
                        ]}
                    />
                </MaterialRow>
                <MaterialDivider/>
                <MaterialRow alignItems={Flex.CENTER}>
                    <GridItem>
                        <MaterialRow alignItems={Flex.CENTER}>
                            <CommitBranch height={24} width={24} color={purple}/>
                            <MaterialTextView
                                text={"12 merged"}
                                fontSize={11}
                            />
                        </MaterialRow>
                    </GridItem>
                    <GridItem>
                        <MaterialRow alignItems={Flex.CENTER}>
                            <CommitBranch height={24} width={24} color={purple}/>
                            <MaterialTextView
                                text={"10 commits"}
                                fontSize={11}
                            />
                        </MaterialRow>
                    </GridItem>
                    <GridItem>
                        <MaterialRow alignItems={Flex.CENTER}>
                            <CommitBranch height={24} width={24} color={purple}/>
                            <MaterialTextView
                                text={"10 PRs"}
                                fontSize={11}
                            />
                        </MaterialRow>
                    </GridItem>
                </MaterialRow>
            </Paper>
        );
    }

    dividedCard(icon, title, startTitle, startValue, endTitle, endValue, titleTextVariant = "h5", startValueTextVariant = "h4", endValueTextVariant = startValueTextVariant) {

        if (icon !== undefined && typeof icon === "string") icon = <MaterialIcon icon={icon}/>
        ;
        return (
            <Paper style={{padding: 4}}>
                <MaterialRow alignItems={Flex.CENTER}>
                    {icon}
                    <Spacer orientation={Spacer.VERTICAL} spacing={6}/>
                    <MaterialTextView text={title} variant={titleTextVariant}/>
                </MaterialRow>
                <MaterialRow alignItems={Flex.CENTER}>
                    <MaterialCol xs={6} alignItems={Flex.CENTER}>
                        <MaterialTextView text={startTitle}/>
                        <MaterialTextView text={startValue} variant={startValueTextVariant}/>

                    </MaterialCol>
                    <MaterialDivider orientation={MaterialDivider.VERTICAL}/>
                    <MaterialCol xs={5} alignItems={Flex.CENTER}>
                        <MaterialTextView text={endTitle}/>
                        <MaterialTextView text={endValue} variant={endValueTextVariant}/>
                    </MaterialCol>
                </MaterialRow>
            </Paper>
        );
    }

    get issuesClosedOpen() {
        return this.dividedCard(
            "ReportOutlined",
            "Issues",
            "Assigned",
            100,
            "Closed",
            40
        );
    }

    get projectsDone() {
        return this.dividedCard(
            "AccountTree",
            "Projects",
            "Active",
            10,
            "Production",
            4
        );
    }

    get codeReviews() {
        return this.dividedCard(
            "Code",
            "Code Reviews",
            "Done",
            10,
            "Requests",
            4
        );
    }

    get memberTeams() {
        return this.dividedCard(
            "People",
            "Teams",
            "In",
            4,
            "Invitations",
            2
        );
    }

    get workedHour() {
        return this.dividedCard(
            "WatchLater",
            "Hours",
            "Total",
            100,
            "This Month",
            20
        );
    }

    get projectsView() {
        return <ProjectsListView projects={this.state.projects} height={500} navigator={this.props.navigator}/>;
    }

    get activity() {

        return (
            <MaterialRow
                marginTop={8}
                alignItems={Flex.CENTER}
            >
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.issuesClosedOpen}
                </GridItem>
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.workedHour}
                </GridItem>
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.projectsDone}
                </GridItem>
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.codeReviews}
                </GridItem>
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.memberTeams}
                </GridItem>
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.weekHours}
                </GridItem>
                <GridItem xs={6} sm={4} lg={3} paddingLR={2} marginTB={4}>
                    {this.mergeDetails}
                </GridItem>
            </MaterialRow>
        );
    }

    updateCharts() {
        console.log(`Charts are not redrawing on page change`)
    }

    get currentProfileTab() {

        let view = this.activity;


        switch (this.state.profileHomeTab) {
            case 1:
                view = this.projectsView;
                break;
            case 2:
                view = this.activity;
                this.updateCharts();
                break;
            default:
                view = this.activity;
                this.updateCharts();
                break;

        }

        return view;
    }

    fetchWeekHours() {
        fetch("/data/profile/weeks/this.json")
            .then(data => data.json())
            .then(({response, data: {values, dates}}) => {
                if (response.code === 200) {
                    values = values.length > 0 ? values : [0, 0];
                    this.setState({
                        hoursDoneThisWeek: values,
                        daysOfWeekForHours: dates
                    });

                    new Promise(resolve => {
                        resolve(Math.max(...values));
                    }).then(sampleSize => this.setState({sampleSize: sampleSize}));

                    new Promise(resolve => {
                        resolve(values.reduce((a, b) => a + b));
                    }).then(totalWorkedHrs => this.setState({totalWorkedHrs}));
                }
            });
    }

    fetchCommitsData() {
        fetch("/data/profile/commits/basic.json")
            .then(data => data.json())
            .then(({response, data}) => {
                if (response.code === 200) {
                    this.setState({commitsData: data});
                }
            });
    }


    fetchProfileProjects() {
        fetch("/data/projects/breimer.json")
            .then(data => data.json())
            .then(({response, data}) => {
                if (response.code === 200) {
                    this.setState({projects: data});
                }
            });
    }

    fetchData() {
        this.fetchWeekHours();
        this.fetchCommitsData();
        this.fetchProfileProjects();
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {

        const {
            navigator
        } = this.props;

        return (
            <ThemeProvider theme={Settings.appTheme}>
                <AppBar navigator={navigator} componentInstance={this}/>
                <Paper style={{borderRadius: 0}} elevation={0}>
                    <MaterialRow justify={Flex.CENTER}>
                        <GridItem xs={12} sm={10} lg={9} marginTB={6}>
                            <Paper>
                                <MaterialRow padding={8}>
                                    <GridItem xs={12} sm={2} lg={1}>
                                        <Avatar
                                            variant={"circle"}
                                            src={"/images/header_banner.png"}
                                            style={{height: 80, width: 80}}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={9} lg={10} paddingLR={8}>
                                        <MaterialRow alignItems={Flex.CENTER}>
                                            <MaterialTextView
                                                text={"Breimer Radido"}
                                                variant={"h6"}
                                            />
                                            <MaterialDivider
                                                spacing={4}
                                                color={Colors.transparent}
                                                orientation={MaterialDivider.VERTICAL}
                                            />
                                            <MaterialTextView
                                                text={"@Brymher"}
                                                variant={"h4"}
                                            />
                                            <Separator/>
                                            <MaterialBtn
                                                content={"Edit"}
                                            />
                                        </MaterialRow>
                                        <MaterialRow>
                                            Php, Js, Python, Kotlin
                                        </MaterialRow>
                                        <MaterialRow>
                                            Android, React, React-Native
                                        </MaterialRow>
                                        <MaterialRow>
                                            <Chip size={"small"} label={3.5}/>
                                            <Spacer spacing={1} orientation={Spacer.VERTICAL}/>
                                            <MaterialIcon icon={"StarBorder"}/>
                                        </MaterialRow>
                                    </GridItem>
                                </MaterialRow>
                            </Paper>
                            <Spacer orientation={Spacer.HORIZONTAL} spacing={4}/>
                            <TabsLayout
                                tabs={[
                                    "Activity",
                                    "Projects",
                                    "Reviews"
                                ]}
                                onChange={
                                    (e, profileHomeTab) => {
                                        this.setState({profileHomeTab});
                                    }
                                }
                            />
                            {this.currentProfileTab}
                        </GridItem>
                    </MaterialRow>
                </Paper>
                <Footer navigator={navigator}/>
            </ThemeProvider>
        );
    }
}