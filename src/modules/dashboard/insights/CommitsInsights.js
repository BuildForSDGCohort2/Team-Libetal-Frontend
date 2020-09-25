import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Row from "../../../widgets/Row";
import LineChart from "../../../widgets/graphs/LineChart";
import Column from "../../../widgets/Column";
import TabsLayout from "../../../widgets/TabsLayout";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialTextView from "../../../widgets/MaterialTextView";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import DataSet from "../../../widgets/DataSet";
import Colors from "../../../Colors";
import MaterialCol from "../../../widgets/grid/MaterialCol";


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
                <Paper>
                    <MaterialRow>
                        <GridItem>
                            <TabsLayout
                                variant={TabsLayout.VARIANT.SCROLLABLE}
                                orientation={TabsLayout.ORIENTATION.VERTICAL}
                            />
                            <GridItem  xs={10}>
                                <MaterialCol>
                                    <LineChart
                                        yAxisSampleSize={500}
                                        yAxisStepSize={100}
                                        labels={[11, 12, 13, 14, 15, 16, 17]}
                                        showLegends={false}
                                        tooltipLabelCallBack={d=>"10"}
                                        showXAxisLabel={false}
                                        tooltipTitleCallBack={d=>"Merged Commits"}
                                        showGridLines={false}
                                        children={[
                                            <DataSet
                                                data={[100, 300, 400, 30, 500, 200,130]}
                                                borderWidth={2}
                                                borderColor={Colors.orange}
                                                backgroundColor={Colors.alpha("orange",.6)}
                                                fillArea={true}
                                                label={"Merged Commits"}
                                                pointRadius={2}
                                            />,
                                            <DataSet
                                                data={[300, 100, 300, 30, 500, 100,120]}
                                                borderWidth={2}
                                                borderColor={Colors.red}
                                                backgroundColor={Colors.red}
                                                label={"Commits"}
                                                pointRadius={2}
                                                type={"bar"}
                                            />
                                        ]}
                                    />
                                </MaterialCol>
                            </GridItem>
                            <MaterialDivider/>
                        </GridItem>
                        <GridItem>
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
                        </GridItem>
                    </MaterialRow>
                </Paper>
            </>
        );
    }
}
