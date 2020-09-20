import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Colors from "../../Colors";
import Row from "../../widgets/Row";
import Flex from "../../widgets/Flex";
import Column from "../../widgets/Column";
import MaterialTextView from "../../widgets/MaterialTextView";
import EarningsMenu from "./context_menues/EarningsMenu";
import MaterialIcon from "../../widgets/MaterialIcon";
import LineChart from "../../widgets/graphs/LineChart";
import DataSet from "../../widgets/DataSet";
import MaterialBtn from "../../widgets/MaterialBtn";

/**TODO
 * Need to present the
 * user weekly earnings or monthly earnings
 * Dependant of projects
 * Or total earnings per a given period
 * */
export default class UserInvestmentInsights extends Component {


    constructor(props) {
        super(props);

        this.fetchData();
    }

    fetchData() {
        this.fetchUserEarning()
            .then(
                data => {

                }
            )
            .catch(e => console.debug(e.message));
    }

    async fetchUserEarning() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    response: {
                        code: 200,
                        status: "Ok"
                    },
                    data: {}
                });
            }, 2000);
        });
    }

    render() {

        return (
            <Paper style={{background: Colors.orange, flexGrow: 1, padding: 4}}>
                <Row>
                    <Column xs={6}>
                        <MaterialTextView text={"Earnings"} textColor={Colors.white} variant={"h5"}/>
                    </Column>
                    <Column xs={6}>
                        <Row justify={Flex.END}>
                            <EarningsMenu/>
                        </Row>
                    </Column>
                </Row>
                <Row alignItems={Flex.CENTER}>
                    <MaterialTextView
                        text={"Ksh:10000"}
                        variant={"h5"}
                        textColor={Colors.white}/>
                    <MaterialIcon icon={"ExpandLess"} color={Colors.white}/>
                </Row>
                <Row justify={Flex.END}>
                    <MaterialTextView text={"Mon 15th - Sun 22nd"} textColor={Colors.white}/>
                </Row>
                <LineChart
                    showLegends={false}
                    showXAxisLabel={false}
                    labels={[10, 11, 12, 13, 14, 15, 16].map(date => `${date}th`)}
                    showGridLines={false}
                    yAxisStepSize={100}
                    yAxisTextColor={Colors.white}
                    xAxisTextColor={Colors.white}
                    yAxisGridLineColor={Colors.white}
                    xAxisGridLineColor={Colors.white}
                    tooltipLabelCallBack={() => "kSH:20"}
                    tooltipTitleCallBack={() => "20th"}
                    children={[
                        <DataSet
                            data={[100, 300, 400, 500, 500,200]}
                            borderWidth={2}
                            borderColor={Colors.white}
                            label={"Dataset"}
                            pointRadius={2}
                        />
                    ]}
                />
                <Row justify={Flex.CENTER} >
                    <MaterialTextView
                        variant={"h5"}
                        text={"Total Earnings"}
                        textColor={Colors.white}
                    />
                </Row>
                <div style={{display:"flex",flexGrow:1}}/>
                <Row justify={Flex.CENTER}>
                    <MaterialBtn
                        content={"View All"}
                    />
                </Row>
            </Paper>
        );
    }
}