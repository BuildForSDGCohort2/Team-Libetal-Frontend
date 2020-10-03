import React, {Component} from "react";
import MaterialCol from "../../widgets/grid/MaterialCol";
import {Gitgraph, templateExtend} from "@gitgraph/react";
import TabsLayout from "../../widgets/TabsLayout";
import MaterialTextView from "../../widgets/MaterialTextView";
import GridItem from "../../widgets/grid/GridItem";
import MaterialRow from "../../widgets/grid/MaterialRow";
import Flex from "../../widgets/Flex";
import Libetal from "../../widgets/icons/Libetal";
import CommitsListView from "./CommitsListView";
import {Toolbar} from "@material-ui/core";
import Colors from "../../Colors";
import Paper from "@material-ui/core/Paper";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import SearchInputBase from "../../widgets/input/SearchInputBase";
import Separator from "../../widgets/separator";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import Card from "@material-ui/core/Card";
import MaterialDivider from "../../widgets/MaterialDivider";
import MaterialBtn from "../../widgets/MaterialBtn";
import GitTreeListView from "./GitTreeListView";

/**TODO
 * Should display information about commits done
 * in terms of a table of
 * commit message, commit date, issue relating to the commit, cost estimation, duration taken, the cost of
 * production.
 * Or a view as commit branches
 * */
export default class RepoCommits extends Component {


    static GRAPHS = 1;
    static LIST = 2;

    state = {
        commits: [],
        mode: RepoCommits.LIST

    };


    constructor(props) {
        super(props);
        this.initDisplayContent();

    }

    get commitsDefaultOptions() {
        if (this.commitsDefaultOptionsField === undefined) this.commitsDefaultOptionsField = {
            author: `breimer <brymher@yahoo.com>`,
            style: this.graphTemplate
        };

        return this.commitsDefaultOptionsField;
    }

    initDisplayContent() {
        this.fetchGitTree();
    }

    fetchGitTree() {
        fetch("/data/trees/libetal.json")
            .then(response => response.json())
            .then(this.onCommitsLoad.bind(this))
            .catch(this.onCommitsLoadFail.bind(this));
    }

    onCommitsLoadFail(error) {

    }

    onCommitsLoad({response: {code: responseCode}, data, itemsCount} = {response: {}}) {
        if (responseCode === 200) {
            this.setState({tree: data});
        } else {
            console.log(`Unhandled response error`);
        }
    }

    prepGraph(gitgraph) {

        const master = gitgraph.branch({
            name: "master",
            commitDefaultOptions: this.commitsDefaultOptions
        });

        master.commit({
            subject: "Init the project",
            author: `breimer <brymher@yahoo.com>`
        });
        master
            .commit("Add README")
            .commit("Add tests")
            .commit(<MaterialTextView text={"Initial Commit"}/>);
        master.tag("v1.0");
        const newFeature = gitgraph.branch({
            name: `new-feature`,
            commitDefaultOptions: this.commitsDefaultOptions
        });
        newFeature.commit("Implement an awesome feature");
        master.commit("Hotfix a bug");
        newFeature.commit("Fix tests");
        const nextFeature = gitgraph.branch({
            name: `ui-design`,
            commitDefaultOptions: this.commitsDefaultOptions
        });
        nextFeature.commit("Some feature");
        nextFeature.commit("Other commiet");

        const anotherFeature = gitgraph.branch({
            name: `ui-branch`,
            commitDefaultOptions: this.commitsDefaultOptions
        });
        anotherFeature.commit(`Some feature \t estimated.cost:${1000}`);
        anotherFeature.commit("Other commiet");
        anotherFeature.commit({
            subject: "Add feature",
            body: "More details about the feature…",
            dotText: "",
            tag: "v1.2",
            style: {}
        });
        // Merge `newFeature` into `master`
        master.merge(newFeature, "Release new version");
    }

    get graphTemplate() {
        if (this.graphTemplateField === undefined) {
            this.graphTemplateField = templateExtend(
                "metro",
                {
                    colors: [Colors.purple, Colors.orange, Colors.indigo, Colors.pink], // branches colors, 1 per column
                    branch: {
                        lineWidth: 4,
                        spacingX: 100,
                        showLabel: true,                  // display branch names on graph,
                        spacing: 14
                    },
                    commit: {
                        spacing: 48,
                        dot: {
                            size: 4
                        },
                        message: {
                            displayAuthor: true,
                            displayBranch: true,
                            displayHash: false,
                            font: "normal 12pt Arial"
                        },
                        shouldDisplayTooltipsInCompactMode: false, // default = true
                        tooltipHTMLFormatter: function (commit) {
                            return "" + commit.sha1 + "" + ": " + commit.message;
                        }
                    }
                }
            );
        }

        return this.graphTemplateField;
    }

    get toolbar() {

        let {
            white,
            purple,
            purple_darken_1
        } = Colors;
        let totalCommits = this.toThousandsString(100000);
        let mergedCommits = this.toThousandsString(50000);
        return (
            <Toolbar style={{backgroundColor: Colors.purple, minHeight: 42}}>
                <MaterialRow alignItems={Flex.CENTER}>
                    <MaterialIconButton
                        variant={this.state.mode === RepoCommits.LIST ? "contained" : "text"}
                        iconColor={Colors.white}
                        onClick={
                            e => {
                                this.setState({mode: RepoCommits.LIST});

                                return true;
                            }
                        }
                        icon={"List"}
                        iconSize={20}
                        marginLR={4}
                        padding={2}
                    />
                    <MaterialIconButton
                        variant={this.state.mode === RepoCommits.GRAPHS ? "contained" : "text"}
                        onClick={
                            e => {
                                this.setState({mode: RepoCommits.GRAPHS});

                                return true;
                            }
                        }
                        iconColor={white}
                        icon={"AccountTree"}
                        iconSize={20}
                        padding={2}

                    />

                    <Separator/>
                    <MaterialBtn
                        variant={"text"}
                        content={`T.Commits: ${totalCommits}`}
                        textColor={white}
                        padding={4}
                        marginRight={4}
                        textTransform={"uppercase"}
                        fontSize={12}
                        title={`Showing total commits count`}
                    />
                    <MaterialBtn
                        variant={"text"}
                        content={`M.Commits: ${mergedCommits}`}
                        textColor={white}
                        padding={4}
                        textTransform={"uppercase"}
                        fontSize={12}
                        title={`Showing merged commits count`}
                    />
                    <Separator/>
                    <GridItem>
                        <Paper
                            style={{
                                backgroundColor: purple_darken_1,
                                paddingLeft: 6,
                                paddingRight: 6
                            }}
                        >
                            <SearchInputBase
                                placeholder={"Search:#{by:me}"}
                                textColor={white}

                                iconColor={white}/>
                        </Paper>
                    </GridItem>
                    <MaterialOptionsMenu
                        id={"commits-list-options"}
                        controller={MaterialIconButton}
                        controllerProps={{
                            icon: "MoreVert",
                            iconColor: purple,
                            buttonColor: white,
                            iconSize: 20,
                            padding: 2,
                            marginLR: 4
                        }}
                        menuItems={[
                            {
                                itemId: 1,
                                title: "Action 1"
                            }, {
                                itemId: 2,
                                title: "Action 2"
                            }, {
                                itemId: 3,
                                title: "Action 3"
                            }, {
                                itemId: 4,
                                title: "Action 4"
                            }
                        ]}
                    />
                </MaterialRow>
            </Toolbar>
        );
    }

    get graphs() {
        return (

            <GridItem xs={12} style={{height: 400}} height={400} overflowY={"auto"}>
                <Gitgraph
                    options={{
                        template: this.graphTemplate
                    }}
                >
                    {(graph) => this.prepGraph(graph)}
                </Gitgraph>
            </GridItem>
        );
    }

    get view() {
        if (this.state.mode === RepoCommits.GRAPHS) return this.graphs;

        return <GitTreeListView branches={this.state.tree} navigator={this.props.navigator}/>;
    }

    toThousandsString(value) {

        if (value >= 1000) {

            let append = `k`;
            if (value % 1000 >= 1) append += `+`;

            value = `${Math.floor(value / 1000)}` + append;
        }


        return value;

    }

    render() {

        let {
            white,
            green,
            orange,
            purple,
            blue,
            red,
            pink
        } = Colors;

        /**TODO
         * Unify language design
         * formatted numbers i.e
         * // This should be valid code
         * let totalLoggedHours = 200,000.00;
         * */
        let totalLoggedHours = 200000.30;
        let mergedLoggedHours = 140000;
        let totalMergedLoggedHoursDifference = totalLoggedHours - mergedLoggedHours;
        let hrs = " hrs";

        let totalCommitsCost = 10000.00;
        let mergedCommitsCost = 8000.00;
        let totalMergedCommitsCostDifference = totalCommitsCost - mergedCommitsCost;

        let commitsCostSign = "$";
        let totalCommits = 900000;
        let mergedCommits = 600000;
        let totalMergeCommitsDifference = totalCommits - mergedCommits;

        totalCommits = this.toThousandsString(totalCommits);
        mergedCommits = this.toThousandsString(mergedCommits);
        totalMergeCommitsDifference = this.toThousandsString(totalMergeCommitsDifference);

        totalCommitsCost = this.toThousandsString(totalCommitsCost);
        mergedCommitsCost = this.toThousandsString(mergedCommitsCost);
        totalMergedCommitsCostDifference = this.toThousandsString(totalMergedCommitsCostDifference);

        totalLoggedHours = this.toThousandsString(totalLoggedHours);
        mergedLoggedHours = this.toThousandsString(mergedLoggedHours);
        totalMergedLoggedHoursDifference = this.toThousandsString(totalMergedLoggedHoursDifference);

        return (
            <MaterialRow alignItems={Flex.CENTER} justify={Flex.CENTER} marginBottom={10}>
                <GridItem xs={12} sm={3} lg={3} padding={8}>
                    <Card style={{backgroundColor: purple, color: white}}>
                        <MaterialRow justify={Flex.CENTER} paddingTop={8}>
                            My Total Commit Costs
                            <MaterialRow marginTB={6} justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                                <GridItem>
                                    <MaterialTextView
                                        text={`Total`}
                                    />
                                    <MaterialTextView
                                        text={`Merged`}
                                    />
                                    <MaterialTextView
                                        text={`Unused`}
                                    />
                                </GridItem>
                                <MaterialDivider color={white} orientation={MaterialDivider.VERTICAL}/>
                                <GridItem>
                                    <MaterialTextView
                                        text={totalCommits}
                                    />
                                    <MaterialTextView
                                        text={mergedCommits}
                                    />
                                    <MaterialTextView
                                        text={totalMergeCommitsDifference}
                                    />
                                </GridItem>
                            </MaterialRow>
                        </MaterialRow>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={3} lg={3} padding={8}>
                    <Card style={{backgroundColor: orange, color: white}}>
                        <MaterialRow justify={Flex.CENTER} paddingTop={8}>
                            Commits
                            <MaterialRow marginTB={6} justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                                <GridItem>
                                    <MaterialTextView
                                        text={`Total`}
                                    />
                                    <MaterialTextView
                                        text={`Merged`}
                                    />
                                    <MaterialTextView
                                        text={`Unused`}
                                    />
                                </GridItem>
                                <MaterialDivider color={white} orientation={MaterialDivider.VERTICAL}/>
                                <GridItem>
                                    <MaterialTextView
                                        text={totalCommits}
                                    />
                                    <MaterialTextView
                                        text={mergedCommits}
                                    />
                                    <MaterialTextView
                                        text={totalMergeCommitsDifference}
                                    />
                                </GridItem>
                            </MaterialRow>
                        </MaterialRow>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={3} lg={3} padding={8}>
                    <Card style={{backgroundColor: blue, color: white}}>
                        <MaterialRow justify={Flex.CENTER} paddingTop={8}>
                            Commits Estimates
                            <MaterialRow marginTB={6} justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                                <GridItem>
                                    <MaterialTextView>
                                        Total
                                    </MaterialTextView>
                                    <MaterialTextView
                                        text={`Merged`}
                                    />
                                    <MaterialTextView
                                        text={`Unused`}
                                    />
                                </GridItem>
                                <MaterialDivider color={white} orientation={MaterialDivider.VERTICAL}/>
                                <GridItem>
                                    <MaterialTextView
                                        text={`${commitsCostSign}.${totalCommitsCost}/=`}
                                    />
                                    <MaterialTextView
                                        text={`${commitsCostSign}.${mergedCommitsCost}/=`}
                                    />
                                    <MaterialTextView
                                        text={`${commitsCostSign}.${totalMergedCommitsCostDifference}`}
                                    />
                                </GridItem>
                            </MaterialRow>
                        </MaterialRow>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={3} lg={3} padding={8}>
                    <Card style={{backgroundColor: green, color: white}}>
                        <MaterialRow justify={Flex.CENTER} paddingTop={8}>
                            Man Hours
                            <MaterialRow marginTB={6} justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                                <GridItem>
                                    <MaterialTextView text={`Total`}/>
                                    <MaterialTextView text={`Merged`}/>
                                    <MaterialTextView text={`Unused`}/>
                                </GridItem>
                                <MaterialDivider color={white} orientation={MaterialDivider.VERTICAL}/>
                                <GridItem>
                                    <MaterialTextView
                                        text={totalLoggedHours + hrs}
                                    />
                                    <MaterialTextView
                                        text={mergedLoggedHours + hrs}
                                    />
                                    <MaterialTextView
                                        text={totalMergedLoggedHoursDifference + hrs}
                                    />
                                </GridItem>
                            </MaterialRow>
                        </MaterialRow>
                    </Card>
                </GridItem>
                <GridItem xs={12} lg={10} marginTop={8}>
                    <Paper style={{borderRadius: 0, marginBottom: 16}}>
                        {this.toolbar}
                        {this.view}
                    </Paper>
                </GridItem>
            </MaterialRow>
        );
    }
}