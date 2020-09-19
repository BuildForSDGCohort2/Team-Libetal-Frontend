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
import Divider from "@material-ui/core/Divider";
import MaterialTextField from "../../widgets/MaterialTextField";
import MaterialDivider from "../../widgets/MaterialDivider";
import Paper from "@material-ui/core/Paper";
import MaterialSelect from "../../widgets/MaterialSelect";
import MenuItem from "@material-ui/core/MenuItem";
import Insights from "../insights/Insights";
import StyledTabs from "../../widgets/StyledTabs";
import StyledTab from "../../widgets/StyledTab";
import PropTypes from "prop-types";


const btnSuccess = createMuiTheme({
    palette: {
        secondary: {
            main: Settings.colorSuccess,
            dark: Settings.colorSuccessDark,
            contrastText: Settings.textSuccess
        }
    }
});
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

    state = {
        userDetails: {
            name: "Breimer",
            email: "brymher@gmail.com"
        },
        currentTab: 6,
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

    get userAvatar() {
        return (
            <AccountCircleIcon/>
        );
    }

    get dashBoardSearchValue() {
        return this.state.dashBoardSearchValues[this.state.dashBoardSearchKey].name;
    }

    get navigation() {
        return (
            <AppBar className={this.props.classes.clippingDrawerAppBar}>
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
                            }}>
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
                        <Grid container>
                            <MaterialSelect
                                style={{position: "relative", marginTop: 6, marginLeft: 6}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.dashBoardSearchKey}
                                onChange={this.handleDashboardSearchChange}
                                renderValue={selected => (this.dashBoardSearchValue)}
                                children={
                                    this.state.dashBoardSearchValues.map(({id, name}, i) => (
                                        <MenuItem value={i} key={i}>{name}</MenuItem>
                                    ))}
                            />

                            <Divider style={{height: 36, width: 1, margin: 4}} orientation="vertical"/>
                            <MaterialTextField
                                style={{marginTop: 6}}
                                placeholder={"Search"}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </Grid>
                    </Paper>
                    <IconButton color="secondary" aria-label="upload picture" component="span">
                        <AppsIcon/>
                    </IconButton>
                    <IconButton color="secondary" aria-label="upload picture" component="span">
                        <SettingsIcon/>
                    </IconButton>
                    <IconButton color="secondary" aria-label="upload picture" component="span">
                        <NotificationsIcon/>
                    </IconButton>

                    <MaterialBtn
                        color={"primary"}
                        variant={"contained"}
                        startIcon={this.userAvatar}
                        content={this.toolBarBtnContent}
                        endIcon={<MoreVertIcon/>}
                    />
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
        let {classes} = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid item lg={8}>
                    This is Long text for start filed
                    <MaterialDivider orientation={"horizontal"}/>
                </Grid>
                <Grid item lg={4}>
                    <Grid container alignItems={"flex-end"} justify={"flex-end"}>

                        <ThemeProvider
                            theme={btnSuccess}
                            children={<MaterialBtn variant={"contained"} content={"CREATE PROJECT"}/>}/>
                    </Grid>

                </Grid>

            </Grid>
        );
    }

    /**TODO resolve url to use this currentBody*/
    resolveLocation() {

    }

    get currentBody() {

        switch (this.state.currentTab) {
            case 0:
                return this.projects;
            case 1:
                return this.issues;
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
                <div ref={this.ref} className={classes.root}>
                    {this.navigation}
                    <main className={classes.content} style={{background: Settings.colorPrimary}}>
                        <div className={classes.toolbar}/>
                        {this.currentBody}
                    </main>
                </div>
            </ThemeProvider>

        );
    }
}