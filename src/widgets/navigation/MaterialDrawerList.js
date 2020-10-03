import React from "react";
import PropTypes from "prop-types";
import MaterialDrawerListItemCollapsable from "./MaterialDrawerListItemCollapsable";
import MaterialDrawerListItem from "./MaterialDrawerListItem";

export default class MaterialDrawerList extends React.Component {


    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                onClick: PropTypes.func,
                key: PropTypes.number,
                body: PropTypes.any,
                collapseTitle:PropTypes.string,
                icon: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.shape({
                        name: PropTypes.string,
                        color: PropTypes.any
                    })
                ]),
                end: PropTypes.any,
                onItemClick: PropTypes.func
            })
        ),
        onItemClick:PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
    };

    get items() {

        let {
            onItemClick: onDrawerItemClick,
            items,
        } = this.props;

        return items.map(({key, body, icon, onItemClick,end,collapseTitle}, i) => {
            let item;

            onItemClick = onItemClick || onDrawerItemClick;

            key = key || i;

            if (Array.isArray(body)) {
                item = (
                    <MaterialDrawerListItemCollapsable
                        id={key}
                        icon={icon}
                        onItemClick={onItemClick}
                        items={body}
                        body={collapseTitle}
                    />
                );
            } else item = (
                <MaterialDrawerListItem
                    id={key}
                    onItemClick={onItemClick}
                    body={body}
                    icon={icon}
                    end={end}
                />
            );



            return item;
        });


    }

    render() {
        return (
            <>
                {this.items}
            </>
        );
    }
}