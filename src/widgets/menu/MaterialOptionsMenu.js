import React from "react";
import OptionsMenu, {OptionsMenuPropsTypes} from "./OptionsMenu";
import PropTypes from "prop-types";


export const MaterialOptionsMenuProps = {
    ...OptionsMenuPropsTypes,
    controller: PropTypes.any,
    controllerBody:PropTypes.any,
    controllerProps:PropTypes.any
};
export default class MaterialOptionsMenu extends OptionsMenu {



    static defaultProps = {
        controllerProps: {},
        ...OptionsMenu.defaultProps
    };

    static propTypes = MaterialOptionsMenuProps;


    get controller() {
        let {
            controller: Controller,
            controllerBody,
            controllerProps: {onClick, ...controllerProps}
        } = this.props;

        return (
            <Controller onClick={this.open} children={controllerBody} {...controllerProps}/>
        );
    }
}
