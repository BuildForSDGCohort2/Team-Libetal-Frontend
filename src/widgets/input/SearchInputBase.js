import React, {Component} from "react";
import Flex from "../Flex";
import MaterialRow from "../grid/MaterialRow";
import InputBase from "@material-ui/core/InputBase";
import MaterialIcon from "../MaterialIcon";
import PropTypes from "prop-types";
import MaterialDivider from "../MaterialDivider";
import MaterialIconButton from "../button/MaterialIconButton";
import GridItem from "../grid/GridItem";

export default class SearchInputBase extends Component {

    static propTypes = {
        paddingLR: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        placeholder: PropTypes.string,
        textColor: PropTypes.string,
        iconColor: PropTypes.string,
        onChange: PropTypes.func,
        inputFlexGrow: PropTypes.number,
        inputStyle: PropTypes.any,
        showDivider: PropTypes.bool
    };

    render() {

        let {
            props: {
                placeholder,
                icon = "Search",
                paddingLR,
                onChange,
                inputStyle,
                showDivider,
                textColor,
                inputFlexGrow,
                iconColor
            }

        } = this;


        if (typeof icon === "string") {
            icon = <MaterialIconButton icon={icon} color={iconColor}/>;
        }

        return (
            <MaterialRow alignItems={Flex.CENTER} paddingLR={paddingLR}>
                <InputBase
                    placeholder={placeholder}
                    onChange={onChange}
                    style={{
                        color: textColor,
                        flexGrow: inputFlexGrow,
                        ...inputStyle
                    }}
                    onClick={
                        e => {
                            e.stopPropagation();
                        }
                    }
                />
                {showDivider ?
                    <MaterialDivider spacing={2} height={24} orientation={MaterialDivider.VERTICAL}/> : undefined}
                {icon}
            </MaterialRow>
        );
    }
}