import React, {Component} from "react";
import PropTypes from "prop-types";
import TabsLayout from "../../widgets/TabsLayout";

export default class AppsTabs extends Component {


    state = {
        currentTab: 0
    };

    static propTypes = {
        defaultTag: PropTypes.number,
        apps: PropTypes.array.isRequired,
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange(newTab) {
            console.info(`Unhandled apps tab change tab = ${newTab}`);
        }
    };

    get currentTab() {
        return this.state.currentTab;
    }

    set currentTab(currentTab) {
        this.setState((currentTab));
    }

    get apps() {
        return this.props.apps;
    }

    componentDidMount() {
        this.currentTab = this.props.currentTab;
    }


    render() {


        return (
            <TabsLayout
                value={this.currentTab}
                // TODO add app icons fetch for this section
                tabs={
                    this.apps.map(
                        (name, i) => ({
                            key: i,
                            label: name
                        })
                    )
                }
                orientation={"vertical"}
                defaultTabIndex={0}
            />
        );
    }
}