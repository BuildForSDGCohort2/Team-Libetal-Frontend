import React, {Component} from "react";
import PropTypes from "prop-types";
import {Paper} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Colors from "../../Colors";
import MaterialTextView from "../../widgets/MaterialTextView";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialRow from "../../widgets/grid/MaterialRow";
import GridItem from "../../widgets/grid/GridItem";
import Separator from "../../widgets/separator";
import InputBase from "@material-ui/core/InputBase";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import Collapse from "@material-ui/core/Collapse";
import MaterialCol from "../../widgets/grid/MaterialCol";

export default class CreateRepoHelp extends Component {


    state = {
        showCreateHelp: true
    };

    helpMainListStyle = {paddingTop: 0};

    static propTypes = {
        navigator: PropTypes.func
    };

    get createProjectHeaderStyle() {
        if (this.state.showCreateHelp) {
            return {
                backgroundColor: Colors.orange,
                color: Colors.white
            };
        } else return {};
    }

    render() {
        let {
            showCreateHelp
        } = this.state;

        let emStyle = {
            color :Colors.orange
        }

        return (
            <Paper elevation={6}>
                <Toolbar style={{backgroundColor: Colors.purple}}>
                    <MaterialTextView
                        text={"Help"}
                        textColor={Colors.white}
                    />
                    <Separator/>
                    <InputBase
                        style={{color: Colors.white}}
                        placeholder={"Search in{help:Projects}"}
                    />
                    <MaterialIconButton
                        icon={"Search"}
                        iconColor={"white"}
                    />
                </Toolbar>
                <MaterialRow>
                    <GridItem xs={12}>
                        <List component={"div"} style={this.helpMainListStyle}>
                            <ListItem component={"div"} button style={this.createProjectHeaderStyle}>
                                <ListItemText
                                    primary={"Creating A Project"}
                                />
                            </ListItem>
                            <Collapse in={showCreateHelp} unmountOnExit>
                                <List component={"div"}>
                                    <ListItem component={MaterialCol}>
                                        <MaterialTextView>
                                            During project creation you need to be clear on what you are trying to
                                            build,
                                            how people can contribute and help them understand what exactly you want to
                                            make.
                                            What impact do you plan to achieve with your project.
                                        </MaterialTextView>


                                        <ol type={"i"}>
                                            <li>
                                                <em style={emStyle}>Name</em>.
                                                Something short and relatable to what you are creating
                                            </li>
                                            <li>
                                                <em style={emStyle}>Description</em>.
                                                A short description relating to what you are trying to create.
                                                Clear and relatable words go a long way.
                                            </li>
                                            <li>
                                                <em style={{color:Colors.orange}}>Team</em>.
                                                Is there a team you want to tell about the project, or
                                                are you already in a team and want to use that as the team to start production?
                                                You can assign or request a team to the project.
                                                If you created the team then the project will be automatically associated with the team.
                                                If you do not the project will be suggested to the team and members of the team.
                                                Or the whole team can take on the project that depends on the teams decisions.
                                            </li>
                                            <li>
                                                <em style={{color:Colors.orange}}>Category</em>.
                                                This is the use case category of your project.
                                            </li>
                                            <li>
                                                <em style={{color:Colors.orange}}>Languages</em>.
                                                Programing languages used in product creation.
                                            </li>
                                            <li>
                                                <em style={{color:Colors.orange}}>Technologies</em>.
                                                Any framework, library or api required by the product for basic or advance use
                                                of the product.
                                            </li>
                                            <li>
                                                <em style={{color:Colors.orange}}>Licensing</em>.
                                                This is the license agreement that is going to describe project contributions
                                                agreement. How contributors are going to benefit from contributing to the
                                                project.
                                            </li>
                                        </ol>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </GridItem>
                </MaterialRow>
            </Paper>
        );
    }
}