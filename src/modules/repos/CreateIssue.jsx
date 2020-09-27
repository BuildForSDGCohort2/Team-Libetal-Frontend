import React, {Component} from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Settings from "../../utils/Settings";
import Row from "../../widgets/grid/MaterialRow";
import Col from "../../widgets/grid/MaterialCol";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import MaterialTextField from "../../widgets/MaterialTextField";
import MaterialSelect from "../../widgets/input/MaterialSelect";
import MaterialDivider from "../../widgets/MaterialDivider";
import Colors from "../../Colors";
import MaterialBtn from "../../widgets/MaterialBtn";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import Flex from "../../widgets/Flex";
import GridItem from "../../widgets/grid/GridItem";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SimilarIssuesListView from "../dashboard/issues/SimilarIssuesListView";
import HomeImageButton from "../home/HomeImageButton";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import CreateIssuesHelpSideBar from "./CreateIssuesHelpSideBar";
import Footer from "../Footer";
import ProjectSelectDropdown from "./widgets/ProjectSelectDropdown";
import IssueTypeSelect from "./widgets/IssueTypeSelect";
import MaterialFileInput from "../../widgets/MaterialFileInput";
import MaterialFileInputBase from "../../widgets/input/file/MaterialFileInputBase";

export default class CreateIssue extends Component {


    state = {
        issue: {
            project: {
                id: 0,
                name: "Libetal"
            },
            assignee: undefined
        },
        projectKey: 0,
        currentIssueTitle: "Custom",
        customIssue: {
            title: undefined,
            description: undefined
        },
        projects: [
            {
                id: 1,
                name: "Libetal"
            },
            {
                id: 2,
                name: "Luro"
            },
            {
                id: 3,
                name: "Dukto"
            }
        ],
        issueAssigneeKey: 0,
        assignees: [
            {
                name: "None"
            }, {
                name: "Self"
            },
            {
                name: "Breimer"
            },
            {
                name: "Mike"
            },
            {
                name: "Andrew"
            }
        ],
        issueTypeKey: 0,
        issuesTypes: [
            {
                title: "Bug"
            },
            {
                title: "Feature"
            },
            {
                title: "Documentation"
            },
            {
                title: "Repeat"
            }
        ]

    };
    static propTypes = {
        navigator: PropTypes.func.isRequired
    };


    random(max) {
        return Math.floor(Math.random() * max);
    }

    randomFromArray(array) {
        return array[this.random(array.length)];
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

    get appBar() {
        return (
            <AppBar position={"static"}>
                <Toolbar>
                    <Row>
                        <HomeImageButton navigator={this.props.navigator}/>
                    </Row>
                </Toolbar>
            </AppBar>
        );
    }

    submit() {
        console.log(`Submiting the request`);
    }

    /**@Description
     * create new issues
     * issue details
     * project associated to
     * Issue cost estimation
     * Issue milestones code, design, others,
     * Issue languages used
     * Issue privacy
     * Allow for NDA true or false
     * Issue attachments
     * Issue type
     * */

    get projectSelect() {


        return (
            <ProjectSelectDropdown
                fullWidth
                projectKey={this.state.projectKey}
                projects={this.state.projects}
                onChange={
                    newProjectKey => {

                        this.setState({projectKey: newProjectKey}, () =>
                            this.setState(state => {
                                state.issue.project.id = state.projects[newProjectKey].id;

                                return state;
                            })
                        );

                    }
                }
            />

        );
    }

    get similarIssuesView() {

        let {
            white
        } = Colors;

        return (
            <Paper>
                <Toolbar style={{backgroundColor: Colors.orange, color: Colors.white}}>
                    <MaterialTextView textColor={Colors.white}>
                        Similar Issues
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
                </Toolbar>
                <SimilarIssuesListView issues={this.similarIssues} height={400}/>
            </Paper>
        );
    }

    get assigneesSelectView() {


        return (<MaterialSelect
                fullWidth
                value={this.state.issueAssigneeKey}
                labelId={"assignee-select"}
                labelText={"Assignee"}
                selectionHeader={
                    <Row paddingLR={6}>
                        <InputBase
                            placeholder={"Search for a developer"}
                            onClick={e => e.stopPropagation()}
                        />
                        <MaterialIconButton
                            icon={"Search"}
                        />
                    </Row>
                }
                selectionItems={
                    this.state.assignees.map(({name: value}, key) => ({
                        value, key
                    }))
                }
                onChange={
                    (e, input) => {

                        if (input !== undefined) {
                            this.setState({issueAssigneeKey: input.props.value});
                        }
                    }
                }
            />
        );
    }

    render() {


        let {
            transparent,
            purple,
            orange,
            white,
            green
        } = Colors;

        let {
                currentIssueTitle
            } = this.state
        ;
        return (
            <ThemeProvider theme={Settings.appTheme}>
                {this.appBar}
                <MaterialDivider
                    orientation={MaterialDivider.HORIZONTAL}
                    color={transparent}
                    spacing={6}
                />
                <Col paddingLR={12}>
                    <MaterialDivider spacing={8} color={transparent}/>
                    <Row paddingLR={8} alignContent={Flex.CENTER} justify={Flex.SPACE_AROUND}>
                        <GridItem xs={12} sm={10} lg={6}>
                            <Paper>
                                <Row justify={Flex.CENTER} paddingTB={10}>
                                    <GridItem xs={12} sm={10}>
                                        <Col>
                                            <MaterialTextView
                                                variant={"h4"}
                                                textColor={purple}
                                                text={"Create New <#Issue>"}
                                            />
                                            <MaterialTextView
                                                text={"Title"}
                                                // variant=b1
                                                variant={"body1"}
                                                textColor={orange}
                                            />
                                            <MaterialTextField
                                                fullWidth
                                                placeholder={"e.g: User Login And Registration Integration"}

                                            />
                                            <MaterialTextView
                                                text={"Description"}
                                                // variant=b1
                                                variant={"body1"}
                                                textColor={orange}
                                            />
                                            <MaterialTextField
                                                multiline
                                                fullWidth
                                                maxRows={4}
                                                defaultRows={4}
                                                placeholder={"e.g: Integrate user login with current running design"}

                                            />
                                            <Row>
                                                <MaterialFileInputBase
                                                    ActionButton={MaterialBtn}
                                                    ActionButtonButtonProps={{
                                                        content:"Attachments"
                                                    }}
                                                />
                                            </Row>
                                            <MaterialDivider spacing={4} color={Colors.transparent}/>

                                            <Row justify={Flex.SPACE_EVENLY}>
                                                <GridItem xs={12} sm={5}>
                                                    {this.projectSelect}

                                                    <MaterialDivider spacing={4} color={Colors.transparent}/>
                                                    {this.assigneesSelectView}
                                                </GridItem>
                                                <GridItem xs={12} sm={6}>
                                                    <IssueTypeSelect
                                                        onChange={
                                                            issue => {
                                                                this.setState({currentIssueTitle: issue.title});
                                                            }
                                                        }
                                                    />
                                                    <MaterialDivider spacing={4} color={transparent}/>
                                                    <MaterialTextField
                                                        label={"Type Title"}
                                                        fullWidth
                                                        onChange={
                                                            (e) => {
                                                                this.setState(state => {
                                                                    state.customIssue.title = e.currentTarget.value;
                                                                    return state;
                                                                });
                                                            }
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        placeholder={"e.g: Performance"}
                                                        onClick={e => e.stopPropagation()}
                                                        disabled={currentIssueTitle.toLowerCase() !== "custom"}
                                                    />
                                                    <MaterialDivider spacing={4} color={transparent}/>
                                                    <MaterialTextField
                                                        fullWidth
                                                        multiline
                                                        maxRows={2}
                                                        defaultRows={2}
                                                        onChange={
                                                            (e, input) => {
                                                                this.setState(state => {
                                                                    state.customIssue.description = input.props.value;
                                                                    return state;
                                                                });
                                                            }
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        placeholder={"Type description"}
                                                        disabled={currentIssueTitle.toLowerCase() !== "custom"}
                                                    />

                                                    <Row justify={Flex.SPACE_BETWEEN} paddingTB={8}>
                                                        <MaterialBtn
                                                            content={"Cache"}
                                                            onClick={
                                                                e => this.submit()
                                                            }
                                                        />

                                                        <MaterialBtn
                                                            content={"Create"}
                                                            onClick={
                                                                e => this.submit()
                                                            }
                                                            color={green}
                                                            textColor={white}
                                                        />
                                                    </Row>
                                                </GridItem>
                                            </Row>

                                        </Col>
                                    </GridItem>
                                </Row>
                            </Paper>
                            <MaterialDivider spacing={4} color={Colors.transparent}/>
                            <Row>
                                {this.similarIssuesView}
                            </Row>
                        </GridItem>
                        <GridItem xs={12} sm={8} lg={5}>
                            <CreateIssuesHelpSideBar navigator={this.props.navigator}/>
                        </GridItem>
                    </Row>
                    <MaterialDivider spacing={6} color={Colors.transparent}/>
                </Col>
                <MaterialDivider
                    spacing={8}
                    color={transparent}
                />
                <Footer navigator={this.props.navigator}/>
            </ThemeProvider>
        );
    }
}