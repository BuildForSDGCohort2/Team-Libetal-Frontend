import React, {Component} from "react";
import Row from "../../widgets/Row";
import PropTypes from "prop-types";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Settings from "../../utils/Settings";
import Drawer from "@material-ui/core/Drawer";
import MaterialRow from "../../widgets/grid/MaterialRow";
import MDrawer from "../../widgets/MDrawer";
import RepoDrawer from "./widgets/RepoDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import Separator from "../../widgets/separator";
import Colors from "../../Colors";
import GridItem from "../../widgets/grid/GridItem";
import AppBar from "@material-ui/core/AppBar";
import MaterialCol from "../../widgets/grid/MaterialCol";
import MaterialTextView from "../../widgets/MaterialTextView";
import MaterialDivider from "../../widgets/MaterialDivider";
import Flex from "../../widgets/Flex";

export default class Repo extends Component {


    state = {
        drawerIsOpen: true,
        userDetails: {},
        isAdmin: false
    };

    static propTypes = {
        navigator: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.initDisplayContent();
    }

    initDisplayContent() {
        this.checkIsAdmin();
        this.loadProject(this.onProjectLoad);
    }

    loadProject(callBack) {

    }

    onProjectLoad(project) {
        let {name} = project;

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

    render() {

        let {
            state: {
                drawerIsOpen
            },
            props: {
                classes
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
                    />
                    <MaterialCol paddingLeft={drawerIsOpen ? 240 : 58} alignItems={Flex.CENTER}>
                        <MaterialRow paddingTop={8} paddingLR={8} marginBottom={6}>
                            <MaterialTextView
                                text={"Project Name"}
                                variant={"h5"}
                            />
                            <Separator/>
                            <UserAccountButton navigator={this.props.navigator}/>
                            <MaterialRow justify={Flex.CENTER} alignItems={Flex.CENTER}>
                                Documentation
                                <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={8} height={24}/>
                                Security
                                <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={8} height={24}/>
                                Licensing
                                <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={8} height={24}/>
                            </MaterialRow>
                        </MaterialRow>
                        <MaterialDivider
                            width={"80%"}
                        />

                        This view should depict total project description
                        from issues relating to the project.
                        total invested time and cost(used to evaluate wasted time)
                        total merged time and cost
                        tasks relating to the project
                            - open tasks
                            - closed tasks
                            - in progress tasks
                        issues
                            - posted
                            - in discussion issue
                            - etc about the issue
                        Branching details are to be visible here
                        Insights about the project
                            - sales made
                            - project estimates and returns
                        Project admin is to use this view to control the whole project also
                        thus need to be able to see issues and assign them
                        create new issues relating to the project form here also,
                        delete issues depending of abc

                    </MaterialCol>
                </>
            </ThemeProvider>
        );
    }
}