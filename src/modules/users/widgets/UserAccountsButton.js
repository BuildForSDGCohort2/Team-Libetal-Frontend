import React, {Component} from "react";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import Flex from "../../../widgets/Flex";
import TextView from "../../../widgets/MaterialTextView";
import MenuItem from "@material-ui/core/MenuItem";
import MaterialIcon from "../../../widgets/MaterialIcon";
import MaterialDivider from "../../../widgets/MaterialDivider";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default class UserAccountButton extends Component {


    state = {
        anchorEl: undefined
    };


    static propTypes = {
        userDetails: PropTypes.object
    };

    static defaultProps = {
        userDetails: {
            name: "Breimer",
            email: "brymher@gmail.com",
            img: "/images/logo.png"
        }
    };

    set anchorEl(value) {
        // avoid unnecessary changes
        this.setState(
            {anchorEl: value},
            () => {
                console.log(`Create action on state change of menu option`);
            }
        );
    }

    openMenu(event) {
        this.setState({anchorEl: event.currentTarget});
    }

    close(event) {
        this.setState({anchorEl: undefined});
    }


    get buttonBody() {

        let {
            userDetails
        } = this.props;
        return (
            <Row alignItems={Flex.CENTER} style={{width: 180}}>
                <Column xs={2} justify={Flex.CENTER}>
                    <Avatar
                        src={userDetails.img}
                        style={{
                            width: 24,
                            height: 24
                        }}
                    />
                </Column>
                <Column xs={10}>
                    <TextView
                        text={userDetails.name}
                        style={{
                            textAlign: "left"
                        }}
                    />
                    <TextView
                        text={userDetails.email}
                        fontSize={12}
                        style={{
                            textAlign: "left"
                        }}
                    />
                </Column>
            </Row>
        );
    }

    render() {

        let {
            anchorEl
        } = this.state;

        return (
            <>
                <MaterialBtn
                    content={this.buttonBody}
                    textTransform={"none"}
                    style={{
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingTop: 4,
                        paddingBottom: 4
                    }}
                    onClick={
                        e => {
                            this.anchorEl = e.currentTarget;
                        }
                    }
                />
                <Menu
                    style={{marginTop: 40}}
                    id="accounts-options-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={
                        e => {
                            this.anchorEl = undefined;
                        }
                    }
                    TransitionComponent={Fade}
                >
                    <Row style={{width: 420}} justify={Flex.SPACE_AROUND}>
                        <Column xs={7}>
                            <TextView
                                text={"Productivity"}

                            />
                            <MaterialDivider
                                width={"50%"}
                            />
                            <MenuItem
                                onClick={
                                    e => {
                                        this.props.navigator("dashboard/teams");
                                    }
                                }
                            >
                                <ListItemIcon>
                                    <MaterialIcon
                                        icon={"People"}
                                    />
                                </ListItemIcon>

                                <TextView text={"Teams"}/>
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    e => {
                                        this.props.navigator("dashboard/projects?by=me");
                                    }
                                }
                            >
                                <ListItemIcon>
                                    <MaterialIcon
                                        icon={"AccountTree"}
                                    />
                                </ListItemIcon>
                                <TextView text={"Your Projects"}/>
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    e => {
                                        this.props.navigator("dashboard/issues?by=me");
                                    }
                                }
                            >
                                <ListItemIcon>
                                    <MaterialIcon
                                        icon={"BugReport"}
                                    />
                                </ListItemIcon>
                                <TextView text={"Issues"}/>
                            </MenuItem>

                            <MenuItem
                                onClick={
                                    e => {
                                        this.props.navigator("dashboard/insights?projects=all");
                                    }
                                }
                            >
                                <ListItemIcon>
                                    <MaterialIcon
                                        icon={"TrendingUp"}
                                    />
                                </ListItemIcon>
                                <TextView text={"Insights"}/>
                            </MenuItem>
                        </Column>
                        <MaterialDivider height={100} orientation={MaterialDivider.VERTICAL}/>
                        <Column xs={4}>
                            <TextView
                                text={"Account"}
                            />
                            <MaterialDivider
                                width={"50%"}
                            />
                            <MenuItem>
                                <ListItemIcon>
                                    <Avatar
                                        src={this.props.userDetails.img}
                                        style={{width: 24, height: 24}}
                                    />
                                </ListItemIcon>
                                <TextView
                                    text={"Profile"}
                                />
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <MaterialIcon
                                        icon={"ExitToApp"}
                                    />
                                </ListItemIcon>
                                <TextView
                                    text={"Logout"}
                                />
                            </MenuItem>
                        </Column>
                    </Row>
                </Menu>
            </>
        );
    }
}