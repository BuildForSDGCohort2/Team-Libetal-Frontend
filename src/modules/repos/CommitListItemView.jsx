import React, {Component} from "react";
import ListItemDiv from "./ListItemDiv";
import PropTypes from "prop-types";
import CommitProps from "./CommitProps";


export default class CommitListItemView extends Component {

    static propTypes = {
        ...CommitProps,
        onClick: PropTypes.func,
        i: PropTypes.number
    };

    render() {
        let {
            props: {
                message,
                branch: {
                    name: branchName
                } = {},
                author: {
                    name: authorName,
                    email: authorEmail
                } = {},
                date,
                url,
                issue: {
                    id: issueId,
                    title: issueTitle,
                    type: {
                        name: issueTypeName
                    } = {},
                    cost: {
                        value: issueEstimateCost,
                        currency: {
                            name: issueEstimateCostName,
                            sign: issueEstimateCostSign
                        }
                    } = {}
                } = {},
                i,
                onClick
            }
        } = this;

        return (
            <ListItemDiv
                onClick={
                    e => {
                        e.stopPropagation();
                        onClick(this.props.i);
                    }
                }
                key={i}
            >

                {message}

            </ListItemDiv>
        );
    }
}