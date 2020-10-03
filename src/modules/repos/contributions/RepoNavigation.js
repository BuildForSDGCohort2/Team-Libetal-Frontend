import React from "react";
import RepoAppBar from "./RepoAppBar";
import RepoDrawer from "./RepoDrawer";

export default class RepoNavigation extends React.Component {

    render() {

        let {classes, open, theme, handleClose, handleOpen, userData, appTheme} = this.props;

        return (
            <>
                <RepoAppBar
                    handleOpen={handleOpen}
                    open={open}
                    classes={classes}
                    userData={userData}
                    appTheme={appTheme}/>

                <RepoDrawer
                    classes={classes}
                    open={open}
                    theme={theme}
                    appTheme={appTheme}
                    handleClose={handleClose}
                    userData={userData}/>
            </>
        );
    }
}