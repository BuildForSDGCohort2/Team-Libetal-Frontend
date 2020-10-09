import React, {Component} from "react";
import MaterialBtn from "../MaterialBtn";
import MaterialIcon from "../MaterialIcon";
import Types from "prop-types";
import PropTypes from "prop-types";
import MaterialTheme from "../theming/MaterialTheme";
import Settings from "../../utils/Settings";

export default class MaterialIconButton extends Component {


    style = MaterialTheme[Settings.theme].IconButton.default;


    static defaultProps = {
        iconSize: 24,
        variant: "text"
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
            "List",
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
            "Language",
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
            "ArrowDropDown"
        ]).isRequired,
        iconColor: Types.string,
        iconSize: Types.number,
        buttonColor: Types.string,
        variant: Types.string,
        marginRight: Types.oneOfType([Types.number, Types.string]),
        onClick: Types.func,
        padding: Types.number,
        style: Types.object,
        disabled: Types.bool,
        marginLR: Types.number
    };

    render() {

        let {
            icon,
            iconSize,
            iconColor,
            buttonColor,
            marginLR,
            marginRight = marginLR,
            marginLeft = marginLR,
            padding,
            onClick,
            disabled,
            variant,
            style
        } = this.props;

        this.style.marginRight = marginRight;
        this.style.marginLeft = marginLeft;
        this.style.padding = padding;

        this.style = {
            ...style,
            ...this.style
        };


        if (typeof icon === "string") {
            icon = <MaterialIcon
                icon={icon}
                iconSize={iconSize}
                color={iconColor}
            />;
        }

        return (
            <MaterialBtn
                variant={variant}
                style={this.style}
                content={icon}
                disabled={disabled}
                padding={padding}
                color={buttonColor}
                onClick={onClick}

            />
        );
    }
}