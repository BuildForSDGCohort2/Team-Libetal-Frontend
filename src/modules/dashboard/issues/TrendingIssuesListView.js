import React, {Component} from "react";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import TrendingIssueView from "./TrendingIssueView";

export default class TrendingIssuesListView extends Component {


    static propTypes = {
        issues: PropTypes.arrayOf(
            TrendingIssueView.propTypes.issue
        )
    };


    prepIssue(issue) {

    }

    get issueItemsViews() {
        return this.props.issues.map(
            issue => (<TrendingIssueView issue={issue}/>)
        );
    }

    render() {
        return (
            <List>
                {this.issueItemsViews}
            </List>
        );
    }
}