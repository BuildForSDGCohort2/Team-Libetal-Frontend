import React from "react";
import {ListItem, ListItemIcon} from "@material-ui/core";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialIconBtn from "../MaterialIconBtn";

export default class MaterialDrawerListItem extends React.Component {


    static propTypes = {
        id: PropTypes.number,
        collapseTitle:PropTypes.string,
        body: PropTypes.any,
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name: PropTypes.string,
                color: PropTypes.any
            })
        ]),
        end: PropTypes.any,
        onItemClick: PropTypes.func
    };

    static defaultProps ={
        onItemClick(e,itemId){
            console.log(`Unhandled click on key=${itemId}`)
        }
    }


    get itemBody(){
        let {
            id,
            icon,
            body,
            end
        } = this.props;

        switch (typeof body) {
            case "string":
                body = <ListItemText>{body}</ListItemText>;
                break;
            default:
                break;
        }


        switch (typeof icon) {
            case "undefined":
                break;

            case "string":
                icon = (
                    <ListItemIcon key={id}>
                        <MaterialIconBtn icon={icon}/>
                    </ListItemIcon>
                );
                break;

            case "object":
                icon = (
                    <ListItemIcon key={id}>
                        <MaterialIconBtn icon={icon.name} color={icon.color}/>
                    </ListItemIcon>
                );
                break;
            default:
                break;
        }
        return [
            icon,
            body,
            end
        ]
    }

    get item() {

        let {
            onItemClick,
            id,
            selected
        } = this.props;

        return (
            <ListItem
                button
                key={id}
                selected={selected}
                onClick={e => {
                    onItemClick(e,id);
                }}
            >
                {this.itemBody}
            </ListItem>
        );
    }

    render() {
        return this.item
    }
}