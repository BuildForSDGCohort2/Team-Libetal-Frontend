import React, {Component} from "react";
import Drawer from "@material-ui/core/Drawer";
import MaterialDrawer from "../../../widgets/navigation/MaterialDrawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MaterialIcon from "../../../widgets/MaterialIcon";
import ListItemDiv from "../ListItemDiv";
import Radio from "@material-ui/core/Radio";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import GridItem from "../../../widgets/grid/GridItem";
import Chip from "@material-ui/core/Chip";
import RepoListItemIcon from "./RepoListItemIcon";
import MaterialImage from "../../../widgets/MaterialImage";
import Separator from "../../../widgets/separator";
import Colors from "../../../Colors";

export default class RepoDrawer extends Component {

    state = {
        isOpen: true,
        isPinned: true
    };


    static defaultProps = {
        onChange(isOpen) {
            console.log(`Unhandled drawer change isOpen=${isOpen}`);
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
                onChange
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
            purple
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
                    <ListItemDiv>
                        {/*TODO should be the app logo*/}
                        <MaterialImage src={"/images/logo.png"} height={52} width={52}/>
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
                    <ListItemDiv>
                        <RepoListItemIcon
                            icon={"AccountTree"}
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
                    <ListItemDiv>
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
                    <ListItemDiv>
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
                    <ListItemDiv>
                        <ListItemText
                            primary={"Pull request"}
                        />
                    </ListItemDiv>
                    <ListItemDiv>
                        <ListItemText
                            primary={"Commits"}
                        />
                    </ListItemDiv>
                    <ListItemDiv>
                        {/*THis should update the toolbar. This is to mean the toolbar is not static and changes with time*/}
                        {/*Should display progress insights. Commits, users, */}
                        <ListItemText
                            primary={"Insights"}
                        />
                    </ListItemDiv>
                </List>
            </Drawer>
        );
    }
}