import React, {Component} from "react";
import PropTypes from "prop-types";
import TrendingIssueView from "./TrendingIssueView";
import SimilarIssueView from "./SimilarIssueView";
import List from "@material-ui/core/List";
import Row from "../../../widgets/Row";
import Flex from "../../../widgets/Flex";
import MaterialTextView from "../../../widgets/MaterialTextView";

export default class SimilarIssuesListView extends Component {

    static propTypes = {
        issues: PropTypes.arrayOf(
            TrendingIssueView.propTypes.issue
        ),
        height: PropTypes.number
    };

    get issueItemsViews() {

        let {
            issues
        } = this.props;

        if (issues.length > 1) {
            issues = this.props.issues.map(
                issue => (<SimilarIssueView issue={issue}/>)
            );
        } else {
            issues = <Row justify={Flex.CENTER}>
                <MaterialTextView variant={"h6"}>
                    No Similar issues
                </MaterialTextView>

            </Row>;
        }

        return issues;
    }

    render() {

        let {
            height
        } = this.props;

        return (
            <List style={{height: height, overflowY: "auto", paddingLeft: 4, paddingRight: 4}}>
                {this.issueItemsViews}
            </List>
        );
    }
}