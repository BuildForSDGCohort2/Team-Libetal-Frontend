import React from "react";
import clsx from "clsx";
import View from "./View";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MaterialBtn from "../../../widgets/MaterialBtn";
import App from "../../../App";

export default class RepoAppBar extends View {

    getLayout({classes, userData, appTheme, handleOpen, open}) {
        let view = "Projects";

        return (
            <AppBar
                position="fixed"
                className={clsx(appTheme.appBar, classes.appBar, {
                    [classes.appBarShift]: open
                })}>
                <Toolbar style={{display: "flex", flexDirection: "row !important", alignItems: "right"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {view}
                    </Typography>
                    <div className={classes.grow}/>
                    <MaterialBtn
                        className={appTheme.btn}
                        startIcon={<HomeIcon/>}
                        onClick={() => App.navigate("home")}
                        content={"Home"}/>
                </Toolbar>
            </AppBar>
        );
    }
}