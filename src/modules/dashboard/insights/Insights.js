import React from "react";
import AllInsights from "./AllInsights";
import PropTypes from "prop-types";
import InsightsDrawer from "./InsightsDrawer";
import AccountsInsights from "./AccountsInsights";
import ProjectsInsights from "./ProjectsInsights";
import Row from "../../../widgets/Row";
import ProductivityInsights from "./ProductivityInsights";
import Footer from "../../Footer";


/**Todo
 * add options to switch graph from bar to charts
 * */
export default class Insights extends React.Component {

    static ALL_INSIGHTS_TAB = 0;
    static ACCOUNTS_INSIGHTS_TAB = 1;
    static PROJECTS_INSIGHTS_TAB = 2;
    static PRODUCTIVITY_TAB = 3;

    state = {
        name: "Breimer",
        pinState: false,
        currentTab: Insights.ALL_INSIGHTS_TAB,
        drawerState: false
    };

    static propTypes = {
        context: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.bindEvents();
    }

    bindEvents() {
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    toggleDrawer() {
        this.setState(state => ({drawerState: state.drawerState}));
    }

    get currentTab() {
        let view;

        switch (this.state.currentTab) {

            case Insights.ACCOUNTS_INSIGHTS_TAB:
                view = <AccountsInsights/>;
                break;

            case Insights.PROJECTS_INSIGHTS_TAB:
                view = <ProjectsInsights/>;
                break;

            case Insights.PRODUCTIVITY_TAB:
                view = <ProductivityInsights/>;
                break;

            default:
                view = <AllInsights accounts={this} pinState={this.state.pinState}/>;
                break;

        }

        return view;
    }


    onMenuItemClick(drawer, itemId) {
        this.setState({currentTab: itemId});
    }

    render() {
        let {classes} = this.props;
        let pinState = this.state.pinState;


        return (
            <>
                {<InsightsDrawer onPinChange={(pinState) => {
                    this.setState({pinState});
                }} onItemClick={this.onMenuItemClick} classes={classes}/>}
                <Row
                    style={{
                        paddingRight: 0,
                        paddingLeft: pinState ? 242 : 58
                    }}
                    children={this.currentTab}
                />
                <Footer
                    style={{
                        paddingLeft: pinState ? 242 : 58
                    }}
                />
            </>
        );
    }
}