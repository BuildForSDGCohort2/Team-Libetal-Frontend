import React from "react";
import MaterialDrawer from "./MaterialDrawer";
import Colors from "../../Colors";

export default class Test extends React.Component {


    render() {
        return (
            <MaterialDrawer
                items={
                    [
                        {
                            body: "All",
                            icon: "Home"
                        },
                        {
                            body: "Accounts",
                            icon: {
                                name: "AccountBalance",
                                color: Colors.green
                            }

                        },
                        {
                            body: "Projects",
                            icon: {}
                        }
                    ]
                }
            />
        );
    }
}