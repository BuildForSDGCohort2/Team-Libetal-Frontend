import React, {Component} from "react";
import PropTypes from "prop-types";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Settings from "../../utils/Settings";
import MaterialRow from "../../widgets/grid/MaterialRow";
import RepoDrawer from "./widgets/RepoDrawer";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import Separator from "../../widgets/separator";
import MaterialTextView from "../../widgets/MaterialTextView";
import Flex from "../../widgets/Flex";
import AccessibilityControl from "../../widgets/AccessibilityControl";
import GridItem from "../../widgets/grid/GridItem";
import Paper from "@material-ui/core/Paper";
import Footer from "../Footer";
import RepoDashboard from "./RepoDashboard";
import RepoCommits from "./RepoCommits";
import RepoInsights from "./RepoInsights";
import RepoIssues from "./RepoIssues";
import RepoPullRequests from "./RepoPullRequests";
import RepoTasks from "./RepoTasks";
import RepoFiles from "./RepoFiles";
import RepoAbout from "./RepoAbout";

export default class Repo extends Component {


    state = {
        drawerIsOpen: true,
        userDetails: {},
        isAdmin: false,
        currentPage: Repo.ABOUT,
        project: {}

    };

    static DASHBOARD = 1;
    static INSIGHTS = 2;
    static ISSUES = 3;
    static TASKS = 4;
    static PULL_REQUESTS = 5;
    static COMMITS = 6;
    static FILES = 7;
    static ABOUT = 8;

    static propTypes = {
        navigator: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.initDisplayContent();

    }

    initDisplayContent() {
        this.checkIsAdmin();
        this.loadProject(this.onProjectLoad.bind(this));
    }

    getFromLocation(index) {
        if (this.pathsField === undefined) {
            let {
                pathname
            } = this.props.location.location;
            this.pathsField = pathname.trim("/").split("/");
        }

        return this.pathsField[index];
    }

    loadProject(callBack) {
        new Promise(
            resolve => {
                resolve(this.getFromLocation(3));
            }
        ).then(
            projectName => callBack({
                name: projectName,
                documentation: `${projectName}.md`
            })
        ).catch(
            e => console.log(e.message)
        );
    }

    onProjectLoad(project) {
        this.setState({project});
    }

    checkIsAdmin() {
        this.isAdmin().then(
            isAdmin => this.setState({isAdmin})
        ).catch(
            e => {
                console.log(`Unhandled exception ${e.message}`);
            }
        );
    }

    async isAdmin() {

    }

    get currentPage() {

        switch (this.state.currentPage) {
            case Repo.COMMITS:
                return <RepoCommits navigator={this.props.navigator} project={this.state.project}/>;
            case Repo.DASHBOARD:
                return <RepoDashboard component={this} project={this.state.project}/>;
            case Repo.INSIGHTS:
                return <RepoInsights navigator={this.props.navigator} project={this.state.project}/>;
            case Repo.ISSUES:
                return <RepoIssues navigator={this.props.navigator} project={this.state.project}/>;
            case Repo.PULL_REQUESTS:
                return <RepoPullRequests navigator={this.props.navigator} project={this.state.project}/>;
            case Repo.TASKS:
                return <RepoTasks navigator={this.props.navigator} project={this.state.project}/>;
            case Repo.FILES:
                return <RepoFiles navigator={this.props.navigator} project={this.state.project}/>;
            case Repo.ABOUT:
                return <RepoAbout navigator={this.props.navigator} project={this.state.project}/>;
            default:
                return <RepoAbout navigator={this.props.navigator} project={this.state.project}/>;
        }
    }

    set currentPage(value) {
        console.log(value);
        if (typeof value === "string") {
            switch (value.toLowerCase()) {
                case "issues":
                    value = Repo.ISSUES;
                    break;
                case "about":
                    value = Repo.ABOUT;
                    break;
                case "insights":
                    value = Repo.INSIGHTS;
                    break;
                case "commits":
                    value = Repo.COMMITS;
                    break;
                case "dashboard":
                    value = Repo.DASHBOARD;
                    break;
                case "files":
                    value = Repo.FILES;
                    break;
                case "pull_requests":
                    value = Repo.PULL_REQUESTS;
                    break;
                default:
                    let parsed = parseInt(value);
                    value = parsed > 0 && parsed <= 8 ? parsed : Repo.ABOUT;
                    break;
            }
        }

        this.setState({currentPage: value}, () => this.forceUpdate());
    }

    get projectName() {
        let {name = "Project Name Loading..."} = this.state.project;
        name = name[0].toUpperCase() + name.slice(1, name.length);
        return name;
    }

    componentDidMount() {
        this.currentPage = this.getFromLocation(4);
    }

    render() {

        let {
            state: {
                drawerIsOpen,
                currentPage
            },
            props: {
                classes,
                navigator
            }
        } = this;


        return (
            <ThemeProvider theme={Settings.appTheme}>
                <>
                    <RepoDrawer
                        classes={classes}
                        onChange={
                            isOpen => this.setState({drawerIsOpen: isOpen})
                        }
                        onItemClick={
                            itemId => this.setState({currentPage: itemId || currentPage})
                        }
                    />
                    <Paper style={{paddingLeft: drawerIsOpen ? 240 : 48, borderRadius: 0}} elevation={0}>
                        <MaterialRow paddingTop={8} paddingLR={8} alignItems={Flex.CENTER}>
                            <MaterialTextView
                                text={this.projectName}
                                variant={"h5"}
                            />
                            <Separator/>
                            <GridItem xs={12} lg={3}>
                                <MaterialRow justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                                    <AccessibilityControl componentInstance={this}/>
                                    <UserAccountButton navigator={navigator}/>
                                </MaterialRow>
                            </GridItem>
                        </MaterialRow>
                        {this.currentPage}
                        <Footer navigator={this.props.navigator}/>
                    </Paper>
                </>
            </ThemeProvider>
        );
    }
}