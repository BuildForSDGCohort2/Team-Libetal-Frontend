import React, {Component} from "react";
import List from "@material-ui/core/List";
import PullRequestListItemView from "./PullRequestListItemView";


export default class PullRequestsListView extends Component {

    static propTypes = {};

    get listItems() {
        let {props: {requests}} = this;
        return requests.map(
            request => <PullRequestListItemView {...request}/>
        );
    }

    render() {


        let {
            props: {
                style: {
                    height: sHeight,
                    width: sWidth = "80%",
                    ...style
                } = {},
                height = sHeight,
                width = sWidth,
                overflowY = "auto"
            }

        } = this;


        style.height = height;
        style.width = width;
        style.overflowY = overflowY;
        return (
            <List component={"div"} style={style}>
                {

                    this.listItems
                }
            </List>
        );
    }
}