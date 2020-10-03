import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export default class MaterialSelectMenuTitle extends Component {


    render() {

        let {
            content,
            align,
            children,
            color,
            display,
            gutterBottom,
            noWrap,
            paragraph,
            variant = "h1",
            variantMapping
        } = this.props;

        let props = {
            align,
            children,
            color,
            display,
            gutterBottom,
            noWrap,
            paragraph,
            variant,
            variantMapping
        };

        return (
            <Grid container justify={"center"}>
                <Grid item>
                    <Typography {...props}>
                        {content}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}