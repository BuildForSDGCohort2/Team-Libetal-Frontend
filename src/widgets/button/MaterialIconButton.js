import React, {Component} from "react";
import MaterialBtn from "../MaterialBtn";
import MaterialIcon from "../MaterialIcon";
import Types from "prop-types";
import MaterialTheme from "../theming/MaterialTheme";
import Settings from "../../utils/Settings";

export default class MaterialIconButton extends Component {


    style = MaterialTheme[Settings.theme].IconButton.default;


    static defaultProps = {
        iconSize: 24
    };

    static propTypes = {
        icon: Types.string,
        iconColor: Types.string,
        iconSize: Types.number,
        buttonColor: Types.string,
        marginRight: Types.oneOfType([Types.number, Types.string]),
        onClick: Types.func,
        padding: Types.number,
        style: Types.object
    };

    render() {

        let {
            icon,
            iconSize,
            iconColor,
            buttonColor,
            marginRight,
            padding,
            onClick,
            style
        } = this.props;

        this.style.marginRight = marginRight;

        this.style ={
            ...style,
            ...this.style
        }

        return (
            <MaterialBtn
                variant={"text"}
                style={this.style}
                content={
                    <MaterialIcon
                        icon={icon}
                        iconSize={iconSize}
                        color={iconColor}
                    />
                }
                padding={padding}
                color={buttonColor}
                onClick={onClick}

            />
        );
    }
}