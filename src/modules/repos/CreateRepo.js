import React, {Component} from "react";
import Column from "../../widgets/Column";
import TextView from "../../widgets/MaterialTextView";
import MaterialTextView from "../../widgets/MaterialTextView";
import Flex from "../../widgets/Flex";
import {AppBar, IconButton, InputBase as Input, MenuItem, Paper, Select, Toolbar} from "@material-ui/core";
import Colors from "../../Colors";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import Settings from "../../utils/Settings";
import MaterialTheme from "../../widgets/theming/MaterialTheme";
import Footer from "../Footer";
import Separator from "../../widgets/separator";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import MaterialIcon from "../../widgets/MaterialIcon";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import MaterialDivider from "../../widgets/MaterialDivider";
import Row from "../../widgets/grid/MaterialRow";
import GridItem from "../../widgets/grid/GridItem";
import PropTypes from "prop-types";
import MaterialSelect from "../../widgets/input/MaterialSelect";
import Col from "../../widgets/grid/MaterialCol";
import TabsLayout from "../../widgets/TabsLayout";
import InputBase from "@material-ui/core/InputBase";
import MaterialImageInput from "../../widgets/input/MaterialImageInput";
import MaterialTextField from "../../widgets/MaterialTextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import MaterialBtn from "../../widgets/MaterialBtn";

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
        headerSearchSelectionItems: [
            "Projects",
            "Issues"
        ],
        currentCategory: 0,
        headerSearchKey: 0,
        project: {
            img: undefined,
            name: undefined,
            // should be user id
            creator: 1,
            private: false
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

    get accessibilityAction() {


        let old = <MaterialOptionsMenu
            id={"accessibility-options"}
            controller={IconButton}
            controllerBody={
                <MaterialIcon
                    icon={"InvertColors"}
                />
            }
        />;

        return (
            <MaterialIconButton
                icon={"InvertColors"}
                onClick={
                    e => {
                        let curr = Settings.theme;
                        let style = Settings.style;

                        if (curr === "Light") {
                            Settings.theme = "Dark";
                        } else Settings.theme = "Light";

                        if (style === "light") {
                            Settings.style = "dark";
                        } else Settings.style = "light";

                        console.log(Settings.theme);

                        this.forceUpdate();
                    }
                }
            />
        );
    }

    get appBar() {
        return (
            <AppBar position={"relative"} variant={"outlined"}>
                <Toolbar>
                    <MaterialIconButton
                        icon={"Home"}
                    />
                    <TextView
                        text={"Libetal"}
                        variant={"h6"}
                        textColor={Colors.orange}

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
                        {this.accessibilityAction}
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
            <>
                <Column xs={12}>
                    {this.appBar}
                    <MaterialDivider spacing={8} color={Colors.transparent}/>
                    <Row justify={Flex.CENTER}>
                        <GridItem xs={12} lg={7}>
                            <Paper style={{padding: 12}}>
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
                                    <GridItem xs={12} sm={5} lg={4}>
                                        <MaterialImageInput
                                            previewHeight={180}
                                            previewWidth={240}
                                            onChange={this.onChange}
                                            placeholder={"Project Logo"}
                                        />
                                    </GridItem>
                                    <GridItem xs={6}>
                                        <Col spacing={2} justify={Flex.SPACE_EVENLY} alignItems={Flex.STRETCH}>
                                            <GridItem>
                                                <MaterialTextField
                                                    fullWidth
                                                    placeholder={"Project Name"}
                                                    startIcon={<MaterialIcon icon={"AccountTree"}/>}
                                                />
                                            </GridItem>
                                            <GridItem>
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
                                                />
                                            </GridItem>
                                            <GridItem>
                                                {this.projectCategorySelect}
                                            </GridItem>
                                            <GridItem>
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
                                                    <MaterialTextView text={"Make Repo private"} fontSize={12}/>
                                                </Row>
                                            </GridItem>
                                            <GridItem>
                                                <Row justify={Flex.SPACE_BETWEEN}>
                                                    <GridItem xs={12} sm={6} lg={5}>
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
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} lg={5}>
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
                                                    </GridItem>
                                                </Row>
                                            </GridItem>
                                        </Col>
                                    </GridItem>
                                </Row>
                                <MaterialDivider spacing={8} />
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
                                        <Row justify={Flex.STRETCH}>
                                            <MaterialBtn
                                                fullWidth
                                                content={"Create"}
                                            />
                                        </Row>
                                    </GridItem>
                                </Row>
                            </Paper>
                        </GridItem>
                    </Row>
                </Column>
                <MaterialDivider
                    spacing={12}
                    color={Colors.transparent}
                    width={"80%"}
                    orientation={MaterialDivider.HORIZONTAL}
                />
                <Footer navigator={this.props.navigator}/>
            </>
        );
    }
}