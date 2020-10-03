import React, {Component} from "react";
import Row from "../../../widgets/Row";
import PlatformTabs from "./PlatformTabs";
import Paper from "@material-ui/core/Paper";

export default class TransactionsInsights extends Component {


    render() {
        let {
            platforms
        } = this.props;

        return (
            <Row>
                <Row>
                    <PlatformTabs platforms={platforms}/>
                </Row>
                <Row>
                    <Paper style={{padding:4}}>
                        Stats on transactions made on the account
                    </Paper>
                </Row>
            </Row>

        );
    }
}