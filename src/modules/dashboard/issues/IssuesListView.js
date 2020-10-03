import React, {Component} from "react";
import {List} from "@material-ui/core";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import Column from "../../../widgets/grid/MaterialCol";
import Row from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Colors from "../../../Colors";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialIcon from "../../../widgets/MaterialIcon";
import Separator from "../../../widgets/separator";
import MaterialDivider from "../../../widgets/MaterialDivider";
import TabsLayout from "../../../widgets/TabsLayout";
import IssueListItemView from "./IssueListItemView";

export default class IssuesListView extends Component {


    static propTypes = {
        issues: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            cost: PropTypes.shape({
                estimated: PropTypes.shape({
                    value: PropTypes.number,
                    sign: PropTypes.string
                })
            }),
            assignee: PropTypes.shape({
                name: PropTypes.string
            }),
            by: PropTypes.shape({
                name: PropTypes.string
            }),
            project: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            }),
            priority: PropTypes.string,
            state: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                description: PropTypes.string
            }),
            type: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                descriptions: PropTypes.string
            }),
            date: PropTypes.string,
            attachments: PropTypes.arrayOf(PropTypes.string),
            milestones: PropTypes.arrayOf(PropTypes.string),
            tags: PropTypes.arrayOf(PropTypes.string)
        }),
        minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        overflowY: PropTypes.string
    };

    static defaultProps = {
        style: {}
    };

    render() {
        let {
            props: {
                style: {
                    minHeight: sMinHeight,
                    minWidth: sMinWidth,
                    ...style
                },
                minHeight = sMinHeight,
                minWidth = sMinWidth,
                maxHeight,
                overflowY = "scroll",
                height
            }
        } = this;


        style.minHeight = minHeight;
        style.minWidth = minWidth;
        style.maxHeight = maxHeight;
        style.height = height;
        style.overflowY = overflowY;

        return (
            <List style={style}>
                {this.props.issues.map(IssueListItemView.mapCreate)}
            </List>
        );
    }
}