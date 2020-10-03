import React, {Component} from "react";
import LineChart from "../../../widgets/graphs/LineChart";
import TabsLayout from "../../../widgets/TabsLayout";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialTextView from "../../../widgets/MaterialTextView";
import GridItem from "../../../widgets/grid/GridItem";
import DataSet from "../../../widgets/DataSet";
import Colors from "../../../Colors";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import Paper from "@material-ui/core/Paper";


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
            <MaterialCol>
                <TabsLayout
                    variant={TabsLayout.VARIANT.SCROLLABLE}
                    orientation={TabsLayout.ORIENTATION.HORIZONTAL}
                />
               <Paper>
                   <MaterialRow>

                       <MaterialRow>
                           <GridItem xs={2} sm={2} lg={2}>
                               <TabsLayout
                                   variant={TabsLayout.VARIANT.SCROLLABLE}
                                   orientation={TabsLayout.ORIENTATION.VERTICAL}
                               />
                           </GridItem>
                           <GridItem xs={10} sm={10} lg={10}>
                               <MaterialRow justify={Flex.STRETCH}>
                                   <LineChart
                                       yAxisSampleSize={500}
                                       yAxisStepSize={100}
                                       labels={[11, 12, 13, 14, 15, 16, 17]}
                                       showLegends={false}
                                       tooltipLabelCallBack={d => "10"}
                                       showXAxisLabel={false}
                                       tooltipTitleCallBack={d => "Merged Commits"}
                                       showGridLines={false}
                                       children={[
                                           <DataSet
                                               data={[100, 300, 400, 30, 500, 200, 130]}
                                               borderWidth={2}
                                               borderColor={Colors.orange}
                                               backgroundColor={Colors.alpha("orange", .6)}
                                               fillArea={true}
                                               label={"Merged Commits"}
                                               pointRadius={2}
                                           />,
                                           <DataSet
                                               data={[300, 100, 300, 30, 500, 100, 120]}
                                               borderWidth={2}
                                               borderColor={Colors.red}
                                               backgroundColor={Colors.red}
                                               label={"Commits"}
                                               pointRadius={2}
                                               type={"bar"}
                                           />
                                       ]}
                                   />
                               </MaterialRow>
                           </GridItem>
                       </MaterialRow>

                       <MaterialDivider/>

                       <GridItem xs={6}>
                           <MaterialTextView
                               text={"12 Merged"}
                           />
                       </GridItem>
                       <GridItem xs={6}>
                           <MaterialTextView
                               text={"15 Merged"}
                           />
                       </GridItem>

                   </MaterialRow>
               </Paper>
            </MaterialCol>
        );
    }
}
