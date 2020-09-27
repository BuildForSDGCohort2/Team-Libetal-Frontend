import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import InputBase from "@material-ui/core/InputBase";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
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

export default class CreateIssuesHelpSideBar extends Component {


    state = {
        showCreateHelp: true
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
            showCreateHelp
        } = this.state;
        return (
            <Paper>
                <Toolbar style={{backgroundColor: purple, color: white}}>
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
                </Toolbar>
                <List component={"div"} style={{paddingTop: 0}}>
                    <ListItem button onClick={e => e} style={this.createListHelpStyle}>
                        <ListItemIcon>
                            <MaterialIcon
                                icon={"Help"}
                                color={showCreateHelp ? white : orange}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Creating an Issue"/>

                    </ListItem>
                    <Collapse in={showCreateHelp} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <Col>
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
                                                And is negotiable by default, during issue claim, creation or commit & merge.
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
                                    </ol>

                                </Col>


                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Paper>
        );
    }
}