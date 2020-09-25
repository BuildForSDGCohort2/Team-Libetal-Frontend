import React, {Component} from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar} from "@material-ui/core";
import MaterialImage from "../../widgets/MaterialImage";
import Separator from "../../widgets/separator";
import MaterialBtn from "../../widgets/MaterialBtn";

import {
    AccountCircle as AccountCircleIcon,
    Apps as AppsIcon,
    MoreVert as MoreVertIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    Settings as SettingsIcon
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MaterialTextView from "../../widgets/MaterialTextView";
import Settings from "../../utils/Settings";
import MaterialDivider from "../../widgets/MaterialDivider";
import Paper from "@material-ui/core/Paper";
import MaterialSelect from "../../widgets/input/MaterialSelect";
import Insights from "./insights/Insights";
import StyledTabs from "../../widgets/StyledTabs";
import StyledTab from "../../widgets/StyledTab";
import PropTypes from "prop-types";
import Projects from "./Projects";
import InputBase from "@material-ui/core/InputBase";
import Row from "../../widgets/Row";
import Flex from "../../widgets/Flex";
import Issues from "./issues/Issues";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import MaterialIcon from "../../widgets/MaterialIcon";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import MaterialCol from "../../widgets/grid/MaterialCol";
import MaterialRow from "../../widgets/grid/MaterialRow";
import GridItem from "../../widgets/grid/GridItem";
import AccessibilityControl from "../../widgets/AccessibilityControl";


const dashBoardTheme = createMuiTheme({
    palette: {
        primary: {
            main: Settings.colorPrimary,
            dark: Settings.colorPrimaryDark,
            contrastText: Settings.textPrimary,
            light: Settings.colorPrimary

        },
        secondary: {
            main: Settings.colorSecondary,
            dark: Settings.colorSecondaryDark,
            light: Settings.colorSecondary,
            /**TODO eddit for hover states
             light: "#FFFFFF",
             dark: "#FFFFFF",*/
            contrastText: Settings.textSecondary

        },
        success: {
            main: Settings.colorSuccess,
            dark: Settings.colorSuccessDark,
            contrastText: Settings.textSuccess
        }
    }
});


export default class Dashboard extends Component {

    static PROJECTS = 0;
    static ISSUES = 1;
    static TEAMS = 2;
    static TASKS = 3;
    static REVIEWS = 4;
    static INSIGHTS = 6;

    state = {
        userDetails: {
            name: "Breimer",
            email: "brymher@gmail.com"
        },
        currentTab: Dashboard.ISSUES,
        dashBoardSearchKey: 0,
        dashBoardSearchValues: [
            {
                id: 0,
                name: "Projects"
            }, {
                id: 1,
                name: "Issues"
            }, {
                id: 2,
                name: "Teams"
            }, {
                id: 3,
                name: "Tasks"
            }, {
                id: 4,
                name: "Tools"
            }, {
                id: 5,
                name: "Reviews"
            }, {
                id: 6,
                name: "Insights"
            }
        ]
    };

    static defaultProps = {
        classes: {}
    };

    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.bindEvents();
    }


    bindEvents() {
        this.handleDashboardSearchChange = this.handleDashboardSearchChange.bind(this);
    }


    handleDashboardSearchChange(e) {
        let value = e.target.value;
        this.setState(prev => ({dashBoardSearchKey: value}));
    }

    set currentTab(value) {
        this.setState({currentTab: value},

            () => {
                console.log("Changed page");
            }
        );
    }

    componentDidMount() {
        let paths = this.props.location.location.pathname.split("/");

        console.log(paths);

        switch (paths[2]) {
            case undefined:
                break;
            case "teams":
                this.currentTab = Dashboard.TEAMS;
                break;
            case "projects":
                this.currentTab = Dashboard.PROJECTS;
                break;

            case "insights":
                this.currentTab = Dashboard.INSIGHTS;
                break;
            case "issues":
                this.currentTab = Dashboard.ISSUES;
                break;

            default:
                this.currentTab = Dashboard.PROJECTS;
                break;
        }
    }

    get userAvatar() {
        return (
            <AccountCircleIcon/>
        );
    }

    get dashBoardSearchValue() {
        return this.state.dashBoardSearchValues[this.state.dashBoardSearchKey].name;
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
                        }else Settings.theme ="Light"

                        if (style === "light") {
                            Settings.style = "dark";
                        }else Settings.style ="light"

                        console.log(Settings.theme)

                        this.forceUpdate();
                    }
                }
            />
        );
    }

    get navigation() {
        return (
            <AppBar position={"static"} className={this.props.classes.clippingDrawerAppBar}>
                <Toolbar>
                    <MaterialImage
                        src={"/images/logo.png"}
                        alt={"Logo"}
                        size={40}
                    />
                    <Separator/>
                    <nav>
                        <StyledTabs
                            value={this.state.currentTab}
                            fullwidth={"true"}
                            onChange={(e, i) => {
                                this.setState(prevState => ({currentTab: i}));
                            }}
                        >
                            {
                                this.state.dashBoardSearchValues.map(({id, name}, i) => (
                                        <StyledTab key={i} label={name}/>
                                    )
                                )
                            }
                        </StyledTabs>
                    </nav>
                    <Separator/>
                    <Paper>
                        <Row alignItems={Flex.CENTER}>
                            <MaterialSelect
                                style={{position: "relative", marginTop: 6, marginLeft: 6}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.dashBoardSearchKey}
                                onChange={this.handleDashboardSearchChange}
                                renderValue={selected => (this.dashBoardSearchValue)}
                                selectionItems={
                                    this.state.dashBoardSearchValues.map(({id, name}, i) => (
                                        {
                                            key: id,
                                            value: name
                                        }
                                    ))}
                            />
                            <MaterialDivider orientation={"vertical"} height={24} spacing={4}/>
                            <InputBase
                                style={{marginTop: 6}}
                                placeholder={"Search"}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </Row>
                    </Paper>
                    <GridItem xs={12} lg={3}>
                        <MaterialRow justify={Flex.SPACE_EVENLY} alignItems={Flex.CENTER}>
                            {<AccessibilityControl componentInstance={this}/>}
                            <MaterialIconButton
                                icon={"Apps"}
                            />
                            <MaterialIconButton
                                icon={"Settings"}
                            />
                            <MaterialIconButton
                                icon={"Notifications"}
                            />
                            <MaterialBtn
                                color={"primary"}
                                variant={"contained"}
                                startIcon={this.userAvatar}
                                content={this.toolBarBtnContent}
                                endIcon={<MoreVertIcon/>}
                            />
                        </MaterialRow>
                    </GridItem>
                </Toolbar>
            </AppBar>
        );
    }

    get toolBarBtnContent() {
        let {userDetails: {name, email}} = this.state;

        return (
            <Grid container direction={"column"}>
                {/*TODO required link*/}
                <Grid>
                    <MaterialTextView
                        text={`@${name}`}
                        style={{
                            fontSize: 12,
                            textAlign: "left",
                            textTransform: "none"
                        }}
                    />
                </Grid>
                <Grid>
                    <MaterialTextView
                        text={email}
                        style={{
                            textColor: "#000000",
                            textTransform: "none",
                            fontSize: 10,
                            textAlign: "left"
                        }}
                    />
                </Grid>
            </Grid>
        );

    }


    get account() {

    }

    get teams() {

    }

    get issues() {

    }


    get projects() {
        return <Projects classes={this.props.classes} navigator={this.props.navigator}/>;
    }

    /**TODO resolve url to use this currentBody*/
    resolveLocation() {

    }

    get currentBody() {

        switch (this.state.currentTab) {
            case 0:
                return this.projects;
            case 1:
                return <Issues/>;
            case  2:
                return this.teams;

            case 6:
                return <Insights classes={this.props.classes}/>;
            default:
                return this.projects;
        }

    }


    render() {

        let {classes} = this.props;

        return (
            <ThemeProvider theme={dashBoardTheme}>
                <Row>
                    {this.navigation}
                    <main className={classes.content} style={{background: Settings.colorPrimary}}>
                        {this.currentBody}
                    </main>
                </Row>
            </ThemeProvider>

        );
    }
}