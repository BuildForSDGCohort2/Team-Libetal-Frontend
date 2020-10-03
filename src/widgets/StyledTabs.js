import withStyles from "@material-ui/core/styles/withStyles";
import Settings from "../utils/Settings";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

const StyledTabs = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            width: "100%",
            backgroundColor: Settings.colorSecondary
        },
        "& > a": {
            display: "none"
        }
    }
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

export default StyledTabs;