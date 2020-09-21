import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Row from "../../widgets/Row";
import LineChart from "../../widgets/graphs/LineChart";
import Column from "../../widgets/Column";
import TabsLayout from "../../widgets/TabsLayout";
import MaterialDivider from "../../widgets/MaterialDivider";
import Colors from "../../Colors";
import MaterialTextView from "../../widgets/MaterialTextView";


export default class CommitsInsights extends Component {


    state = {
        appsCommits: []
    };

    constructor(props) {
        super(props);
        this.fetchData();
    }

    /**TODO
     * Fetch data associated with
     * total commits pepr ap
     * */
    fetchData() {
        this.fetchBranchData()
            .then(
                e => {

                }
            )
            .catch(e => console.log(e.message));
    }


    async fetchBranchData() {
        return new Promise(resolve => {

            setTimeout(a => {

                let dS = 99;

                while (dS >= 0) {

                    dS--;
                }

                resolve();
            }, 1000);
        });
    }


    render() {


        return (
            <>
                <TabsLayout
                    variant={TabsLayout.VARIANT.SCROLLABLE}
                    orientation={TabsLayout.ORIENTATION.HORIZONTAL}
                />
                <Paper style={{display: "flex", flexGrow: 1}}>
                    <Row>
                       <Column xs={12} style={{padding:4}}>
                           <Row>
                               <Column xs={2}>
                                   <TabsLayout
                                       variant={TabsLayout.VARIANT.SCROLLABLE}
                                       orientation={TabsLayout.ORIENTATION.VERTICAL}
                                   />
                               </Column>
                               <Column xs={10}>
                                   <LineChart
                                       showXAxisLabel={false}
                                   />
                               </Column>
                           </Row>
                           <MaterialDivider />
                       </Column>
                        <Column xs={12} >
                            <Row>
                                <Column xs={6}>
                                    <MaterialTextView
                                        text={"12 Merged"}
                                    />
                                </Column>
                                <Column xs={6}>
                                    <MaterialTextView
                                        text={"15 Merged"}
                                    />
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Paper>
            </>
        );
    }
}
