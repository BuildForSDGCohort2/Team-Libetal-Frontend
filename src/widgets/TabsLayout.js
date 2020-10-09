import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Settings from "../utils/Settings";
import Tabs from "@material-ui/core/Tabs";
import MaterialTab from "./MaterialTab";
import PropTypes from "prop-types";
import Colors from "../Colors";


const component = (
    props => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>
);
const HiddenIndicator = withStyles({
    indicator: {
        display: "none",
        "& > *": {
            display: "none"
        }
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
// TODO onItemClick should return either true or false to control tab change
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
        minTabHeight: PropTypes.number,
        width: PropTypes.number,
        minTabWidth: PropTypes.number,
        tabMarginLeft: PropTypes.number,
        tabMarginRight: PropTypes.number,
        tabMarginTop: PropTypes.number,
        tabMarginBottom: PropTypes.number,
        tabTBPadding: PropTypes.number,
        tabLRPadding: PropTypes.number,
        tabLeftPadding: PropTypes.number,
        tabRightPadding: PropTypes.number,
        tabTopPadding: PropTypes.number,
        tabBottomPadding: PropTypes.number,
        value: PropTypes.number,
        variant: PropTypes.oneOf(["standard", "scrollable", "fullWidth"]),
        showIndicator: PropTypes.bool,
        onItemClick: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        tabStyle: {},
        value: 0,
        // ON CHANGE IS WORKING WRONG
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
        minTabHeight: 20,
        minTabWidth: 20,
        showIndicator: true,
        onItemClick: e => {

        },
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
            tabLRMargin,
            tabTBMargin,
            tabLeftMargin = tabLRMargin,
            tabRightMargin = tabLRMargin,
            tabTopMargin = tabTBMargin,
            tabBottomMargin = tabTBMargin,
            tabMarginLeft = tabLeftMargin,
            tabMarginRight = tabRightMargin,
            tabMarginTop = tabTopMargin,
            tabMarginBottom = tabBottomMargin,
            tabTBPadding,
            tabLRPadding,
            tabLeftPadding = tabLRPadding,
            tabRightPadding = tabLRPadding,
            tabBottomPadding = tabTBPadding,
            tabTopPadding = tabTBPadding

        } = this.props;

        tabStyle = tabStyle === undefined ? TabsLayout.defaultTabStyle : tabStyle;

        tabStyle = {
            ...tabStyle,
            display: "flex",
            minWidth: minTabWidth,
            minHeight: minTabHeight,
            paddingLeft: tabLeftPadding,
            paddingRight: tabRightPadding,
            paddingTop: tabTopPadding,
            paddingBottom: tabBottomPadding,
            marginLeft: tabMarginLeft,
            marginRight: tabMarginRight,
            marginTop: tabMarginTop,
            marginBottom: tabMarginBottom
        };


        let tabs = [];

        if (typeof tabs === "object") {
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
                        if (tab.label === undefined) {
                            key = i;
                            label = tab;
                        } else {
                            key = tab.key;
                            label = tab.label;
                        }
                        break;
                    default:
                        break;
                }

                return this.getTab(key, label, tabStyle);
            });
        } else {
            tabs = tabs.map((label, i) => this.getTab(i, label, tabStyle));
        }

        return tabs;
    }

    getTab(key, label, tabStyle) {
        return <MaterialTab key={key} label={label} onClick={this.props.onItemClick} style={tabStyle}/>;
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
            tabStyle: {...tabStyle} = {},
            defaultTabIndex,
            minTabWidth,
            orientation,
            onChange,
            minTabHeight,
            classes,
            value,
            tabLRMargin,
            tabTBMargin,
            tabLeftMargin = tabLRMargin,
            tabRightMargin = tabLRMargin,
            tabTopMargin = tabTBMargin,
            tabBottomMargin = tabTBMargin,
            tabTBPadding,
            tabLRPadding,
            tabLeftPadding = tabLRPadding,
            tabRightPadding = tabLRPadding,
            tabBottomPadding = tabTBPadding,
            tabTopPadding = tabTBPadding,
            onTabChangeRequest,
            onTabChangeRejected,
            showIndicator,
            style = {},
            width,
            onItemClick,
            ...props
        } = this.props;


        tabStyle.paddingLeft = tabLeftPadding;
        tabStyle.paddingRight = tabRightPadding;
        tabStyle.paddingTop = tabTopPadding;
        tabStyle.paddingBottom = tabBottomPadding;

        tabStyle.marginLeft = tabLeftMargin;
        tabStyle.marginRight = tabRightMargin;
        tabStyle.marginTop = tabTopMargin;
        tabStyle.marginBottom = tabBottomMargin;
        tabStyle.minHeight = minTabHeight;

        let tabChange = (e, tabId) => {
            if (onTabChangeRequest(tabId)) {
                this.currentTab = tabId;
                onChange(this, tabId);
            } else onTabChangeRejected(tabId);
        };

        let Component = showIndicator ? Layout : HiddenIndicator;

        let componentStyle = {
            ...style,
            minHeight: minTabHeight,
            padding: 0,
            paddingTop: 0,
            width: width
        };

        if (showIndicator === false) {
            componentStyle = {...componentStyle, paddingBottom: 0};
        }

        return (
            <Component
                value={this.currentTab}
                orientation={orientation}
                indicatorColor={"secondary"}
                onChange={tabChange}
                style={componentStyle}
                children={this.tabs}
                {...props}
            />
        );
    }

}