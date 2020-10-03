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

export default class RegisterAppBar extends View {

    getLayout({classes, styles, theme, handleOpen, open}) {

        return (
            <AppBar
                position="static"
                className={clsx(classes.appBar, {})}>
                <Toolbar style={{display: "flex", flexDirection: "row !important", alignItems: "right"}}>
                    <IconButton
                        style={{
                            color: Settings.textPrimary
                        }}
                        aria-label="open drawer"
                        onClick={handleOpen}
                        edge="start">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h2">
                        Libetal
                    </Typography>
                    <div className={classes.grow}/>
                    <nav>
                        <MaterialBtn
                            style={{marginRight: 10}}
                            startIcon={
                                <Grid container>
                                    <AccountTreeIcon/>
                                </Grid>
                            }
                            content={"Repositories"}/>

                        <MaterialBtn
                            style={{marginRight: 10}}
                            startIcon={
                                <Grid container>
                                    <AppsIcon/>
                                </Grid>
                            }
                            content={"Store"}/>

                        <MaterialBtn
                            style={{marginRight: 10}}
                            endIcon={
                                <Grid container>
                                    <LanguageIcon/>
                                    <InvertColorsIcon/>
                                </Grid>
                            }
                            content={"Accessibility"}/>

                        <Button
                            variant={"contained"}
                            startIcon={<AccountCircleIcon/>}
                            endIcon={<ExpandMoreIcon/>}>
                            Login
                        </Button>
                    </nav>
                </Toolbar>
            </AppBar>
        );
    }
}