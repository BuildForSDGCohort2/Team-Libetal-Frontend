import React, {Component} from "react";
import Row from "../../widgets/Row";
import PlatformTabs from "./PlatformTabs";

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

                </Row>
            </Row>

        );
    }
}