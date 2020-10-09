import React, {Component} from "react";
import Column from "../../widgets/Column";
import TextView from "../../widgets/MaterialTextView";
import MaterialTextView from "../../widgets/MaterialTextView";
import Flex from "../../widgets/Flex";
import {AppBar, InputBase as Input, MenuItem, Paper, Select, Toolbar} from "@material-ui/core";
import Colors from "../../Colors";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import Settings from "../../utils/Settings";
import MaterialTheme from "../../widgets/theming/MaterialTheme";
import Footer from "../Footer";
import Separator from "../../widgets/separator";
import MaterialIcon from "../../widgets/MaterialIcon";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import MaterialDivider from "../../widgets/MaterialDivider";
import Row from "../../widgets/grid/MaterialRow";
import MaterialRow from "../../widgets/grid/MaterialRow";
import GridItem from "../../widgets/grid/GridItem";
import PropTypes from "prop-types";
import MaterialSelect from "../../widgets/input/MaterialSelect";
import Col from "../../widgets/grid/MaterialCol";
import MaterialCol from "../../widgets/grid/MaterialCol";
import TabsLayout from "../../widgets/TabsLayout";
import InputBase from "@material-ui/core/InputBase";
import MaterialImageInput from "../../widgets/input/MaterialImageInput";
import MaterialTextField from "../../widgets/MaterialTextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import MaterialBtn from "../../widgets/MaterialBtn";
import AccessibilityControl from "../../widgets/AccessibilityControl";
import {ThemeProvider} from "@material-ui/styles";
import MaterialFileInputBase from "../../widgets/input/file/MaterialFileInputBase";
import CreateRepoHelp from "./CreateRepoHelp";


export default class CreateRepo extends Component {

    state = {
        selectedTeam: 0,
        teams: [
            {
                name: "Libetal"
            },
            {
                name: "Team 0"
            },
            {
                name: "Team 1"
            }
        ],
        contributorRating: 0,
        contributorRatings: [

            {
                title: "Novice"
            }
            , {
                title: "Intermediate"
            },
            {
                title: "Committed"
            }
            ,
            {
                title: "Proficient"
            },
            {
                title: "Certified"
            }
        ],
        headerSearchSelectionItems: [
            "Projects",
            "Issues"
        ],
        currentLicense: 0,
        licenses: [
            {
                name: "Custom Licensing"
            },
            {
                name: "MIT"
            },
            {
                name: "Libetal"
            },
            {
                name: "Apache"
            }

        ],
        currentCategory: 0,
        headerSearchKey: 0,
        project: {
            img: undefined,
            name: undefined,
            // should be user id
            creator: 1,
            private: false,
            // either a file or an id
            license: undefined
        },
        currentPlatform: 0,
        projectsPlatforms: [
            {
                id: 1,
                name: "Cross"
            }, {
                id: 2,
                name: "Pc"
            }, {
                id: 3,
                name: "Web"
            }, {
                id: 4,
                name: "Mobile"
            }, {
                id: 5,
                name: "Embedded"
            }
        ],
        projectCategories: [
            {
                key: 0,
                label: "Entertainment"
            },
            {
                key: 1,
                label: "Gaming"
            }
        ],
        platformProjectsCategories: {
            Cross: ["Entertainment", "Education", "Food & Drink", "Health & Fitness", "Library", "Framework"],
            Pc: ["Entertainment", "Education", "Food & Drink", "Health & Fitness", "Library", "Framework", "Productivity"],
            Web: ["Cloud", "SAAS", "Productivity"],
            Mobile: ["Entertainment", "Education"],
            Embedded: ["Robotics", "Drivers"]
        }
    };

    static propTypes = {
        theme: PropTypes.func,
        navigator: PropTypes.func,
        location: PropTypes.object,
        classes: PropTypes.object
    };


    get accountButtonBody() {
        return (
            <>
                Body
            </>
        );
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }


    get accountButton() {

        return (
            <UserAccountButton
                userDetails={{
                    name: "Breimer",
                    email: "brymher@gmail.com",
                    img: "/images/logo.png"
                }}
                navigator={this.props.navigator}
            />
        );
    }

    get appBar() {
        return (
            <AppBar position={"relative"} variant={"outlined"}>
                <Toolbar>
                    <MaterialIconButton
                        icon={"Home"}
                        onClick={
                            e => {
                                this.props.navigator("home");
                            }
                        }
                    />
                    <TextView
                        text={"Libetal"}
                        variant={"h6"}
                        textColor={Colors.orange}
                        onClick={
                            e => {
                                this.props.navigator("home");
                            }
                        }
                        style={{marginLeft: 8}}
                    />
                    <Separator/>
                    <Paper style={MaterialTheme.AppBar.Search.FullWidth}>
                        <Row alignItems={Flex.CENTER} height={"inherit"}>
                            <Select
                                value={this.state.headerSearchKey}
                                onChange={
                                    (e, node) => {
                                        this.setState({headerSearchKey: node.props.value});
                                    }
                                }>
                                {
                                    this.state.headerSearchSelectionItems.map((item, i) => (
                                        <MenuItem key={i} value={i}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                            <MaterialDivider spacing={5} height={24} orientation={MaterialDivider.VERTICAL}/>
                            <Input
                                style={MaterialTheme.Input.FullWidth}
                                placeholder={`Search: in ${this.state.headerSearchSelectionItems[this.state.headerSearchKey].toLowerCase()}`}
                            />
                            <MaterialIconButton
                                icon={"Search"}
                            />
                        </Row>
                    </Paper>
                    <Separator/>
                    <Column xs={3} justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                        <MaterialIconButton
                            icon={"Apps"}
                        />
                        <MaterialIconButton
                            icon={"Notifications"}
                        />
                        {<AccessibilityControl componentInstance={this}/>}
                        {this.accountButton}
                    </Column>
                </Toolbar>
            </AppBar>
        );
    }

    get projectCategorySelect() {

        let {
            platformProjectsCategories,
            projectsPlatforms,
            currentPlatform
        } = this.state;

        return (
            <MaterialSelect
                fullWidth
                labelText={"Project Category"}
                labelId={"select-project-category"}
                onChange={
                    (e, s) => {
                        this.setState({currentCategory: s.props.value});
                    }
                }
                value={this.state.currentCategory}
                selectionHeader={
                    <Col
                        paddingLeft={4}
                        paddingRight={4}
                        maxWidth={400}
                        onClick={
                            e => e.stopPropagation()
                        }
                    >
                        <TabsLayout
                            onChange={
                                (e, newTab) => {
                                    this.setState({currentPlatform: newTab});
                                    this.setState({currentCategory: -1});
                                }
                            }
                            tabs={
                                this.state.projectsPlatforms.map(
                                    ({id, name}, i) => ({key: i, label: name})
                                )
                            }
                            variant={TabsLayout.VARIANT.SCROLLABLE}
                            style={{width: 320}}
                        />
                        <InputBase
                            onClick={
                                e => {
                                    e.stopPropagation();
                                }
                            }
                            placeholder={"Search"}
                            startAdornment={
                                <InputAdornment position="start" style={{cursor: MaterialTheme.Style.Cursor.Pointer}}>
                                    <MaterialIcon icon={"Search"}/>
                                </InputAdornment>
                            }
                        />
                    </Col>
                }
                selectionItems={
                    platformProjectsCategories[projectsPlatforms[currentPlatform].name].map((opt, i) => ({
                        key: i,
                        value: opt
                    }))
                }
            />
        );
    }

    onChange(files) {
        let [img] = files;

        this.setState(prevState => {
            prevState.project.img = img;

            return prevState;
        });
    }

    set projectLicense(value) {
        this.setState(state => {

            state.project.license = value;

            return state;

        });
    }

    get licensingInput() {
        return (
            <MaterialSelect
                fullWidth
                labelId={"licensing"}
                labelText={"Licensing"}
                startIcon={"Copyright"}
                value={this.state.currentLicense}
                selectionHeader={
                    <Col>
                        <Row alignItems={Flex.CENTER} paddingLR={4}>
                            <MaterialFileInputBase
                                ClearButton={MaterialIconButton}
                                ClearButtonProps={{
                                    icon: "Backspace"
                                }}
                                ActionButton={MaterialIconButton}
                                ActionButtonButtonProps={{
                                    icon: "Attachment"
                                }}
                                onChange={
                                    files => this.projectLicense
                                }
                                placeholder={"Add licensing document"}
                                accept={["docx", "pdf"]}/>
                        </Row>
                    </Col>
                }
                selectionItems={
                    this.state.licenses.map(({name: license}, i) => ({
                        value: license,
                        key: i
                    }))
                }
                onChange={
                    /*TODO Callback Function named params referencing to avoid having the first
                    * sample
                    * if the name input matches the parent function param name then
                    * it will be used here
                    * (input) => this.setState({currentLicense:input.props.value})
                    * (e,input) => this.setState({currentLicense:input.props.value})
                    * */
                    (e, input) => {
                        if (input !== undefined) {
                            this.setState({currentLicense: input.props.value});
                        }
                    }
                }
            />
        );
    }

    get createForm() {
        return (
            <Paper style={{padding: 12}} elevation={4}>
                <Row>
                    <GridItem xs={12} sm={6}>
                        <Col>
                            <MaterialTextView
                                textColor={Colors.orange}
                                variant={"h4"}>
                                Create Repository
                            </MaterialTextView>
                        </Col>
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                        <Col alignItems={Flex.END}>
                            <MaterialBtn
                                variant={"text"}
                                content={"import repo"}
                            />
                        </Col>
                    </GridItem>
                </Row>
                <Row justify={Flex.SPACE_EVENLY}>
                    <GridItem xs={12} sm={5} lg={6}>
                        <Row justify={Flex.CENTER}>
                            <GridItem xs={12} sm={9}>
                                <MaterialImageInput
                                    height={260}
                                    maxPreviewWidth={"80%"}
                                    maxPreviewHeight={200}
                                    onChange={this.onChange}
                                    placeholder={"Project Logo"}
                                />
                            </GridItem>
                        </Row>
                        <MaterialDivider
                            spacing={6}
                            color={Colors.transparent}
                        />
                        <MaterialCol>

                            <MaterialTextView
                                text={"Project Name"}
                                textColor={Colors.orange}
                            />
                            <MaterialTextField
                                fullWidth
                                placeholder={"e.g: Trulo"}
                                helperText={
                                    <MaterialRow alignItems={Flex.CENTER}
                                                 justify={Flex.SPACE_BETWEEN}>
                                        <MaterialTextView
                                            text={"Short name relating to the product 10-50 characters"}
                                            fontSize={10}
                                        />
                                        <MaterialIcon icon={"Help"} iconSize={12}/>
                                    </MaterialRow>
                                }
                                startIcon={<MaterialIcon icon={"AccountTree"}/>}
                            />

                            <MaterialDivider
                                spacing={4}
                                color={Colors.transparent}
                            />
                            <MaterialTextField
                                fullWidth
                                multiline
                                maxRows={4}
                                defaultRows={4}
                                placeholder={
                                    `e.g: Using git project manager to track contributions then evaluate the cost of contribution. Which can later be used to provide returns based on input per person.`
                                }
                                label={"Project Description"}
                                helperText={
                                    <MaterialRow alignItems={Flex.CENTER}
                                                 justify={Flex.SPACE_BETWEEN}>
                                        <MaterialTextView
                                            text={"Describe your project. Simple and precise. 100-150 Words"}
                                            fontSize={10}
                                        />
                                        <MaterialIcon icon={"Help"} iconSize={12}/>
                                    </MaterialRow>
                                }
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </MaterialCol>
                    </GridItem>
                    <GridItem xs={5}>
                        <Col justify={Flex.SPACE_EVENLY} alignItems={Flex.STRETCH}>
                            <GridItem>
                                <MaterialDivider
                                    spacing={4}
                                    color={Colors.transparent}
                                />
                                <MaterialSelect
                                    fullWidth
                                    value={this.state.selectedTeam}
                                    selectionItems={
                                        this.state.teams.map(
                                            ({name}, i) => ({
                                                key: i,
                                                value: name
                                            })
                                        )
                                    }
                                    startIcon={"People"}
                                    onChange={
                                        (e, c) => {
                                            this.setState({selectedTeam: c.props.value});
                                        }
                                    }
                                    labelId={"team-selection"}
                                    labelText={"Select Team"}
                                />
                            </GridItem>
                            <GridItem>
                                <MaterialDivider
                                    spacing={4}
                                    color={Colors.transparent}
                                />
                                {this.projectCategorySelect}
                            </GridItem>
                            <GridItem>
                                <MaterialDivider
                                    spacing={4}
                                    color={Colors.transparent}
                                />
                                <Row>
                                    <MaterialSelect
                                        fullWidth
                                        labelId={"project-languages"}
                                        labelText={"Languages"}
                                        selectionHeader={
                                            <Col paddingLeft={4} paddingRight={4}>
                                                <TabsLayout
                                                    orientation={TabsLayout.ORIENTATION.HORIZONTAL}
                                                    variant={TabsLayout.VARIANT.SCROLLABLE}
                                                    tabs={
                                                        ["All", "Front End", "Backend"].map(
                                                            (stack, i) => ({
                                                                key: i,
                                                                label: stack
                                                            })
                                                        )
                                                    }
                                                />
                                                <InputBase
                                                    onClick={
                                                        e => {
                                                            e.stopPropagation();
                                                        }
                                                    }
                                                    placeholder={"Search"}
                                                    startAdornment={
                                                        <InputAdornment position="start"
                                                                        style={{cursor: MaterialTheme.Style.Cursor.Pointer}}>
                                                            <MaterialIcon icon={"Search"}/>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </Col>
                                        }

                                        selectionItems={
                                            ["Python", "Kotlin", "Java", "Php", "Rubi"].map(
                                                (lang, i) => ({
                                                    key: i,
                                                    value: lang
                                                })
                                            )
                                        }
                                    />
                                </Row>
                                <MaterialDivider
                                    spacing={4}
                                    color={Colors.transparent}
                                />
                                <Row justify={Flex.SPACE_BETWEEN}>
                                    <MaterialSelect
                                        value={[]}
                                        fullWidth
                                        labelId={"project-technologies"}
                                        labelText={"Technologies"}
                                        selectionHeader={
                                            <Col paddingLeft={4} paddingRight={4}>
                                                <TabsLayout
                                                    orientation={TabsLayout.ORIENTATION.HORIZONTAL}
                                                    variant={TabsLayout.VARIANT.SCROLLABLE}
                                                    tabs={
                                                        ["Frameworks", "Libraries", "API"].map(
                                                            (stack, i) => ({
                                                                key: i,
                                                                label: stack
                                                            })
                                                        )
                                                    }
                                                />
                                                <InputBase
                                                    onClick={
                                                        e => {
                                                            e.stopPropagation();
                                                        }
                                                    }
                                                    placeholder={"Search: Tech"}
                                                    startAdornment={
                                                        <InputAdornment position="start"
                                                                        style={{cursor: MaterialTheme.Style.Cursor.Pointer}}>
                                                            <MaterialIcon icon={"Search"}/>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </Col>
                                        }

                                        selectionItems={
                                            ["React", "NodeJs", "Angular"].map(
                                                (tech, i) => ({
                                                    key: i,
                                                    value: tech
                                                })
                                            )
                                        }

                                        multiple={true}
                                    />
                                </Row>
                            </GridItem>
                            <MaterialDivider
                                color={Colors.transparent}
                                spacing={6}
                            />
                            <MaterialTextView
                                text={"Licensing & Contribution"}
                                textColor={Colors.blue}
                            />
                            {this.licensingInput}
                            <GridItem>
                                <MaterialDivider
                                    spacing={6}
                                    color={Colors.transparent}
                                />
                                <Row alignItems={Flex.CENTER}>
                                    <GridItem xs={6} lg={5}>
                                        <Row alignItems={Flex.CENTER}>
                                            <Checkbox checked={this.state.project.private} onClick={
                                                e => {
                                                    this.setState(
                                                        state => {

                                                            state.project.private = !state.project.private;

                                                            return state;
                                                        }
                                                    );
                                                }
                                            }/>
                                            <MaterialTextView text={"private"} fontSize={12}/>
                                        </Row>
                                    </GridItem>
                                    <GridItem xs={6} lg={6}>
                                        <MaterialSelect
                                            fullWidth
                                            labelText={"Contributor Rating"}
                                            labelId={"contributor-rating"}
                                            value={this.state.contributorRating}
                                            selectionItems={
                                                this.state.contributorRatings.map(({title}, i) => ({
                                                    key: i,
                                                    value: title
                                                }))
                                            }

                                            onChange={
                                                (e, input) => (this.setState({contributorRating: input.props.value}))
                                            }
                                        />
                                    </GridItem>
                                </Row>
                                <MaterialDivider
                                    spacing={30}
                                    color={Colors.transparent}
                                />
                                <Row justify={Flex.SPACE_AROUND}>
                                    <GridItem>
                                        <MaterialBtn
                                            fullWidth
                                            content={"Create & Add Issues"}
                                            color={Colors.orange}
                                            textColor={Colors.white}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <MaterialBtn
                                            fullWidth
                                            content={"Create"}
                                            color={Colors.green}
                                            textColor={Colors.white}
                                        />
                                    </GridItem>


                                </Row>
                            </GridItem>
                        </Col>
                    </GridItem>
                </Row>
                <MaterialDivider spacing={4}/>
                <Row justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER}>
                    <GridItem>
                        <Row alignItems={Flex.CENTER}>
                            <MaterialBtn
                                content={"Cache"}
                            />
                            <MaterialIcon
                                icon={"Help"}
                            />
                        </Row>
                    </GridItem>
                    <GridItem xs={8} lg={4}>
                        <Row justify={Flex.SPACE_BETWEEN}>


                        </Row>
                    </GridItem>
                </Row>
            </Paper>
        );
    }

    get createHelp() {
        return (
            <Row>

            </Row>
        );
    }

    render() {
        let {
            location
        } = this.props;

        /**
         * Needs user details
         * Project name
         * Project Description
         * Project requirements
         * Development Stage inception, partially developed,
         * upload some files in relation to the project
         * */

        return (
            <ThemeProvider theme={Settings.appTheme}>
                <Paper elevation={0}>
                    <MaterialCol color={"primary"}>
                        {this.appBar}
                       <MaterialDivider spacing={6} color={Colors.transparent}/>
                        <Row justify={Flex.SPACE_EVENLY}>
                            <GridItem xs={12} lg={7}>
                                {this.createForm}
                            </GridItem>
                            <GridItem xs={12} lg={4}>
                                <CreateRepoHelp navigator={this.props.navigator}/>
                            </GridItem>
                        </Row>
                    </MaterialCol>
                    <MaterialDivider
                        spacing={6}
                        color={Colors.transparent}
                        width={"60%"}
                        orientation={MaterialDivider.HORIZONTAL}
                    />
                    <Footer navigator={this.props.navigator}/>
                </Paper>
            </ThemeProvider>
        );
    }
}