import React from "react";
import Row from "../../widgets/Row";
import AppsOsDistributionInsights from "./AppsOsDistributionInsights";
import AppsSalesInsights from "./AppsSalesInsights";
import AppsIssuesInsights from "./AppsIssuesInsights";
import Column from "../../widgets/Column";
import MaterialTextView from "../../widgets/MaterialTextView";
import CommitsInsights from "./CommitsInsights";
import TransactionsInsights from "./TransactionsInsights";


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

    get transactionsInsights() {
        return (<TransactionsInsights platforms={this.state.platforms}/>);
    }

    get issuesInsights() {
        return (<AppsIssuesInsights platforms={this.state.platforms} apps={this.state.apps}/>);
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
                <Row>
                    TODO: Display trending items and their why they are trending. In terms of issues, issue solving
                    speed,
                    People contributing to, People financing etc
                </Row>
                <Row>
                    <MaterialTextView text={"Accounts"} variant={"h5"}/>
                </Row>
                <Row justify={Row.JUSTIFY.START} spacing={1} style={{marginBottom: 10}}>
                    <Column xs={xs} lg={pinState ? 6 : 5}>
                        <AppsSalesInsights apps={this.state.apps}/>
                    </Column>
                    <Column xs={xs} lg={pinState ? 6 : 4}>
                        <AppsOsDistributionInsights/>
                    </Column>
                    <Column lg={pinState ? 12 : 3}>
                        {this.transactionsInsights}
                    </Column>
                </Row>
                <Row>
                    <MaterialTextView text={"Projects Insights"} variant={"h5"}/>
                </Row>
                <Row>
                    <Column xs={12} xm={6} lg={6}>
                        <MaterialTextView text={"Commits"} variant={"h6"}/>
                        {this.commitsInsights}
                    </Column>
                    <Column xs={12} xm={6} lg={6}>
                        <Row>
                            <MaterialTextView text={"Issues"} variant={"h6"}/>
                        </Row>
                        <Row>
                            {this.issuesInsights}
                        </Row>
                    </Column>
                </Row>
            </>
        );
    }

}