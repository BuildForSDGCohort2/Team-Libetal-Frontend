import React, {Component} from "react";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import CommitListItemView from "./CommitListItemView";

export default class CommitsListView extends Component {

    static propTypes = {
        commits: PropTypes.arrayOf(
            PropTypes.shape({
                message: PropTypes.string,
                branch: PropTypes.shape({
                    name: PropTypes.string
                }),
                author: PropTypes.shape({
                    name: PropTypes.string,
                    email: PropTypes.string
                }),
                date: PropTypes.string,
                url: PropTypes.string,
                issue: PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string,
                    cost: PropTypes.shape({
                        value: PropTypes.number,
                        currency: PropTypes.shape({
                            name: PropTypes.string,
                            sign: PropTypes.string
                        })
                    })
                })
            })
        )
    };

    static defaultProps = {
        commits: []
    };

    prepCommitsListItems(commit, i) {

        return <CommitListItemView {...commit} i={i} navigator={this.props.navigator}/>;
    }

    render() {

        return (
            <List style={{height: 400}}>{
                this.props.commits.map(this.prepCommitsListItems.bind(this))
            }</List>
        );
    }
}
