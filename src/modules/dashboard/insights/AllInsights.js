import React from "react";
import Row from "../../../widgets/Row";
import AppsOsDistributionInsights from "./AppsOsDistributionInsights";
import AppsSalesInsights from "./AppsSalesInsights";
import AppsIssuesInsights from "./AppsIssuesInsights";
import Column from "../../../widgets/Column";
import MaterialTextView from "../../../widgets/MaterialTextView";
import CommitsInsights from "./CommitsInsights";
import Paper from "@material-ui/core/Paper";
import Colors from "../../../Colors";
import Flex from "../../../widgets/Flex";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialIcon from "../../../widgets/MaterialIcon";
import Grid from "@material-ui/core/Grid";
import UserInvestmentInsights from "./UserInvestmentInsights";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialCol from "../../../widgets/grid/MaterialCol";


export default class AllInsights extends React.Component {


    state = {
        platforms: []
    };

    async fetchPlatforms() {
        // Returns data relating to the current developer
        // Platforms they have contributed to
        // platform -> Apps they have worked on
        // most popular platforms
        // most popular apps
        // most popular stack
        // most popular Frameworks/SDK
        // most active os
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    response: {
                        status: "ok",
                        code: 200
                    },
                    data: [
                        {
                            id: 0,
                            name: "PC",
                            os: [
                                {
                                    id: 0,
                                    name: "Linux"
                                },
                                {
                                    id: 1,
                                    name: "Windows"
                                },
                                {
                                    id: 2,
                                    name: "Android"
                                },
                                {
                                    id: 3,
                                    name: "Chrome"
                                }
                            ]
                        }, {
                            id: 1,
                            name: "Mobile",
                            os: [
                                {
                                    id: 0,
                                    name: "Android"
                                }, {
                                    id: 1,
                                    name: "Windows"
                                }, {
                                    id: 2,
                                    name: "Ubuntu"
                                }, {
                                    id: 3,
                                    name: "Apple"
                                }
                            ]
                        }, {
                            id: 2,
                            name: "Embedded",
                            os: [
                                {
                                    id: 0,
                                    name: "Adruino"
                                }
                            ]
                        }
                    ]
                });
            }, 2000);
        });
    }

    componentDidMount() {
        this.fetchPlatforms()
            .then(
                platforms =>
                    this.setState({platforms: platforms.data})
            ).catch((e) => console.error(`Unhandled Response error ${e.message}`));
    }

    get commitsInsights() {
        return (<CommitsInsights/>);
    }

    get usersEarningsInsights() {
        return (<UserInvestmentInsights/>);
    }

    get issuesInsights() {
        return (<AppsIssuesInsights platforms={this.state.platforms} apps={this.state.apps}/>);
    }


    sampleTrendingFooterTextView(text) {
        return (
            <MaterialTextView text={text} fontSize={12} textColor={Colors.white}/>
        );
    }

    sampleTrendingItem(name = "Libetal", activeUsers = "10000+", color) {

        let textColor = Colors.white;

        return (
            <GridItem xs={12} sm={6} lg={3} paddingLR={4}>
                <Paper elevation={6} style={{backgroundColor: color}}>
                    <Row justify={Flex.CENTER} style={{flexGrow: 2}}>
                        <Grid container direction={"column"} alignItems={Flex.CENTER}>
                            <div style={{display: "flex", flexGrow: 1}}/>
                            <MaterialTextView
                                text={name}
                                variant={"h5"}
                                textColor={textColor}
                            />
                            <div style={{display: "flex", flexGrow: 1}}/>
                            <MaterialTextView
                                text={activeUsers}
                                textColor={textColor}
                                variant={"h4"}
                            />
                            <MaterialTextView
                                text={"active"}
                                textColor={textColor}
                                fontSize={10}
                            />
                            <div style={{display: "flex", flexGrow: 1}}/>
                            <Row justify={Flex.CENTER} alignItems={Flex.CENTER}>
                                <MaterialTextView
                                    text={"15%"}
                                    textColor={textColor}
                                    ffontSize={12}
                                />
                                <MaterialIcon icon={"ExpandLess"}
                                              color={textColor}
                                              iconSize={18}
                                />
                                <MaterialTextView
                                    text={"Users"}
                                    textColor={textColor}
                                    fontSize={12}
                                />
                            </Row>
                        </Grid>
                    </Row>
                    <MaterialDivider color={textColor}/>
                    <Row style={{background: Colors.alpha("black", .1)}}>
                        <Column xs={6}>
                            <MaterialTextView
                                text={"Commits: 100+"}
                                textColor={Colors.white}
                            />
                            {this.sampleTrendingFooterTextView("100 new")}
                            {this.sampleTrendingFooterTextView("10 merged")}
                        </Column>
                        <Column xs={6}>
                            <MaterialTextView
                                text={"Issues"}
                                textColor={Colors.white}
                            />
                            {this.sampleTrendingFooterTextView("10 New")}
                            {this.sampleTrendingFooterTextView("10 Closed")}
                        </Column>
                    </Row>
                </Paper>
            </GridItem>
        );
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
        let {
            pinState
        } = this.props;

        let xs = 11;

        return (
            <>
                <MaterialRow justify={Flex.SPACE_AROUND}>
                    {this.sampleTrendingItem("Libetal", "800k+", Colors.orange)}
                    {this.sampleTrendingItem("Dukto", "200k+", Colors.green)}
                    {this.sampleTrendingItem("Luro", "12+", Colors.pink)}
                    {this.sampleTrendingItem("FlexTron", "40k+", Colors.blue)}
                </MaterialRow>
                <MaterialDivider color={Colors.transparent} spacing={12} orientation={MaterialDivider.HORIZONTAL}/>
                <MaterialRow paddingLeft={8}>
                    <MaterialTextView text={"Accounts"} variant={"h5"}/>
                </MaterialRow>
                <MaterialRow justify={Flex.SPACE_EVENLY}>
                    <GridItem xs={xs} lg={pinState ? 6 : 5} paddingLR={2}>
                        <AppsSalesInsights apps={this.state.apps}/>
                    </GridItem>
                    <GridItem xs={xs} lg={pinState ? 6 : 4} paddingLR={2}>
                        <AppsOsDistributionInsights/>
                    </GridItem>
                    <GridItem xs={12} lg={pinState ? 6 : 3} paddingLR={2}>
                        {this.usersEarningsInsights}
                    </GridItem>
                    <GridItem xs={12} xm={6} lg={6} paddingLR={2}>
                        <MaterialCol>
                            <MaterialTextView text={"Projects Insights"} variant={"h5"}/>
                            <MaterialTextView text={"Commits"} variant={"h6"}/>
                        </MaterialCol>
                        <CommitsInsights/>
                    </GridItem>
                    <GridItem xs={12} xm={6} lg={6} paddingLR={2}>
                        <Row>
                            <MaterialTextView text={"Issues"} variant={"h6"}/>
                        </Row>
                        <MaterialRow>
                            {this.issuesInsights}
                        </MaterialRow>
                    </GridItem>
                </MaterialRow>
                <MaterialDivider color={Colors.transparent} spacing={12} orientation={MaterialDivider.HORIZONTAL}/>
            </>
        );
    }

}