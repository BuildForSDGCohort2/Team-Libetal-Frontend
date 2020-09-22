import React, {Component} from "react";
import Row from "../Row";
import Flex from "../Flex";
import Column from "../Column";
import MaterialIcon from "../MaterialIcon";
import MaterialTextView from "../MaterialTextView";
import PropTypes from "prop-types";

export default class MaterialMenuItem extends Component {


    static  propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        textColor: PropTypes.string,
        titleFontSize: PropTypes.number
    };

    render() {
        let {
            props: {
                icon,
                title,
                titleFontSize,
                iconColor,
                textColor
            }
        } = this;


        if(icon !== undefined){

            if(typeof icon ==="string"){
                icon = <MaterialIcon icon={icon} iconSize={18} color={iconColor}/>;
            }

            icon = (<Column justify={Flex.CENTER} xs={1}>{icon}</Column>)

        }

        return (
            <Row justify={Flex.SPACE_BETWEEN} alignContent={Flex.CENTER}
                 alignItems={Flex.CENTER} spacing={1}>
                {icon}
                <Column xs={10}>
                    <Row>
                        <MaterialTextView text={title} textColor={textColor} fontSize={titleFontSize}/>
                    </Row>
                </Column>
            </Row>
        );
    }
}