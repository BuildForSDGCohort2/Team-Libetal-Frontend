import React, {Component} from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemDiv from "../ListItemDiv";
import Radio from "@material-ui/core/Radio";
import Chip from "@material-ui/core/Chip";
import RepoListItemIcon from "./RepoListItemIcon";
import MaterialImage from "../../../widgets/MaterialImage";
import Separator from "../../../widgets/separator";
import Colors from "../../../Colors";
import MaterialIcon from "../../../widgets/MaterialIcon";
import Repo from "../Repo";
import Libetal from "../../../widgets/icons/Libetal";
import MaterialRow from "../../../widgets/grid/MaterialRow";

export default class RepoDrawer extends Component {

    state = {
        isOpen: true,
        isPinned: true
    };


    static defaultProps = {
        onChange(isOpen) {
            console.log(`Unhandled drawer change isOpen=${isOpen}`);
        },
        onItemClick(itemId) {
            console.log(`Unhandled item click ${itemId}`);
        }
    };

    onItemClick(itemId) {
        switch (itemId) {
            default:
                console.log(`Unhandled item click on item ${itemId}`);
        }

        return true;
    }


    set isOpen(value) {
        this.setState(
            {isOpen: value},

            () => {
                this.props.onChange(value);
            }
        );
    }

    get isOpen() {
        return this.state.isPinned || this.state.isOpen;
    }

    iconStyle = {
        marginRight: 8
    };

    render() {

        let {
            props: {
                classes,
                onChange,
                onItemClick
            },
            state: {
                isPinned
            },
            isOpen
        } = this;

        let {
            orange,
            green,
            white,
            red,
            purple,
            indigo,
            blue
        } = Colors;

        let chipS = {
            display: isOpen ? "inline-flex" : "none"
        };

        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose]: !isOpen
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isOpen,
                        [classes.drawerClose]: !isOpen
                    })
                }}

                onMouseEnter={
                    e => this.isOpen = true
                }

                onMouseLeave={
                    e => this.isOpen = isPinned
                }
            >
                <List disablePadding>
                    <ListItemDiv button onClick={e => onItemClick(Repo.DASHBOARD)}>
                        {/*TODO should be the app logo*/}
                        <Libetal height={32} width={32} iColor={Colors.red} bColor={Colors.white} lColor={Colors.blue}/>
                        <Separator/>
                        <Radio
                            checked={isPinned}
                            onClick={
                                e => {
                                    e.stopPropagation();
                                    this.setState({isPinned: !isPinned});
                                }
                            }
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.ABOUT)}>
                        <RepoListItemIcon
                            color={blue}
                            icon={"InfoOutlined"}
                        />
                        <ListItemText
                            primary={"About"}
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.FILES)}>
                        <RepoListItemIcon
                            icon={"AccountTreeOutlined"}
                            color={indigo}
                        />
                        <ListItemText
                            primary={"Files"}
                        />
                        <Chip
                            title={"10 new files"}
                            label={"10"}
                            size={"small"}
                            style={{
                                ...chipS,
                                backgroundColor: purple,
                                color: white
                            }}
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.ISSUES)}>
                        <RepoListItemIcon icon={"ReportOutlined"} color={orange}/>
                        <ListItemText
                            primary={"Issues"}
                        />
                        <Chip
                            title={"new"}
                            label={"1"}
                            size={"small"}
                            style={{
                                ...chipS,
                                backgroundColor: red,
                                color: white,
                                marginRight: 4
                            }}
                        />
                        <Chip
                            title={"complete"}
                            label={"10"}
                            size={"small"}
                            style={{
                                ...chipS,
                                backgroundColor: green,
                                color: white
                            }}
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.TASKS)}>
                        <RepoListItemIcon
                            icon={"Accessibility"}
                        />
                        <ListItemText
                            primary={"Tasks"}
                        />

                        <Chip
                            title={"new"}
                            label={"1"}
                            size={"small"}
                            style={{
                                ...chipS,
                                backgroundColor: red,
                                color: white,
                                marginRight: 4
                            }}
                        />
                        <Chip
                            title={"complete"}
                            label={"10"}
                            size={"small"}
                            style={{
                                backgroundColor: green,
                                color: white,
                                display: isOpen ? "inline-flex" : "none"
                            }}
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.PULL_REQUESTS)}>
                        <RepoListItemIcon icon={"Publish"} color={Colors.green}/>
                        <ListItemText
                            primary={"Pull request"}
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.COMMITS)}>
                        <RepoListItemIcon icon={"AssignmentReturnedOutlined"}/>
                        <ListItemText
                            primary={"Commits"}
                        />
                    </ListItemDiv>
                    <ListItemDiv button onClick={e => onItemClick(Repo.INSIGHTS)}>
                        {/*THis should update the toolbar. This is to mean the toolbar is not static and changes with time*/}
                        {/*Should display progress insights. Commits, users, */}
                        <RepoListItemIcon icon={"TrendingUp"}/>
                        <ListItemText
                            primary={"Insights"}
                        />
                    </ListItemDiv>
                    <Separator/>
                </List>
                <Separator/>
                <List>
                    <ListItemDiv button>
                        <RepoListItemIcon
                            icon={"Settings"}
                        />
                        <ListItemText
                            primary={"Settings"}
                        />
                    </ListItemDiv>
                </List>
            </Drawer>
        );
    }
}