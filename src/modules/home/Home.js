import * as React from "react";
import View from "../repos/contributions/View";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppsIcon from "@material-ui/icons/Apps";
import BuildIcon from "@material-ui/icons/Build";
import PaletteIcon from "@material-ui/icons/Palette";
// import TimeLineIcon from "@material-ui/icons/TimeLine";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import BugReportIcon from "@material-ui/icons/BugReport";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import MaterialBtn from "../../widgets/MaterialBtn";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {createMuiTheme} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import Row from "../../widgets/Row";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        },
        secondary: {
            main: green[500]
        }
    }
});

/*Axios preferred for data loading*/
export default class Home extends View {

    props = {
        navigator(link) {
            console.log(`Requesting for page ${link}`);
        }
    };
    state = {
        currentTab: 0,
        currentTabView: (<Typography>Not A Valid Tab</Typography>),
        features: [
            {
                name: "Create Login",
                by: "Breimer",
                estimation: {
                    currency: {
                        sign: "ksh",
                        name: "Kenyan shilling"
                    }
                }
            },
            {
                name: "Create DashBoard",
                by: "Steve",
                estimation: {
                    currency: {
                        sign: "ksh",
                        name: "Kenyan shilling"
                    }
                }
            },
            {
                name: "Migrate DB",
                by: "Mike",
                estimation: {
                    currency: {
                        sign: "ksh",
                        name: "Kenyan shilling"
                    }
                }
            },
            {
                name: "Design UI",
                by: "Yoden",
                estimation: {
                    currency: {
                        sign: "ksh",
                        name: "Kenyan shilling"
                    }
                }
            },
            {
                name: "Integrate Mern",
                by: "Weldon",
                estimation: {
                    currency: {
                        sign: "ksh",
                        name: "Kenyan shilling"
                    }
                }
            }
        ]
    };

    constructor(props) {
        super(props);

        this.bindEventListeners();
    }


    bindEventListeners() {
        this.accessAccount = this.accessAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openDashboard = this.openDashboard.bind(this);
    }

    componentDidMount() {
        this.updateTabView(21);
    }

     getLayout({userDetails, appTheme, classes}) {


        let flex = {
            display: "flex"
        };

        let marginAuto = {
            margin: "auto"
        };

        return (
            <Row ref={this.ref}>
                <CssBaseline/>
                <AppBar position="static" color="default" elevation={0} className={appTheme.homeAppBar}>
                    <Grid container className={appTheme.homeHeader}>
                        <Grid container>
                            <Grid item xs={3} style={flex}>
                                <img
                                    style={marginAuto}
                                    src={"/images/LogoWhiteSkew.png"}
                                    width={"inherit"}
                                    height={"220px"}
                                />
                            </Grid>
                            <Grid item xs={4} style={flex}>
                                <img
                                    style={marginAuto}
                                    src={"/images/BrandingLongBetaWhite.png"}
                                    width={"80%"}
                                    height={"220px"}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Grid>
                                    <Toolbar className={appTheme.homeToolbar}>
                                        {
                                            userDetails === null ? this.getLoginView(appTheme, classes) : this.accountAppBar(appTheme)
                                        }
                                    </Toolbar>
                                </Grid>
                                {this.listItems()}
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                {/* Hero unit */}
                <Grid container>
                    <Grid item xs={7}>

                    </Grid>
                    <Grid item xs={5}>
                        <Tabs
                            theme={theme}
                            value={this.state.currentTab}
                            onChange={this.handleChange}
                        >
                            <Tab theme={theme} icon={<PaletteIcon/>} label="Features"/>
                            <Tab theme={theme} icon={<BuildIcon className="iconAccent"/>} label="Issues"/>
                            <Tab theme={theme} icon={<BugReportIcon className="txtPrimary"/>} label="Bugs"/>
                        </Tabs>
                        {this.state.currentTabView}
                    </Grid>
                </Grid>
            </Row>
        );
    }

    handleChange(event, newValue) {
        this.updateTabView(newValue);
    }


    static FEATURES = 0;
    static ISSUES = 1;
    static BUGS = 2;
    static DEFAULT_TAB = 0;

    updateTabView(newTab = 0) {

        let view;

        switch (newTab) {
            case Home.FEATURES:
                view = this.featuresList();
                break;
            case Home.BUGS:
                view = (
                    <>Bugs</>
                );
                break;
            case Home.ISSUES:
                view = (
                    <>Issues</>
                );
                break;
            default:
                return this.updateTabView(Home.DEFAULT_TAB);
                break;
        }

        this.setState({
            currentTab: newTab,
            currentTabView: view
        });
    }

    featuresList() {
        return (
            <List>
                <ListItem>
                    <Grid container>
                        <Grid item>
                            #
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        );
    }

    accessAccount() {
        this.props.navigator("register");
    }

    openDashboard() {
        this.props.navigator("dashboard");
    }

    getLoginView(appTheme, classes) {
        return (
            <>
                <div className={classes.grow}/>
                <nav className={appTheme.alignChildRight}>
                    <MaterialBtn
                        onClick={() => this.accessAccount()}
                        startIcon={<AccountCircleIcon/>}
                        content={"Login/Register"}
                    />
                    <MaterialBtn content={"About Us"}/>
                    <MaterialBtn
                        onClick={this.openDashboard}
                        content={"Dashboard"}/>
                    <MaterialBtn
                        onClick={this.openAppStore}
                        startIcon={<AppsIcon/>}
                        content={"App Store"}
                    />
                </nav>
            </>
        );
    }

    openAppStore() {

    }

    accountAppBar(userDetails, appTheme) {
        return (
            <nav>
                <Link variant="button" color="textPrimary" href="#">
                    <IconButton onClick={this.accessAccount}>
                        <AccountCircleIcon/>
                    </IconButton>
                </Link>
                <Link onClick={this.accessAccount} variant="button" color="textPrimary" href="#">
                    Login/Register
                </Link>
                <Link variant="button" color="textPrimary" href="#">
                    Support
                </Link>
            </nav>
        );
    }

    /**
     * Links to about feature
     * */
    listItems() {
        return (
            <Grid>
                <Typography variant={"h6"}>
                    # Features
                </Typography>
                <List>
                    <ListItem>
                        <IconButton><AccountTreeIcon/></IconButton> Projects Sharing
                    </ListItem>
                    <ListItem>
                        <IconButton><CreditCardIcon/></IconButton> Financial Reports
                    </ListItem>
                    <ListItem>
                        {/*https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F3698073%2Fbulb_idea_knowledge_opinion_skill_icon&psig=AOvVaw1bOk9QhETDCULHG0T1po6c&ust=1598759547738000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIj8lsnBv-sCFQAAAAAdAAAAABAD*/}
                        {/*https://www.vectorstock.com/royalty-free-vector/skill-icon-vector-21150077*/}
                        <IconButton>
                            <SvgIcon height={20} width={20} fontSize="small">
                                <path
                                    d="m10.96181,10.94788l-0.1005,-1.14759l1.01584,0l1.01585,0l0,1.14759l0,1.14759l-1.01585,0l-1.01584,0l0.05025,-1.14759zm2.65867,0l0,-1.60663l-1.69308,0l-1.69307,0l0,1.60663l0,1.60663l1.69307,0l1.69308,0l0,-1.60663zm-3.74159,1.98909c-0.08009,-0.03392 -0.08575,-1.17535 -0.04932,-2.2378l0.06621,-1.93173l1.4109,-0.06836l1.4109,-0.06836l0,-1.77644l0,-1.77644l1.14912,-1.13896c0.63201,-0.62644 1.24168,-1.37851 1.35482,-1.67129c0.29135,-0.75396 1.22082,-0.61318 1.22082,0.18491c0,0.39055 -0.14248,0.5963 -0.45149,0.65191c-0.24832,0.04467 -0.9848,0.61063 -1.63663,1.25765l-1.18516,1.17639l0,1.55709c0,1.1246 0.08148,1.55709 0.29347,1.55709c0.57025,0 0.83525,-0.56493 0.83525,-1.78065c0,-1.13558 0.07355,-1.3071 0.95941,-2.23858c0.87607,-0.92115 1.06725,-1.01468 2.201,-1.07685c1.14018,-0.06254 1.24749,-0.02585 1.31386,0.44936c0.08803,0.63035 -0.51842,0.93039 -1.11496,0.55161c-0.68708,-0.43627 -1.19866,-0.30812 -1.96057,0.49112c-0.63535,0.66648 -0.72151,0.90891 -0.72151,2.03009c0,0.97669 -0.10392,1.36885 -0.44616,1.68376c-0.55147,0.50742 -0.39831,0.80821 0.41154,0.80821c0.43956,0 0.93105,-0.32526 1.7163,-1.13582c0.76549,-0.79017 1.31249,-1.15687 1.79746,-1.20498c0.53114,-0.05266 0.7147,-0.19527 0.77097,-0.59886c0.06945,-0.49837 0.00938,-0.52553 -1.01585,-0.45904c-0.87376,0.05665 -1.13348,0.17214 -1.31067,0.5827c-0.23737,0.55 -0.70837,0.83178 -1.04099,0.62277c-0.35375,-0.22229 -0.22393,-1.02774 0.18968,-1.17688c0.21728,-0.07833 0.56141,-0.28718 0.76473,-0.46406c0.24952,-0.21708 0.79888,-0.29899 1.69014,-0.25201c1.32012,0.06957 1.32049,0.06983 1.44924,0.88072c0.07082,0.44611 0.19588,0.92149 0.27789,1.0564c0.08199,0.13491 0.00597,0.44125 -0.16853,0.68076c-0.26959,0.36962 -0.38752,0.39209 -0.7798,0.14857c-0.78765,-0.48894 -1.23639,-0.32715 -2.38712,0.8607c-0.91907,0.9487 -1.25043,1.14759 -1.91196,1.14759l-0.80021,0l0.07884,1.00837c0.13719,1.75382 -0.12616,1.97537 -2.34809,1.97537c-1.39024,0 -1.94975,-0.08423 -2.03348,-0.30609l-0.00003,0.00005zm0.36735,9.49917c-0.2804,-0.18036 -0.28492,-0.42381 -0.03191,-1.71781c0.16211,-0.82921 0.23164,-1.76329 0.15452,-2.07571c-0.13173,-0.53361 -0.22558,-0.56589 -1.54826,-0.53255c-2.42066,0.06098 -2.74469,-0.25218 -3.0127,-2.91194l-0.15075,-1.49603l-0.73129,0c-1.14028,0 -1.35845,-0.46402 -0.77415,-1.64652c0.26984,-0.54612 0.72278,-1.30812 1.00652,-1.69334c0.41713,-0.5663 0.49391,-0.89871 0.40105,-1.73637c-0.1748,-1.57676 0.30293,-3.48971 1.13422,-4.5417c0.80634,-1.02042 2.73802,-2.18289 4.17146,-2.51035l0.9496,-0.21693l0,1.00844c0,0.55464 0.08387,1.00843 0.1864,1.00843c0.25488,0 1.06922,-0.94189 1.24021,-1.43449c0.0767,-0.22091 0.34579,-0.40165 0.598,-0.40165c0.33865,0 0.45857,0.15005 0.45857,0.5738c0,0.31559 -0.10385,0.5738 -0.23078,0.5738c-0.12694,0 -0.68565,0.42628 -1.24159,0.9473l-1.01081,0.9473l0,1.69215l0,1.69216l-0.99972,0c-1.66612,0 -2.04041,0.70628 -1.89764,3.58081c0.11315,2.27813 0.25656,2.38667 3.15345,2.38667c2.01905,0 2.23061,-0.04225 2.5529,-0.51011c0.19328,-0.28056 0.35142,-0.9519 0.35142,-1.49187c0,-0.9579 0.01809,-0.98176 0.74582,-0.98176c0.55221,0 0.93944,-0.20312 1.4917,-0.78242c1.15396,-1.21049 2.99989,-1.35042 2.56356,-0.19431c-0.08762,0.23216 -0.33293,0.2873 -0.84427,0.18976c-0.55022,-0.10495 -0.8181,-0.02811 -1.13218,0.32475c-0.40731,0.4576 -0.39979,0.46222 0.75229,0.46222c0.64004,0 1.1637,0.05838 1.1637,0.1298c0,0.07139 -0.35369,0.90811 -0.78597,1.85938c-1.22441,2.69437 -1.41558,4.00991 -0.9099,6.26102c0.2979,1.32619 0.34858,1.93312 0.17604,2.10853c-0.24036,0.24438 -5.97564,1.33032 -7.05842,1.33646c-0.31039,0.00174 -0.71137,-0.09136 -0.89105,-0.20693l-0.00003,0z"
                                    fill={"#000000"}
                                />
                            </SvgIcon>
                        </IconButton> Skill Investment
                    </ListItem>
                </List>
            </Grid>);
    }
}





