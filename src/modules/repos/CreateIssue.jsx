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
import HomeImageButton from "../home/HomeImageButton";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import CreateIssuesHelpSideBar from "./CreateIssuesHelpSideBar";
import Footer from "../Footer";
import ProjectSelectDropdown from "./widgets/ProjectSelectDropdown";
import IssueTypeSelect from "./widgets/IssueTypeSelect";
import MaterialFileInputBase from "../../widgets/input/file/MaterialFileInputBase";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import AccessibilityControl from "../../widgets/AccessibilityControl";

export default class CreateIssue extends Component {


    state = {
        formReady:false,
        issue: {
            project: {
                id: 0,
                name: "Libetal"
            },
            assignee: undefined
        },
        ndaSelectionKey: 0,
        ndaLicences: [
            {
                title: "Custom"
            }
        ],
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


    constructor(props) {
        super(props);
        this.fetchLNdaLicenses();
    }

    fetchLNdaLicenses() {
        this.performNdaLicensesFetch()
            .then(
                licenses => {
                    this.setState(state => {
                        if (Array.isArray(licenses)) state.ndaLicences.push(...licenses);

                        return state;
                    });
                }
            ).catch(e => console.log(e.message));
    }

    async performNdaLicensesFetch() {
        return new Promise(resolve => {

            setTimeout(
                e => {
                    resolve(
                        [
                            {
                                title: "MIT"
                            },
                            {
                                title: "Libetal"
                            }
                        ]);
                }, 2000);

        });
    }

    get appBar() {
        return (
            <AppBar position={"static"}>
                <Toolbar>
                    <HomeImageButton navigator={this.props.navigator}/>
                    <Separator/>
                    <GridItem xs={12} lg={3}>
                        <Row justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER}>
                            <MaterialIconButton
                                icon={"Apps"}
                            />
                            <MaterialIconButton
                                icon={"Notifications"}
                            />
                            <AccessibilityControl componentInstance={this}/>
                            <UserAccountButton
                                userDetails={{
                                    name: "Breimer",
                                    email: "brymher@gmail.com",
                                    img: "/images/logo.png"
                                }}
                                navigator={this.props.navigator}
                            />
                        </Row>
                    </GridItem>
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

    get ndaView() {


        return (
            <Row alignItems={Flex.END} justify={Flex.SPACE_BETWEEN}>
                <GridItem xs={3}>
                    <MaterialTextView
                        text={"Licensing"}
                        textColor={Colors.orange}
                        variant={"body2"}
                    />
                    <MaterialSelect
                        fullWidth
                        value={this.state.ndaSelectionKey}
                        selectionItems={
                            this.state.ndaLicences.map(
                                ({title: value}, key) => ({
                                    value,
                                    key
                                })
                            )
                        }

                        onChange={
                            (a, input) => {
                                this.setState({ndaSelectionKey: input.props.value});
                            }
                        }
                    />
                </GridItem>
                <GridItem xs={8}>
                    <MaterialFileInputBase
                        disabled={this.state.ndaSelectionKey !== 0}
                        actionSize={3}
                        inputSize={8}
                        clearSize={1}
                        ActionButton={MaterialBtn}
                        ActionButtonButtonProps={
                            {
                                content: "File",
                                style: {
                                    marginBottom: 2,
                                    marginLeft: 0
                                }
                            }
                        }
                    />
                </GridItem>
            </Row>
        );
    }

    uploadIssue() {

    }

    get uploadButton() {

        let {
            formReady
        } = this.state;

        let {
            white,
            grey,
            green,
            grey_lighten_3
        } = Colors;

        return (
            <MaterialBtn
                disabled={!formReady}
                content={"Create"}
                color={formReady ? green: grey_lighten_3}
                textColor={formReady ? white : grey}
                onClick={
                    e => {
                        this.uploadIssue();
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
                <Paper elevation={0} style={{borderRadius: 0}}>
                    {this.appBar}
                    <Col paddingLR={12}>
                        <MaterialDivider spacing={5} color={transparent}/>
                        <Row paddingLR={8} alignContent={Flex.CENTER} justify={Flex.SPACE_AROUND}>
                            <GridItem xs={12} sm={10} lg={6}>
                                <Paper elevation={8}>
                                    <Row justify={Flex.CENTER} paddingTB={10}>
                                        <GridItem xs={12} sm={10}>
                                            <Col>
                                                <Row>
                                                    <MaterialTextView
                                                        variant={"h4"}
                                                        textColor={purple}
                                                        text={"Create New <#Issue>"}
                                                    />
                                                    <Separator/>
                                                    {this.uploadButton}
                                                </Row>
                                                <MaterialDivider spacing={6} color={transparent}/>
                                                <MaterialTextView
                                                    text={"Title *"}
                                                    // variant=b1
                                                    variant={"body1"}
                                                    textColor={orange}
                                                />
                                                <MaterialTextField
                                                    fullWidth
                                                    placeholder={"e.g: User Login And Registration Integration"}

                                                />
                                                <MaterialDivider spacing={4} color={transparent}/>
                                                <MaterialTextView
                                                    text={"Description"}
                                                    variant={"body1"}
                                                    textColor={orange}
                                                />
                                                <MaterialTextField
                                                    multiline
                                                    fullWidth
                                                    maxRows={3}
                                                    defaultRows={3}
                                                    placeholder={"e.g: Integrate user login with current running design"}

                                                />
                                                <MaterialDivider
                                                    color={transparent}
                                                    spacing={4}
                                                />
                                                <Row justify={Flex.SPACE_BETWEEN} alignItems={Flex.END}>
                                                    <GridItem xs={7}>
                                                        <MaterialFileInputBase
                                                            inputSize={7}
                                                            actionSize={4}
                                                            clearSize={1}
                                                            helperText={
                                                                <MaterialTextView fontSize={10}>
                                                                    Images, Documentation, Video.
                                                                </MaterialTextView>
                                                            }
                                                            ActionButton={MaterialBtn}
                                                            ActionButtonButtonProps={{
                                                                content: "Attachments",
                                                                style: {
                                                                    marginBottom: 4
                                                                }
                                                            }}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={4} paddingBottom={14}>
                                                        {this.assigneesSelectView}
                                                    </GridItem>
                                                </Row>
                                                <MaterialDivider spacing={6} color={Colors.transparent}/>
                                                <Row justify={Flex.SPACE_EVENLY}>
                                                    <GridItem xs={12} sm={5}>
                                                        {this.projectSelect}
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
                                                            label={"Type Description"}
                                                            placeholder={"e.g Load time is low"}
                                                            disabled={currentIssueTitle.toLowerCase() !== "custom"}
                                                        />
                                                    </GridItem>
                                                </Row>
                                                {this.ndaView}
                                                <Row justify={Flex.SPACE_BETWEEN} paddingTB={8}>
                                                    <MaterialBtn
                                                        content={"Cache"}
                                                        onClick={
                                                            e => this.submit()
                                                        }
                                                    />
                                                    {this.uploadButton}
                                                </Row>
                                            </Col>
                                        </GridItem>
                                    </Row>
                                </Paper>
                                {/*<MaterialDivider spacing={4} color={Colors.transparent}/>*/}
                            </GridItem>
                            <GridItem xs={12} sm={8} lg={5} paddingLeft={8}>
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
                </Paper>
            </ThemeProvider>
        );
    }
}