import React, {Component} from "react";
import MaterialBtn from "../MaterialBtn";
import MaterialIcon from "../MaterialIcon";
import Types from "prop-types";
import MaterialTheme from "../theming/MaterialTheme";
import Settings from "../../utils/Settings";
import PropTypes from "prop-types";

export default class MaterialIconButton extends Component {


    style = MaterialTheme[Settings.theme].IconButton.default;


    static defaultProps = {
        iconSize: 24
    };

    static propTypes = {
        icon: PropTypes.oneOf([
            "Settings",
            "Home",
            "Notifications",
            "Apps",
            "Sort",
            "Search",
            "Copyright",
            "Save",
            "FilterList",
            "AttachFile",
            "StarBorder",
            "FavoriteBorder",
            "MoreVert",
            "ExpandMore",
            "ExpandLess",
            "ChevronLeft",
            "ChevronRight",
            "MoreHoriz",
            "AccountTree",
            "RssFeed",
            "Favorite",
            "Chat",
            "Accessibility",
            "InvertColors",
            "People",
            "ExitToApp",
            "BugReport",
            "Close",
            "Help",
            "TrendingUp",
            "TrendingDown",
            "Done",
            "ArrowDropDown",
        ]).isRequired,
        iconColor: Types.string,
        iconSize: Types.number,
        buttonColor: Types.string,
        marginRight: Types.oneOfType([Types.number, Types.string]),
        onClick: Types.func,
        padding: Types.number,
        style: Types.object,
        disabled: Types.bool,
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
            disabled,
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
                disabled={disabled}
                padding={padding}
                color={buttonColor}
                onClick={onClick}
            />
        );
    }
}