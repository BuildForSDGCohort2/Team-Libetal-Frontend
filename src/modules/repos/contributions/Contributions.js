import * as React from "react";
import Typography from "@material-ui/core/Typography";
import RepoAppBar from "./RepoAppBar";
import RepoDrawer from "./RepoDrawer";
import View from "./View";


export default class Contributions extends View {

    state = {
        drawerOpen: false
    }

    constructor(props) {
        super(props);

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState(prevState => ({drawerOpen: !prevState.drawerOpen}))
    }

    getLayout({classes, theme, appTheme}) {

        return (
            <div className={classes.root}>

                <RepoAppBar open={this.state.drawerOpen}
                            appTheme={appTheme}
                            classes={classes}
                            theme={theme}
                            handleOpen={this.toggleDrawer}/>

                <RepoDrawer classes={classes}
                            theme={theme}
                            appTheme={appTheme}
                            open={this.state.drawerOpen}
                            handleClose={this.toggleDrawer}/>

                <main className={classes.content}>

                    <div className={classes.toolbar}/>

                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet
                        id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
                        eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
                        Lorem
                        donec massa sapien faucibus et molestie ac.
                    </Typography>
                </main>
            </div>
        );
    }

}