import React from "react";
import OptionsMenu, {OptionsMenuPropsTypes} from "../../../widgets/menu/OptionsMenu";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Colors from "../../../Colors";
import MaterialIcon from "../../../widgets/MaterialIcon";
import PropTypes from "prop-types";

export default class HeaderOption extends OptionsMenu {


    static propTypes = {
        ...OptionsMenuPropsTypes,
        title: PropTypes.string,
        textColor:PropTypes.string,
        btnColor:PropTypes.string
    };

    get controller() {

        let {
            textColor,
            btnColor,
            title
        } = this.props

        return (
            <MaterialBtn
                variant={"text"}
                content={title}
                textTransform={"none"}
                textColor={textColor}
                color={btnColor}
                style={{
                    paddingTop: 1,
                    paddingBottom: 1,
                    marginLeft:1,
                    marginRight:2,
                    minHeight:2
                }}
                onClick={
                    this.openMenu
                }
                endIcon={
                    <MaterialIcon
                        color={textColor}
                        icon={"ExpandMore"}
                    />
                }
            />
        );
    }
}