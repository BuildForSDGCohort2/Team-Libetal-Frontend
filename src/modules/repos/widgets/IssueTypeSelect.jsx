import React, {Component} from "react";
import MaterialSelect from "../../../widgets/input/MaterialSelect";
import PropTypes from "prop-types";

export default class IssueTypeSelect extends Component {


    state = {
        issueTypeKey: 0,
        issuesTypes: [
            {title: "Custom"},
            {
                title: "Bug"
            },
            {
                title: "Feature"
            },
            {
                title: "Documentation"
            },
            {
                title: "Repeat"
            }
        ]
    };

    static propTypes = {
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange(issue) {
            console.log(`Unhandled issue type change `);
        }
    };

    render() {

        let {
            onChange
        } = this.props;

        return (
            <MaterialSelect
                fullWidth
                value={this.state.issueTypeKey}
                selectionItems={
                    this.state.issuesTypes.map(({title}, i) => ({
                        key: i,
                        value: title
                    }))
                }
                onChange={
                    (e, input) => {
                        if (input !== undefined) {
                            let {
                                value
                            } = input.props;

                            this.setState(
                                {issueTypeKey: value},
                                () => {
                                    let issue = this.state.issuesTypes[value];

                                    if (typeof onChange === "function") onChange(issue);
                                }
                            );
                        }
                    }
                }
            />
        );
    }
}