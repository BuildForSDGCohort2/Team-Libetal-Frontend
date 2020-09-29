import React from "react";
import TextView from "../../widgets/MaterialTextView";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Row from "../../widgets/Row";
import MaterialTheme from "../../widgets/theming/MaterialTheme";
import Settings from "../../utils/Settings";
import Separator from "../../widgets/separator";
import Drawer from "@material-ui/core/Drawer";
import Column from "../../widgets/Column";
import Flex from "../../widgets/Flex";
import MaterialDivider from "../../widgets/MaterialDivider";
import Colors from "../../Colors";
import Footer from "../Footer";
import {Toolbar} from "@material-ui/core";
import IconButton from "../../widgets/button/MaterialIconButton";
import {AccountCircle as AccountCircleIcon} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialCol from "../../widgets/grid/MaterialCol";
import AccessibilityControl from "../../widgets/AccessibilityControl";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import ThemeProvider from "@material-ui/styles/ThemeProvider";


export default class About extends React.Component {


    static drawerItems = [];

    static WHAT_WE_DO = 1;

    state = {
        userDetails: {
            name: "Breimer",
            email: "brymher@gmail.com"
        },
        drawerItems:
            [
                {
                    key: 0,
                    body: [
                        {
                            key: About.WHAT_WE_DO,
                            body: "What We Do"
                        }
                    ],
                    collapseTitle: "About"
                }
            ]

    };


    static propTypes = {
        classes: PropTypes.object
    };

    constructor(props) {
        super(props);


        this.bindEvents();
    }

    bindEvents() {
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    onMenuItemClick(drawer, itemId) {
        switch (itemId) {
            case About.WHAT_WE_DO:

                break;
            default:
                console.log(`Unhandled item click ${itemId}`);
        }
    }

    get userAvatar() {
        return (
            <AccountCircleIcon/>
        );
    }

    get toolBarBtnContent() {
        let {userDetails: {name, email}} = this.state;

        return (
            <Grid container direction={"column"}>
                {/*TODO required link*/}
                <Grid>
                    <TextView
                        text={`@${name}`}
                        style={{
                            fontSize: 12,
                            textAlign: "left",
                            textTransform: "none"
                        }}
                    />
                </Grid>
                <Grid>
                    <TextView
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

    render() {

        let {
            classes,
            navigator
        } = this.props;

        let drawerWidth = 280;

        let {blue_lighten_1, orange, orange_lighten_1, blue} = Colors;

        return (
            <ThemeProvider theme={Settings.appTheme}>
                <Drawer variant={"permanent"} style={{width: drawerWidth}}>
                    <MaterialCol justify={Flex.CENTER} alignContent={Flex.CENTER}
                                 style={{backgroundColor: Colors.orange, width: drawerWidth}}>
                        <img
                            src={"/images/logo.png"} alt={"Libetal"}
                            width={216}/>
                    </MaterialCol>
                    <MaterialCol>
                        <TextView
                            text={"About"}
                            variant={"h4"}
                        />
                        <MaterialDivider width={"80%"}/>
                        <TextView text={"About Us"}/>
                        <TextView text={"Our goal"}/>
                        <TextView text={"Projects & Contribution"} variant={"h6"}/>
                        <TextView text={"Projects"}/>
                        <TextView text={"Contributions"}/>
                        <TextView text={"Financing & Returns"} variant={"h6"}/>
                        <TextView text={"Financing"}/>
                        <TextView text={"Returns"}/>
                        <TextView text={"Terms & Condition"} variant={"h6"}/>
                        <TextView text={"Licencing"}/>
                        <TextView text={"Privacy Policy"}/>
                        <TextView text={"Cookie Policy"}/>
                    </MaterialCol>
                    <Separator/>
                </Drawer>
                <div style={MaterialTheme[Settings.theme].Body.Drawer.Permanent}>
                    <Toolbar>
                        <TextView
                            text={"About Us"}
                            variant={"h3"}
                            textColor={orange}
                        />
                        <Separator/>
                        <Column spacing={1} xs={4}>
                            <Row justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                                <AccessibilityControl componentInstance={this}/>
                                <IconButton
                                    icon={"Apps"}
                                    iconColor={Colors.orange}
                                    buttonColor={Colors.white}
                                />
                                <IconButton
                                    icon={"Settings"}
                                    iconColor={Colors.orange}
                                    buttonColor={Colors.white}
                                />
                                <UserAccountButton
                                    userDetails={{
                                        name: "Breimer",
                                        email: "brymher@gmail.com",
                                        img: "/images/logo.png"
                                    }}
                                    navigator={this.props.navigator}
                                />
                            </Row>
                        </Column>
                    </Toolbar>
                    <Row justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                        <Column style={{paddingLeft: 12}} xs={12} lg={8}>
                            <TextView
                                text={"Our goal"}
                                variant={"h5"}
                                textColor={blue_lighten_1}
                            />
                            <Typography variant={"body1"}>
                                We all have ideas that we would like to have actualized But the journey and resources
                                required to get a project from our mind through a feasibility study to design to
                                production is not a journey that is easy to achieve. This is mainly due to lack of
                                finances The lack of resources to get someone qualified to design or test your product
                                Our goal is to be the intermediary between you and your dream, to connect you to people
                                who believe in your product To have people who are not just employees on your product
                                but investors We want professionals from everywhere to come together in similar dreams
                                and ideology collaborate on projects that not only make a difference to the world but
                                gives you returns to be proud off Invest with your skill, finances or designs. Your
                                contribution to a project here is not just a commit but an investment no matter how
                                small it is it's worth something to the overal project.

                                Give developers the ability to create robust but affordable software whilst gaining
                                returns that can provide and sustain a leaving. <em>Give a hobby value.</em>
                            </Typography>

                            <TextView
                                text={"Mission"}
                                variant={"h5"}
                                textColor={blue_lighten_1}
                            />
                            <Typography>
                                Our mission is to create an alternative source of income by providing a platform for
                                people with similar interests to, collaborate, create and publish their products.
                            </Typography>
                        </Column>
                        <MaterialDivider orientation={MaterialDivider.VERTICAL} height={100}/>
                        <Column xs={12} lg={3} justify={Flex.CENTER}>
                            <Row>
                                <TextView
                                    text={"Our Goal"}
                                />
                            </Row>

                            <Row>
                                <TextView
                                    text={"Mission"}
                                />
                            </Row>
                        </Column>
                    </Row>
                    <Footer/>
                </div>
            </ThemeProvider>
        );
    }
}