import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import AppsIcon from "@material-ui/icons/Apps";
import Typography from "@material-ui/core/Typography";
import MaterialBtn from "../../../widgets/MaterialBtn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import LanguageIcon from "@material-ui/icons/Language";
import AppBar from "@material-ui/core/AppBar";
import View from "../../repos/contributions/View";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Settings from "../../../utils/Settings";
import UserAccountButton from "../widgets/UserAccountsButton";
import AccessibilityControl from "../../../widgets/AccessibilityControl";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import Libetal from "../../../widgets/icons/Libetal";
import Separator from "../../../widgets/separator";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import LanguagesAccessibilityControl from "../../../widgets/accessibility/LanguagesAccessibilityControl";

export default class RegisterAppBar extends View {

    getLayout({classes, styles, theme, handleOpen, open}) {

        return (
            <AppBar
                position="static"
                className={clsx(classes.appBar, {})}>
                <Toolbar>
                    <MaterialRow>
                        <IconButton
                            style={{
                                color: Settings.textPrimary
                            }}
                            aria-label="open drawer"
                            onClick={handleOpen}
                            edge="start">
                            <MenuIcon/>
                        </IconButton>
                        <MaterialBtn
                            paddinTop={0}
                            paddinBottom={0}
                            paddingLR={16}
                            startIcon={<Libetal height={32} width={32}/>}
                            variant={"text"}
                            fontSize={20}
                            textTransform={"none"}
                            content={"Libetal"}
                        />
                        <Separator/>
                        <GridItem xs={12} sm={5}>
                            <MaterialRow alignItems={Flex.CENTER} justify={Flex.SPACE_BETWEEN}>
                                <MaterialBtn
                                    variant={"text"}
                                    style={{marginRight: 10}}
                                    startIcon={<AppsIcon/>}
                                    content={"Store"}/>

                                <MaterialBtn
                                    variant={"text"}
                                    content={"FAQ"}
                                />

                                <MaterialBtn
                                    variant={"text"}
                                    content={"About US"}
                                />

                                <LanguagesAccessibilityControl componentInstance={this.props.registrationInstance}/>
                                <AccessibilityControl componentInstance={this.props.registrationInstance}/>
                                <UserAccountButton navigator={this.props.navigator}/>
                            </MaterialRow>
                        </GridItem>
                    </MaterialRow>
                </Toolbar>
            </AppBar>
        );
    }
}