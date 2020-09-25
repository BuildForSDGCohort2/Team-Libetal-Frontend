import React, {Component} from "react";
import MaterialBtn from "../MaterialBtn";
import MaterialIcon from "../MaterialIcon";
import Types from "prop-types";
import MaterialTheme from "../theming/MaterialTheme";
import Settings from "../../utils/Settings";

export default class MaterialIconButton extends Component {


    style = MaterialTheme[Settings.theme].IconButton.default;


    static defaultProps = {
        iconSize:24
    };

    static propTypes = {
        icon: Types.string,
        iconColor: Types.string,
        iconSize: Types.number,
        buttonColor: Types.string,
        marginRight: Types.oneOfType([Types.number, Types.string]),
        onClick:Types.func,
    };

    render() {

        let {
            icon,
            iconSize,
            iconColor,
            buttonColor,
            marginRight,
            onClick
        } = this.props;

        this.style.marginRight = marginRight;

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
                color={buttonColor}
                onClick={onClick}

            />
        );
    }
}