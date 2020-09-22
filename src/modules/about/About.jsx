import React from "react";
import Row from "../../widgets/Row";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MaterialTextView from "../../widgets/MaterialTextView";
import Colors from "../../Colors";
import Separator from "../../widgets/separator";
import MaterialBtn from "../../widgets/MaterialBtn";
import {AccountCircle as AccountCircleIcon, MoreVert as MoreVertIcon} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import TabsLayout from "../../widgets/TabsLayout";

export default class About extends React.Component{


    state = {
        userDetails:{
            name:"Breimer",
            email:"brymher@gmail.com"
        }
    }


    get toolBarBtnContent() {
        let {userDetails: {name, email}} = this.state;

        return (
            <Grid container direction={"column"}>
                {/*TODO required link*/}
                <Grid>
                    <MaterialTextView
                        text={`@${name}`}
                        style={{
                            fontSize: 12,
                            textAlign: "left",
                            textTransform: "none"
                        }}
                    />
                </Grid>
                <Grid>
                    <MaterialTextView
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

    render(){
        return (
            <>
                <AppBar color={"secondary"}>
                    <Toolbar>
                        <img src={"/images/logo.png"} width={100} style={{marginLeft:10}}/>
                        <MaterialTextView
                            text={"About Us"}
                            textColor={Colors.white}
                        />

                        <Separator/>
                        <TabsLayout
                            variant={TabsLayout.VARIANT.SCROLLABLE}
                            tabs={[
                                {
                                    id:0,
                                    label:"Store"
                                },
                                {
                                    id:1,
                                    label:"Dashboard"
                                }
                            ]}
                        />
                        <Separator/>
                        <nav>
                            <MaterialBtn
                                color={"primary"}
                                variant={"contained"}
                                startIcon={<AccountCircleIcon/>}
                                content={this.toolBarBtnContent}
                                endIcon={<MoreVertIcon/>}
                            />
                        </nav>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}