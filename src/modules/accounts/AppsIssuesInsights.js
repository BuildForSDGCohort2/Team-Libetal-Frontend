import React from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Row from "../../widgets/Row";
import PlatformTabs from "./PlatformTabs";

export default class AppsIssuesInsights extends React.Component {


    static defaultProps = {
        platforms: ["Default 1", "Default 2", "Default 3", "Default 4"]
    };

    static propTypes = {
        platforms: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.bindEvents();
    }

    bindEvents() {
        this.onPlatformTabsChange = this.onPlatformTabsChange.bind(this);
        this.onAppsTabsChange = this.onAppsTabsChange.bind(this);
    }

    onPlatformTabsChange(event, newTab) {

    }

    onAppsTabsChange(event, newTab) {

    }

    render() {
        let {
            platforms
        } = this.props;

        return (
            <Row>
                <Row>
                    <PlatformTabs platforms={platforms} onChange={this.onPlatformTabsChange}/>
                </Row>
                <Row>
                    <Paper>
                        This is paper content
                    </Paper>
                </Row>
            </Row>
        );
    }
}