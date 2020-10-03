import React, {Component} from "react";
import List from "@material-ui/core/List";
import ListItemDiv from "./ListItemDiv";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialBtn from "../../widgets/MaterialBtn";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import MaterialIcon from "../../widgets/MaterialIcon";
import CommitBranch from "../../widgets/icons/CommitBranch";
import Colors from "../../Colors";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GridItem from "../../widgets/grid/GridItem";
import MaterialRow from "../../widgets/grid/MaterialRow";
import Flex from "../../widgets/Flex";
import TabsLayout from "../../widgets/TabsLayout";
import ListItem from "@material-ui/core/ListItem";
import MaterialCol from "../../widgets/grid/MaterialCol";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import Avatar from "@material-ui/core/Avatar";
import BranchConnectionRep from "../../widgets/icons/BranchConnectionRep";
import Issue from "../dashboard/issues/Issue";


/**TODO
 * when fetching in terms of a single user
 * fetch whole branches but only flag commits
 * by the specified user and if the branch was merged or not to the main branch
 * */
export default class GitTreeListView extends Component {


    state = {
        master: {
            showCommits: true
        }
    };

    get tree() {
        if (this.treeField === undefined) this.treeField = this.processTree();


        return this.treeField;
    }

    processTree() {
        let {
            props: {
                tree
            }
        } = this;

        let i = 0;

        let currentBranch = "";

        while (i < tree.length) {

        }
    }


    treeProcessorHelper() {

    }

    onBranchHeadClick(branchName) {
        this.setState(state => {
            if (state[branchName] === undefined) state[branchName] = {showCommits: false};

            state[branchName].showCommits = !state[branchName].showCommits;
            return state;
        });
    }

    static sampleBranch = {
        name: "master",
        commits: [
            {
                author: {
                    name: "Musyoki",
                    email: "sample@email.com"
                }
            },
            {
                author: {
                    name: "Breimer",
                    email: "brymher@gmail.com"
                },
                branches: [
                    {
                        name: "ui",
                        commits: [
                            {
                                author: {
                                    name: "Musyoki",
                                    email: "sample@email.com"
                                }
                            },
                            {
                                author: {
                                    name: "Breimer",
                                    email: "brymher@gmail.com"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    static sampleCommit = {
        message: "The commit message goes here, long so for the demo.",
        author: {
            name: "Breimer",
            email: "brymher@gmail.com"
        },
        merged: false
    };

    prepBranchedCommit(commit, branches, branch, i) {
        let {
            blue,
            white,
            green
        } = Colors;

        let {
            message,
            author: {
                name: authorName,
                email
            }
        } = commit;


        let names = [branch.name];

        return (
            <>
                {this.prepPureCommit(commit)}
                {
                    branches.map(
                        (branch, i) => {
                            names.push(branch.name);
                            return this.prepTreeItem(branch, names, i);
                        }
                    )
                }
            </>
        );
    }

    prepPureCommit(commit) {
        let {
            cyan,
            blue,
            white,
            green,
            yellow,
            green_darken_1
        } = Colors;

        let {
            message,
            author: {
                name: authorName,
                email
            },
            merged = false,
            issue: {
                type: {
                    title: issueTypeTitle ="Documentation",
                    description: issueTypeDescription
                } = {},
                cost: {
                    value: issueCostEstimation = 0,
                    currency: {
                        name: issueCostCurrencyName = "K.Shilling",
                        sign: issueCostCurrencySign = "ksh"

                    } = {}
                } = {}
            } = {}
        } = commit;

        let [t = "F", color] = Issue.parseProps(issueTypeTitle);

        return (
            <ListItem component={MaterialCol}>
                <MaterialRow alignItems={Flex.CENTER}>
                    <GridItem>
                        <MaterialRow marginBottom={4} alignItems={Flex.CENTER}>
                            <MaterialBtn
                                variant={"text"}
                                style={{
                                    padding: 2,
                                    minWidth: 24,
                                    minHeight: 18,
                                    marginRight: 8
                                }}
                                content={t}
                                color={color}
                                textColor={white}
                            />
                            <MaterialTextView>
                                {message}
                            </MaterialTextView>
                        </MaterialRow>
                        <MaterialRow alignItems={Flex.CENTER}>
                            <Avatar style={{height: 24, width: 24, marginRight: 8}}/>
                            <MaterialTextView fontSize={12}>
                                by:
                            </MaterialTextView>
                            <MaterialTextView textColor={blue}>
                                @{authorName}
                            </MaterialTextView>
                        </MaterialRow>
                    </GridItem>
                    <Separator/>
                    <MaterialBtn
                        variant={"text"}
                        content={merged ? "merged" : "pending"}
                        textColor={white}
                        color={merged ? green_darken_1 : cyan}
                    />
                </MaterialRow>
                <MaterialRow>
                    <TabsLayout
                        variant={TabsLayout.VARIANT.SCROLLABLE}
                        tabTopPadding={2}
                        tabBottomPadding={2}
                        tabMarginBottom={0}
                        showIndicator={false}
                        tabs={[
                            {
                                key: 1,
                                label: `m.c: ${issueCostCurrencySign}${issueCostEstimation}`
                            },
                            {
                                key: 2,
                                label: `by:@issue.creator`
                            },
                            {
                                key: 3,
                                label: issueTypeTitle
                            }
                        ]}
                        onItemClick={
                            e => {
                                console.log(`Unhandled item click`);
                            }
                        }
                    />
                </MaterialRow>
            </ListItem>
        );
    }

    prepCommit(commit = {}, branch, i) {
        let {
            blue,
            white,
            green
        } = Colors;

        let {
            message,
            author: {
                name: authorName,
                email
            },
            branches
        } = {
            ...GitTreeListView.sampleCommit,
            ...commit
        };

        if (branches !== undefined && branches.length > 0) {
            return this.prepBranchedCommit(commit, branches, branch, i);
        } else {
            return this.prepPureCommit(commit, branch, i);
        }
    }

    prepTreeItem(branch = {}, names = [], i) {

        let {
            name,
            commits
        } = {
            ...GitTreeListView.sampleBranch,
            ...branch
        };

        let {

            purple
        } = Colors;

        if (names.length <= 0) names.push(name);


        let branchTitle = (
            <GridItem>
                <MaterialRow alignItems={Flex.CENTER}>
                    {
                        names.map(
                            (value, i) => {
                                if (i < names.length - 1) {
                                    return [
                                        value,
                                        <BranchConnectionRep
                                            color={Colors.orange}
                                            height={24}
                                            width={24}
                                            marginLR={4}/>
                                    ];
                                } else return value;
                            }
                        )
                    }
                </MaterialRow>
            </GridItem>
        );
        name = names.join(">");

        let branchState = this.state[name] || {showCommits: true};

        return (
            <>
                <ListItemDiv
                    style={{marginTop: 0}}
                    button
                    onClick={
                        e => {
                            this.onBranchHeadClick(name);
                        }
                    }>
                    <MaterialIconButton
                        icon={<CommitBranch height={24} width={24} color={purple}/>}
                        marginRight={8}
                    />
                    <ListItemText
                        primary={branchTitle}
                    />
                    {/*TODO NOT SURE WHY THIS WAS HERE YET <MaterialBtn
                        variant={"text"}
                        content={"Some text"}
                    />*/}
                    <MaterialIconButton
                        icon={"ExpandMore"}
                        iconColor={purple}
                        onClick={
                            e => {
                                this.onBranchHeadClick(name);
                            }
                        }
                    />
                </ListItemDiv>
                <Collapse in={branchState.showCommits}>
                    <List disablePadding>
                        {
                            commits.map(
                                (commit, i) => this.prepCommit(commit, branch, i)
                            )
                        }
                    </List>
                </Collapse>
            </>
        );
    }


    get treeItems() {
        let {
            props: {
                branches = [
                    GitTreeListView.sampleBranch
                ]
            }
        } = this;

        return (
            <>
                {
                    branches.map(
                        (branch, i) => this.prepTreeItem(branch, [], i)
                    )
                }
            </>
        );
    }

    render() {
        return (
            <List style={{height: 400, paddingTop: 0, overflowY: "auto"}}>
                {this.treeItems}
            </List>
        );
    }
}