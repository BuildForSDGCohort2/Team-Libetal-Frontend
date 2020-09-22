import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Settings from "../utils/Settings";
import Tabs from "@material-ui/core/Tabs";
import MaterialTab from "./MaterialTab";
import PropTypes from "prop-types";


const component = (
    props => <Tabs  {...props} TabIndicatorProps={{children: <span/>}}/>
);
const HiddenIndicator = withStyles({
    indicator: {
        display: "none"
    }
})(component);

const Layout = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            width: "100%",
            backgroundColor: Settings.colorSecondary
        },
        "& > a": {
            display: "none"
        }
    }
})(component);

export default class TabsLayout extends Component {

    state = {
        currentTab: 0
    };

    static ORIENTATION = {
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal"
    };

    static VARIANT = {
        SCROLLABLE: "scrollable"
    };

    static propTypes = {
        tabStyle: PropTypes.object,
        tabs: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.number,
                    label: PropTypes.any
                })
            )
        ]).isRequired,
        defaultTabIndex: PropTypes.number,
        orientation: PropTypes.oneOf(["horizontal", "vertical"]),
        tabTopPadding: PropTypes.number,
        tabBottomPadding: PropTypes.number,
        minTabHeight: PropTypes.number,
        minTabWidth: PropTypes.number,
        value: PropTypes.number,
        variant: PropTypes.oneOf(["standard","scrollable","fullWidth"]),
        showIndicator:PropTypes.bool
    };

    static defaultProps = {
        tabStyle: {},
        value: 0,
        onChange(e, newTab) {
            console.log(`Unhandled tab change newTab=${newTab}`);
        },
        tabs: [
            {
                key: 1,
                label: "One"
            }
        ],
        defaultTabIndex: 0,
        orientation: "horizontal",
        minTabHeight: 32,
        minTabWidth: 32,
        tabTopPadding: 2,
        tabBottomPadding: 2,
        showIndicator: true,
        onTabChangeRequest: () => true,
        onTabChangeRejected: (tabId) => console.log(`Unhandled tab change rejections ${tabId}`)
    };
    static defaultTabStyle = {};

    get tabs() {
        let {
            tabs: propTabs,
            tabStyle,
            minTabWidth,
            minTabHeight,
            tabTopPadding,
            tabBottomPadding
        } = this.props;

        tabStyle = tabStyle === undefined ? TabsLayout.defaultTabStyle : tabStyle;

        tabStyle = {
            ...tabStyle,
            display: "flex",
            minWidth: minTabWidth,
            minHeight: minTabHeight,
            paddingBottom: tabTopPadding,
            paddingTop: tabBottomPadding
        };


        let tabs = [];

        switch (typeof tabs) {
            case "object":
                tabs = propTabs.map((tab, i) => {
                    let key = i;
                    let label;

                    switch (typeof tab) {
                        case "string":
                            key = i;
                            label = tab;
                            break;
                        case "object":
                            // Unify syntax design if you find rem to implement in Unify lang gitHub
                            // {key,label} = tab
                            if(tab.label === undefined){
                                key = i
                                label = tab
                            }else {
                                key = tab.key;
                                label = tab.label;
                            }
                            break;
                        default:
                            break;
                    }

                    return this.getTab(key, label, tabStyle);
                });
                break;
            default:
                tabs = tabs.map((label, i) => this.getTab(i, label, tabStyle));

        }

        return tabs;
    }

    getTab(key, label, tabStyle) {
        return <MaterialTab key={key} label={label} style={tabStyle}/>;
    }

    componentDidMount() {
        this.setState({currentTab: this.props.defaultTabIndex});
    }

    set currentTab(value) {
        this.setState({
            currentTab: (value || this.props.defaultTabIndex)
        });
    }


    get currentTab() {
        return this.state.currentTab;
    }


    render() {

        let {
            tabs,
            tabStyle,
            defaultTabIndex,
            minTabWidth,
            tabTopPadding,
            tabBottomPadding,
            orientation,
            onChange,
            minTabHeight,
            classes,
            value,
            onTabChangeRequest,
            onTabChangeRejected,
            showIndicator,
            ...props
        } = this.props;


        let tabChange = (e, tabId) => {
            if (onTabChangeRequest(tabId)) {
                this.currentTab = tabId;
                onChange(this, tabId);
            } else onTabChangeRejected(tabId);
        };


        if (showIndicator === false) {
            return (
                <HiddenIndicator
                    value={this.currentTab}
                    orientation={orientation}
                    indicatorColor={"secondary"}
                    onChange={tabChange}
                    {...props}
                    style={{minHeight: minTabHeight}}
                >
                    {this.tabs}
                </HiddenIndicator>
            );
        }

        return (
            <Layout
                value={this.currentTab}
                orientation={orientation}
                indicatorColor={"secondary"}
                onChange={tabChange}
                {...props}
                style={{minHeight: minTabHeight}}
                children={this.tabs}
            />
        );
    }

}