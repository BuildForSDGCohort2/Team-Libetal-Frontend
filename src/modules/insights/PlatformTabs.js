import React from "react";
import TabsLayout from "../../widgets/TabsLayout";
import PropTypes from "prop-types";

export default class PlatformTabs extends React.Component {

    state = {
        currentTab: 0
    };

    static defaultProps = {
        defaultTabIndex: 0,
        onChange(e,newTab){
            console.info(`Unhandled Tab change tabIndex=${newTab}`)
        }
    };

    static propTypes = {
        defaultTabIndex: PropTypes.number,
        platforms: PropTypes.array.isRequired
    };

    render() {
        return (
            <TabsLayout
                defaultTabIndex={this.props.defaultTabIndex}
                onChange={(e,value)=>{
                    this.props.onChange(e,value)
                }}
                tabs={this.props.platforms.map(
                    ({id, name, os}, i) => ({
                        key: i,
                        label: name
                    })
                )}
            />
        );
    }
}