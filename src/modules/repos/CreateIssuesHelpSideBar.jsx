import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import InputBase from "@material-ui/core/InputBase";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Col from "../../widgets/grid/MaterialCol";
import Row from "../../widgets/grid/MaterialRow";
import MaterialIcon from "../../widgets/MaterialIcon";
import Link from "@material-ui/core/Link";
import Colors from "../../Colors";
import ListItemNb from "./ListItemNb";
import SimilarIssuesListView from "../dashboard/issues/SimilarIssuesListView";
import GridItem from "../../widgets/grid/GridItem";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";

export default class CreateIssuesHelpSideBar extends Component {


    state = {
        showCreateHelp: true,
        showSimilarIssues: false,
        showHelp:true
    };

    get createListHelpStyle() {
        let {alpha, transparent, white} = Colors;

        let {
            state: {
                showCreateHelp
            }
        } = this;

        return {
            backgroundColor: showCreateHelp ? alpha("orange", .8) : transparent,
            color: showCreateHelp ? white : undefined
        };
    }


    get similarIssues() {
        let issues = [];
        let i = 0;


        let titles = ["This is a sample issue title, Should be long to demonstrate the worst case scenario of the project", "Short sample title"];
        let assignees = ["issue.assignee", "Breimer"];
        let projects = ["@Libetal", "issue.project"];
        let types = ["issue.type", "Bug", "Feature", "Problem"];
        let states = ["issue.state", "open", "closed", "submitted", "discussion", "duplicate"];
        let priorities = ["issue.priority", "critical", "normal", "high", "stable"];
        let creators = ["issue.by", "@Breimer", "@Emily", "@Rael"];

        while (i < 20) {

            issues.push({
                id: i,
                title: this.randomFromArray(titles),
                assignee: {
                    id: this.randomFromArray([2, 3, 4, 4, 5, 6]),
                    name: this.randomFromArray(assignees),
                    img: "/images/logo.png"
                },
                project: {
                    name: this.randomFromArray(projects)
                },
                type: this.randomFromArray(types),
                priority: this.randomFromArray(priorities),
                state: this.randomFromArray(states),
                by: {
                    id: this.randomFromArray([2, 3, 4, 4, 5, 6]),
                    name: this.randomFromArray(creators),
                    img: "/images/logo.png"
                },
                cost: {
                    estimation: 1000
                },
                date: "20/12/2020"
            });

            i++;
        }

        return issues;
    }


    random(max) {
        return Math.floor(Math.random() * max);
    }

    randomFromArray(array) {
        return array[this.random(array.length)];
    }

    get helpToolbar() {
        let {
            white,
            purple,
            blue
        } = Colors;

        return (
            <Toolbar style={{backgroundColor: blue, color: white,minHeight:52}}>
                <ListItemIcon>
                    <MaterialIcon
                        icon={"Help"}
                        color={white}
                    />
                </ListItemIcon>
                <MaterialTextView
                    text={"Help"}
                    variant={"h5"}
                />
                <Separator/>
                <InputBase
                    style={{color: white}}
                    placeholder={"Search in {help:issues}"}
                />
                <MaterialIconButton
                    icon={"Search"}
                    iconColor={white}
                />
                <Separator/>
                <Separator/>
                <MaterialOptionsMenu
                    id={"issues-help-toolbar-options"}
                    controller={MaterialIconButton}
                    controllerProps={{
                        icon: "MoreVert",
                        iconColor: white
                    }}
                    menuItems={[
                        {
                            itemId: 1,
                            title: "View All"
                        }
                    ]}
                />
                <MaterialIconButton
                    icon={"ArrowDropDown"}
                    iconColor={Colors.white}
                    onClick={
                        e=>this.setState(state=>({showHelp:!state.showHelp}))
                    }
                />
            </Toolbar>
        );
    }

    render() {
        let {
            purple,
            white,
            grey,
            orange,
            transparent,
            alpha
        } = Colors;

        let {
            state: {
                showSimilarIssues,
                showCreateHelp,
                showHelp
            },
            similarIssues
        } = this;


        return (
            <Paper>
                <List component={"div"} style={{paddingTop: 0}}>
                    <ListItem component={"div"} disableGutters style={{paddingBottom: 0, paddingTop: 0}}>
                        <GridItem xs={12}>
                            <Toolbar style={{backgroundColor: Colors.orange, color: Colors.white,minHeight:52}}>
                                <MaterialTextView textColor={Colors.white}>
                                    {similarIssues.length - 1} Similar Issues
                                </MaterialTextView>
                                <Separator/>
                                <InputBase
                                    style={{color: white}}
                                    placeholder={"Search for similar issues"}
                                />
                                <MaterialIconButton
                                    icon={"Search"}
                                    iconColor={white}
                                />
                                <MaterialIconButton
                                    icon={"ArrowDropDown"}
                                    iconColor={Colors.white}
                                    onClick={
                                        e => this.setState(state => ({showSimilarIssues: !state.showSimilarIssues}))
                                    }
                                />
                            </Toolbar>
                        </GridItem>
                    </ListItem>
                    <Collapse in={showSimilarIssues} component={"div"}>
                        <GridItem xs={12} paddingLR={6}>
                            <SimilarIssuesListView issues={similarIssues} height={400}/>
                        </GridItem>
                    </Collapse>
                    <ListItem component={"div"} disableGutters style={{paddingTop:0,paddingBottom:0}}>
                        <GridItem xs={12}>
                            {this.helpToolbar}
                        </GridItem>
                    </ListItem>
                    <Collapse component={"div"} in={showHelp && !showSimilarIssues} unmountOnExit>
                        <List style={{paddingTop:0}}>
                            <ListItem component={"div"} button onClick={e => e} style={this.createListHelpStyle}>
                                <ListItemText primary="New <#Issue >"/>
                            </ListItem>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{maxHeight:300,overflowY:"auto",overflowX:"hidden"}}>
                                    <ListItem component={Col}>
                                        <MaterialTextView>
                                            The issue title is visible to anyone on the platform,
                                            and as such should be clear and define a specific point or state
                                            in a given project.
                                        </MaterialTextView>
                                        <ol type={"i"}>
                                            <li>
                                                <em>Project</em>.
                                                Associate the issue to an existing project or create a project
                                                relating to it first.
                                            </li>
                                            <li>
                                                <em>Title</em>.
                                                Relatable issue title.
                                                <ol type={"a"}>
                                                    <li>Summarizes the issue in question</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <em>Issue Type</em>.
                                                Either one of the following;
                                                <ol type={"i"}>
                                                    <li>
                                                        <Row>
                                                            <Link color={"secondary"}>Custom </Link>
                                                            <MaterialIcon icon={"Link"}/>
                                                        </Row>
                                                    </li>
                                                    <li>
                                                        <Row>
                                                            <Link color={"secondary"}>bug </Link>
                                                            <MaterialIcon icon={"Link"}/>
                                                        </Row>
                                                    </li>
                                                    <li>
                                                        <Row>
                                                            <Link color={"secondary"}>feature </Link>
                                                            <MaterialIcon icon={"Link"}/>
                                                        </Row>
                                                    </li>
                                                    <li>
                                                        <Row>
                                                            <Link color={"secondary"}>problem </Link>
                                                            <MaterialIcon icon={"Link"}/>
                                                        </Row>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <em>Price Estimate</em>. The estimated development cost of the given issue.
                                                <ListItemNb titleVariant={"body1"} bgAlpha={.4}>
                                                    This price is not the final price of the work done.
                                                    And is negotiable by default, during issue claim, creation or commit &
                                                    merge.
                                                    {/* And for the contribution to be considered legible for returns from the
                                                project.
                                                The commit has to be merged to the main branch.*/}
                                                </ListItemNb>
                                            </li>
                                            <li>
                                                <em>Assignee</em>. You can select an assignee during creation or someone
                                                will request to take on the task.
                                                <ListItemNb bgAlpha={.5}>
                                                    Setting an assignee does not mean that it is automatically
                                                    given to them, the issue is flagged as <em>waiting</em>
                                                    till the said person accepts the issue.
                                                </ListItemNb>
                                            </li>
                                            <li>
                                                <em>Attachments</em>. Your attachment should be anything that guides the
                                                developer
                                                in the creation of the feature. Ranging from, designs, flow charts, etc.
                                            </li>
                                            <li>
                                                <em>NDA</em> (Non-Disclosure Agreement).
                                                This is mainly there for your products security. Anyone contributing to the
                                                project
                                                will be required to accept the agreement. It should describe what and how
                                                the contributor can share details in regards to the product and their
                                                contribution.
                                                You can use one created by us or you can use one provided by you.
                                            </li>
                                        </ol>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </Collapse>
                </List>
            </Paper>
        );
    }
}