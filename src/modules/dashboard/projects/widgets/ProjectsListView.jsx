import React, {Component} from "react";
import List from "@material-ui/core/List";
import {ListItem} from "@material-ui/core";
import ProjectListItemView from "./ProjectListItemView";
import PropTypes from "prop-types";

export default class ProjectsListView extends Component {


    static propTypes = {
        height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        maxHeight: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        minHeight: PropTypes.oneOf([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
        projects: []
    };

    get listItems() {
        return this.props.projects.map(
            (project, i) => (
                <ProjectListItemView
                    {...project}
                    navigator={this.props.navigator}
                    onClick={
                        (e) => {

                        }
                    }
                />)
        );
    }

    render() {

        let {
            props: {
                height = 600,
                maxHeight = height,
                minHeight = height,
                ...props
            }
        } = this;

        return (
            <List
                children={this.listItems}
                style={{flexGrow: 1, padding: 6, maxHeight: maxHeight, minHeight: minHeight, overflow: "auto"}}
            />
        );
    }
}