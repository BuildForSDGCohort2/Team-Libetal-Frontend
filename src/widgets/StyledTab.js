import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import React from "react";

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        padding: 2,
        margin: 4,
        minWidth: 0
    },
    wrapper: {
        fontWeight: "normal",
        letterSpacing: 0.5
    }
}))((props) => <Tab  {...props} />);


export default StyledTab;