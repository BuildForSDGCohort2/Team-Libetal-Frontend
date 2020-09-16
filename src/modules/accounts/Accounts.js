import React from "react";
import AccountInsights from "./AccountInsights";
import Dashboard from "../dashboard/Dashboard";
import PropTypes from "prop-types";
import AccountsDrawer from "./AccountsDrawer";


export default class Accounts extends React.Component {

    state = {
        name: "Breimer",
        currentTab: 0,
        drawerState: false
    };

    static propTypes = {
        context: PropTypes.instanceOf("Dashboard").isRequired
    };

    props = {
        context: {}
    };


    constructor(props) {
        super(props);

        this.bindEvents();
    }


    bindEvents() {
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState(state => ({drawerState: state.drawerState}));
    }

    get currentTab() {
        let view;
        switch (this.state.currentTab) {
            default:
                view = (this.insights);
        }

        return view;
    }

    //TODO display insights
    get insights() {
        return (
            <AccountInsights accounts={this}/>
        );
    }

    render() {
        let {classes} = this.props;

        return (
            <>
                {<AccountsDrawer drawerState={this.state.drawerState} classes={classes}/>}
                {this.currentTab}
            </>
        );
    }
}