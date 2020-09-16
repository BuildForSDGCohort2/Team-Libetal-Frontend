import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Settings from "../utils/Settings";
import Tabs from "@material-ui/core/Tabs";
import Colors from "../Colors";
import MaterialTab from "./MaterialTab";


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
        defaultTabIndex: 0
    };

    props = {
        tabStyle: {},
        tabs: TabsLayout.defaultTabStyle.tabs,
        defaultTabIndex: TabsLayout.defaultTabStyle.defaultTabIndex,
        orientation: TabsLayout.defaultTabStyle.orientation,
        onChange: undefined,
        tabTopPadding: 2,
        tabBottomPadding: 2,
        minTabHeight: 24,
        minTabWidth: 24,
        value: 0,
        variant: ""
    };

    static defaultProps = {
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
        showIndicator: true
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
                tabs = propTabs.map(({key, label}) => this.getTab(key, label, tabStyle));
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

    }

    render() {

        let {orientation, onChange, minTabHeight, classes, showIndicator, ...props} = this.props;


        if (showIndicator === false) {
            return (
                <HiddenIndicator

                    value={this.state.defaultTabIndex}
                    orientation={orientation}
                    indicatorColor={Colors.black}
                    onChange={onChange}
                    {...props}
                    style={{minHeight: minTabHeight}}
                >
                    {this.tabs}
                </HiddenIndicator>
            );
        }

        return (
            <Layout

                value={this.state.defaultTabIndex}
                orientation={orientation}
                indicatorColor={Colors.black}
                onChange={onChange}
                {...props}
                style={{minHeight: minTabHeight}}
            >
                {this.tabs}
            </Layout>
        );
    }

}